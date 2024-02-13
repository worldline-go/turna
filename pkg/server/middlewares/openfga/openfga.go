package openfga

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/worldline-go/initializer"
	"github.com/worldline-go/turna/pkg/server/middlewares"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
)

type OpenFGA struct {
	PrefixPath         string   `cfg:"prefix_path"`
	SharedKey          string   `cfg:"shared_key"`
	APIURL             string   `cfg:"api_url"`
	InsecureSkipVerify bool     `cfg:"insecure_skip_verify"`
	Database           Database `cfg:"database"`

	openFGAProxy echo.HandlerFunc `cfg:"-"`
	db           *sqlx.DB         `cfg:"-"`
}

//go:embed files/*
var uiFS embed.FS

var (
	ConnMaxLifetime = 15 * time.Minute
	MaxIdleConns    = 3
	MaxOpenConns    = 5
)

func (m *OpenFGA) SetFs() (echo.MiddlewareFunc, error) {
	f, err := fs.Sub(uiFS, "files")
	if err != nil {
		return nil, err
	}

	folder := middlewares.Folder{
		Index:          false,
		StripIndexName: true,
		SPA:            false,
		Browse:         false,
		PrefixPath:     m.PrefixPath + "/api/swagger/",
		CacheRegex: []*middlewares.RegexCacheStore{
			{
				Regex:        `.*`,
				CacheControl: "no-store",
			},
		},
	}

	folder.SetFs(http.FS(f))

	return folder.Middleware()
}

func (m *OpenFGA) Middleware(ctx context.Context, _ string) (echo.MiddlewareFunc, error) {
	setFs, err := m.SetFs()
	if err != nil {
		return nil, err
	}

	embedFunc := setFs(nil)

	if m.APIURL == "" {
		return nil, fmt.Errorf("api url is required")
	}

	apiURL, err := url.Parse(m.APIURL)
	if err != nil {
		return nil, err
	}

	openFGAProxy := middleware.Proxy(middleware.NewRoundRobinBalancer([]*middleware.ProxyTarget{
		{
			URL: apiURL,
		},
	}))(nil)

	m.openFGAProxy = openFGAProxy

	db, err := sqlx.Connect("pgx", m.Database.Postgres)
	if err != nil {
		return nil, err
	}

	db.SetConnMaxLifetime(ConnMaxLifetime)
	db.SetMaxIdleConns(MaxIdleConns)
	db.SetMaxOpenConns(MaxOpenConns)

	m.db = db

	initializer.Shutdown.Add(func() error { return db.Close() },
		initializer.WithShutdownName("openfga-db"),
	)

	if err := m.Migration(ctx); err != nil {
		return nil, err
	}

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			path := c.Request().URL.Path
			if strings.HasPrefix(path, m.PrefixPath+"/api/openfga/") {
				return m.Proxy(c, m.PrefixPath+"/api/openfga/")
			}

			if strings.HasPrefix(path, m.PrefixPath+"/api/swagger/") {
				return embedFunc(c)
			}

			if strings.HasPrefix(path, m.PrefixPath+"/api/") {
				return m.Internal(c, m.PrefixPath+"/api/")
			}

			return next(c)
		}
	}, nil
}
