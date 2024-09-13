package badger

import (
	"errors"
	"fmt"
	"slices"

	"github.com/oklog/ulid/v2"
	"github.com/rakunlabs/turna/pkg/server/http/middleware/rebac/data"
	badgerhold "github.com/timshannon/badgerhold/v4"
)

func (b *Badger) GetPermissions(req data.GetPermissionRequest) (*data.Response[[]data.Permission], error) {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	var permissions []data.Permission

	badgerHoldQuery := &badgerhold.Query{}

	if req.ID != "" {
		badgerHoldQuery = badgerhold.Where("ID").Eq(req.ID)
	} else {
		var badgerHoldQueryInternal *badgerhold.Query
		if req.Name != "" {
			badgerHoldQueryInternal = badgerhold.Where("Name").MatchFunc(matchAll(req.Name))
		}

		if req.Method != "" {
			if badgerHoldQueryInternal != nil {
				badgerHoldQueryInternal = badgerHoldQueryInternal.And("Requests").MatchFunc(matchRequestMethod(req.Method))
			} else {
				badgerHoldQueryInternal = badgerhold.Where("Requests").MatchFunc(matchRequestMethod(req.Method))
			}
		}

		if req.Path != "" {
			if badgerHoldQueryInternal != nil {
				badgerHoldQueryInternal = badgerHoldQueryInternal.And("Requests").MatchFunc(matchRequestPath(req.Path))
			} else {
				badgerHoldQueryInternal = badgerhold.Where("Requests").MatchFunc(matchRequestPath(req.Path))
			}
		}

		if badgerHoldQueryInternal != nil {
			badgerHoldQuery = badgerHoldQueryInternal
		}
	}

	count, err := b.db.Count(data.Permission{}, badgerHoldQuery)
	if err != nil {
		return nil, err
	}

	if req.Offset > 0 {
		badgerHoldQuery = badgerHoldQuery.Skip(int(req.Offset))
	}
	if req.Limit > 0 {
		badgerHoldQuery = badgerHoldQuery.Limit(int(req.Limit))
	}

	if err := b.db.Find(&permissions, badgerHoldQuery); err != nil {
		return nil, err
	}

	return &data.Response[[]data.Permission]{
		Meta: data.Meta{
			Offset:         req.Offset,
			Limit:          req.Limit,
			TotalItemCount: count,
		},
		Payload: permissions,
	}, nil
}

func (b *Badger) GetPermission(name string) (*data.Permission, error) {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	var permission data.Permission

	if err := b.db.Get(name, &permission); err != nil {
		if errors.Is(err, badgerhold.ErrNotFound) {
			return nil, fmt.Errorf("permission with name %s not found; %w", name, data.ErrNotFound)
		}

		return nil, err
	}

	return &permission, nil
}

func (b *Badger) CreatePermission(permission data.Permission) (string, error) {
	permission.ID = ulid.Make().String()

	if err := b.db.Insert(permission.ID, permission); err != nil {
		if errors.Is(err, badgerhold.ErrKeyExists) {
			return "", fmt.Errorf("permission with ID %s already exists; %w", permission.ID, data.ErrConflict)
		}
	}

	return permission.ID, nil
}

func (b *Badger) PatchPermission(patch data.Permission) error {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	var foundPermission data.Permission
	if err := b.db.FindOne(&foundPermission, badgerhold.Where("ID").Eq(patch.ID)); err != nil {
		if errors.Is(err, badgerhold.ErrNotFound) {
			return fmt.Errorf("patch with id %s not found; %w", patch.ID, badgerhold.ErrNotFound)
		}

		return err
	}

	if patch.Name != "" {
		foundPermission.Name = patch.Name
	}

	if patch.Description != "" {
		foundPermission.Description = patch.Description
	}

	if len(patch.Requests) > 0 {
		foundPermission.Requests = append(foundPermission.Requests, patch.Requests...)
	}

	if err := b.db.Update(foundPermission.ID, foundPermission); err != nil {
		return err
	}

	return nil
}

func (b *Badger) PutPermission(permission data.Permission) error {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	if err := b.db.Update(permission.ID, permission); err != nil {
		return err
	}

	return nil
}

func (b *Badger) DeletePermission(id string) error {
	b.dbBackupLock.RLock()
	defer b.dbBackupLock.RUnlock()

	if err := b.db.Delete(id, data.Permission{}); err != nil {
		return err
	}

	// Delete the permission from all roles
	if err := b.db.ForEach(badgerhold.Where("PermissionIDs").Contains(id), func(role *data.Role) error {
		role.PermissionIDs = slices.DeleteFunc(role.PermissionIDs, func(cmp string) bool {
			return cmp == id
		})

		if err := b.db.Update(role.ID, role); err != nil {
			return err
		}

		return nil
	}); err != nil {
		return fmt.Errorf("failed to delete permission from roles; %w", err)
	}

	return nil
}

func (b *Badger) getPermissionIDs(method, path string) ([]string, error) {
	var permissionIDs []string

	var query *badgerhold.Query
	if method != "" {
		query = badgerhold.Where("Requests").MatchFunc(matchRequestMethod(method))
	}

	if path != "" {
		if query != nil {
			query = query.And("Requests").MatchFunc(matchRequestPath(path))
		} else {
			query = badgerhold.Where("Requests").MatchFunc(matchRequestPath(path))
		}
	}

	if err := b.db.ForEach(query, func(perm *data.Permission) error {
		permissionIDs = append(permissionIDs, perm.ID)

		return nil
	}); err != nil {
		return nil, fmt.Errorf("failed to get permission IDs; %w", err)
	}

	return permissionIDs, nil
}
