package badger

import (
	"errors"
	"fmt"
	"slices"

	"github.com/oklog/ulid/v2"
	"github.com/rakunlabs/turna/pkg/server/http/middleware/rebac/data"
	"github.com/timshannon/badgerhold/v4"
)

func (b *Badger) GetUsers(req data.GetUserRequest) (*data.Response[[]data.UserExtended], error) {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	var users []data.User

	badgerHoldQuery := &badgerhold.Query{}

	switch {
	case req.ID != "":
		badgerHoldQuery = badgerhold.Where("ID").Eq(req.ID)
	case req.Alias != "":
		badgerHoldQuery = badgerhold.Where("Alias").Contains(req.Alias)
	default:
		var badgerHoldQueryInternal *badgerhold.Query
		if req.Name != "" {
			badgerHoldQueryInternal = badgerhold.Where("Details").MatchFunc(matchAllField("name", req.Name))
		}

		if req.Method != "" || req.Path != "" {
			// get role ids based on path and method
			roleIDs, err := b.getRoleIDs(req.Method, req.Path)
			if err != nil {
				return nil, err
			}

			if len(roleIDs) == 0 {
				return &data.Response[[]data.UserExtended]{
					Meta: data.Meta{
						Offset: req.Offset,
						Limit:  req.Limit,
					},
					Payload: []data.UserExtended{},
				}, nil
			}

			req.RoleIDs = append(req.RoleIDs, roleIDs...)
		}

		if req.Email != "" {
			if badgerHoldQueryInternal != nil {
				badgerHoldQueryInternal = badgerHoldQueryInternal.And("Details").MatchFunc(matchAllField("email", req.Email))
			} else {
				badgerHoldQueryInternal = badgerhold.Where("Details").MatchFunc(matchAllField("email", req.Email))
			}
		}

		if req.UID != "" {
			if badgerHoldQueryInternal != nil {
				badgerHoldQueryInternal = badgerHoldQueryInternal.And("Details").MatchFunc(matchAllField("uid", req.UID))
			} else {
				badgerHoldQueryInternal = badgerhold.Where("Details").MatchFunc(matchAllField("uid", req.UID))
			}
		}

		if len(req.RoleIDs) > 0 {
			// role ids could be virtual roles, get all roles that contain the role ids
			roleIDs, err := b.getVirtualRoleIDs(req.RoleIDs)
			if err != nil {
				return nil, err
			}

			if badgerHoldQueryInternal != nil {
				badgerHoldQueryInternal = badgerHoldQueryInternal.And("RoleIDs").ContainsAny(toInterfaceSlice(roleIDs)...).
					Or(badgerHoldQueryInternal.And("SyncRoleIDs").ContainsAny(toInterfaceSlice(roleIDs)...))
			} else {
				badgerHoldQueryInternal = badgerhold.Where("RoleIDs").ContainsAny(toInterfaceSlice(roleIDs)...).
					Or(badgerhold.Where("SyncRoleIDs").ContainsAny(toInterfaceSlice(roleIDs)...))
			}
		}

		if badgerHoldQueryInternal != nil {
			badgerHoldQuery = badgerHoldQueryInternal
		}
	}

	count, err := b.db.Count(data.User{}, badgerHoldQuery)
	if err != nil {
		return nil, err
	}

	if req.Offset > 0 {
		badgerHoldQuery = badgerHoldQuery.Skip(int(req.Offset))
	}
	if req.Limit > 0 {
		badgerHoldQuery = badgerHoldQuery.Limit(int(req.Limit))
	}

	if err := b.db.Find(&users, badgerHoldQuery); err != nil {
		return nil, err
	}

	userExtended := make([]data.UserExtended, len(users))

	for i, user := range users {
		extended, err := b.extendUser(req.Extend, user)
		if err != nil {
			return nil, err
		}

		userExtended[i] = extended
	}

	return &data.Response[[]data.UserExtended]{
		Meta: data.Meta{
			Offset:         req.Offset,
			Limit:          req.Limit,
			TotalItemCount: count,
		},
		Payload: userExtended,
	}, nil
}

