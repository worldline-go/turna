package roledata

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/worldline-go/turna/pkg/server/model"
	"github.com/worldline-go/auth/claims"
)

type RoleData struct {
	Map     []Data      `cfg:"map"`
	Default interface{} `cfg:"default"`
}

type Data struct {
	Roles []string    `cfg:"roles"`
	Data  interface{} `cfg:"data"`
}

func (m *RoleData) Middleware() (echo.MiddlewareFunc, error) {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// get user roles from context
			claimValue, ok := c.Get("claims").(*claims.Custom)
			if !ok {
				return c.JSON(http.StatusUnauthorized, model.MetaData{Message: "claims not found"})
			}

			roles := claimValue.RoleSet

			values := []interface{}{}
			for _, data := range m.Map {
				for _, role := range data.Roles {
					if _, ok := roles[role]; ok {
						values = append(values, data.Data)

						break
					}
				}
			}

			if m.Default != nil {
				switch v := m.Default.(type) {
				case []interface{}:
					values = append(values, v...)
				default:
					values = append(values, v)
				}
			}

			return c.JSON(http.StatusOK, values)
		}
	}, nil
}