func (b *Badger) GetUser(req data.GetUserRequest) (*data.UserExtended, error) {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	var user data.User

	badgerHoldQuery := &badgerhold.Query{}

	if req.ID != "" {
		badgerHoldQuery = badgerhold.Where("ID").Eq(req.ID)
	} else if req.Alias != "" {
		badgerHoldQuery = badgerhold.Where("Alias").Contains(req.Alias)
	}

	if err := b.db.FindOne(&user, badgerHoldQuery); err != nil {
		if errors.Is(err, badgerhold.ErrNotFound) {
			return nil, fmt.Errorf("user with id %s not found; %w", req.ID, data.ErrNotFound)
		}

		return nil, err
	}

	extendedUser, err := b.extendUser(req.Extend, user)

	return &extendedUser, err
}

func (b *Badger) CreateUser(user data.User) (string, error) {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	user.ID = ulid.Make().String()

	var foundUser data.User
	alias := make([]interface{}, len(user.Alias))
	for i, a := range user.Alias {
		alias[i] = a
	}

	if err := b.db.FindOne(&foundUser, badgerhold.Where("Alias").ContainsAny(alias...)); err != nil {
		if !errors.Is(err, badgerhold.ErrNotFound) {
			return "", err
		}
	}

	if foundUser.ID != "" {
		return "", fmt.Errorf("user with alias %v already exists; %w", user.Alias, data.ErrConflict)
	}

	if err := b.db.Insert(user.ID, user); err != nil {
		return "", err
	}

	return user.ID, nil
}

func (b *Badger) PatchUser(user data.User) error {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	var foundUser data.User
	if err := b.db.FindOne(&foundUser, badgerhold.Where("ID").Eq(user.ID)); err != nil {
		if errors.Is(err, badgerhold.ErrNotFound) {
			return fmt.Errorf("user with id %s not found; %w", user.ID, badgerhold.ErrNotFound)
		}

		return err
	}

	for _, alias := range user.Alias {
		if !slices.Contains(foundUser.Alias, alias) {
			foundUser.Alias = append(foundUser.Alias, alias)
		}
	}

	for _, role := range user.RoleIDs {
		if !slices.Contains(foundUser.RoleIDs, role) {
			foundUser.RoleIDs = append(foundUser.RoleIDs, role)
		}
	}

	for k, v := range user.Details {
		foundUser.Details[k] = v
	}

	if err := b.db.Update(user.ID, foundUser); err != nil {
		return err
	}

	return nil
}

func (b *Badger) PutUser(user data.User) error {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	var foundUser data.User
	if err := b.db.FindOne(&foundUser, badgerhold.Where("ID").Eq(user.ID)); err != nil {
		if errors.Is(err, badgerhold.ErrNotFound) {
			return fmt.Errorf("user with id %s not found; %w", user.ID, badgerhold.ErrNotFound)
		}

		return err
	}

	if err := b.db.Update(user.ID, user); err != nil {
		return err
	}

	return nil
}

func (b *Badger) DeleteUser(id string) error {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	return b.db.Delete(id, data.User{})
}

func (b *Badger) extendUser(extend bool, user data.User) (data.UserExtended, error) {
	userExtended := data.UserExtended{
		User: user,
	}

	if !extend {
		return userExtended, nil
	}

	// get users roleIDs
	roleIDs, err := b.getVirtualRoleIDs(user.RoleIDs)
	if err != nil {
		return data.UserExtended{}, err
	}

	var roles []string
	var permissions []string
	var datas []interface{}

	// get roles permissions
	if err := b.db.ForEach(badgerhold.Where("ID").In(toInterfaceSlice(roleIDs)...), func(role *data.Role) error {
		roles = append(roles, role.Name)
		if role.Data != nil {
			datas = append(datas, role.Data)
		}

		// get permissions
		for _, permissionID := range role.PermissionIDs {
			var permission data.Permission
			if err := b.db.Get(permissionID, &permission); err != nil {
				return err
			}

			permissions = append(permissions, permission.Name)
		}

		return nil
	}); err != nil {
		return data.UserExtended{}, err
	}

	userExtended.Roles = roles
	userExtended.Permissions = permissions
	userExtended.Datas = datas

	return userExtended, nil
}
