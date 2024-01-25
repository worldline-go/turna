package http

import (
	"context"

	"github.com/labstack/echo/v4"
	"github.com/worldline-go/turna/pkg/server/middlewares"
	"github.com/worldline-go/turna/pkg/server/middlewares/login"
	"github.com/worldline-go/turna/pkg/server/middlewares/session"
	"github.com/worldline-go/turna/pkg/server/middlewares/view"
	"github.com/worldline-go/turna/pkg/server/registry"
)

type HTTPMiddleware struct {
	AddPrefixMiddleware   *middlewares.AddPrefix   `cfg:"add_prefix"`
	AuthMiddleware        *middlewares.Auth        `cfg:"auth"`
	InjectMiddleware      *middlewares.Inject      `cfg:"inject"`
	HelloMiddleware       *middlewares.Hello       `cfg:"hello"`
	TemplateMiddleware    *middlewares.Template    `cfg:"template"`
	InfoMiddleware        *middlewares.Info        `cfg:"info"`
	SetMiddleware         *middlewares.Set         `cfg:"set"`
	StripPrefixMiddleware *middlewares.StripPrefix `cfg:"strip_prefix"`
	RoleMiddleware        *middlewares.Role        `cfg:"role"`
	ScopeMiddleware       *middlewares.Scope       `cfg:"scope"`
	ServiceMiddleware     *middlewares.Service     `cfg:"service"`
	FolderMiddleware      *middlewares.Folder      `cfg:"folder"`
	BasicAuthMiddleware   *middlewares.BasicAuth   `cfg:"basic_auth"`
	CorsMiddleware        *middlewares.Cors        `cfg:"cors"`
	HeadersMiddleware     *middlewares.Headers     `cfg:"headers"`
	BlockMiddleware       *middlewares.Block       `cfg:"block"`
	RegexPathMiddleware   *middlewares.RegexPath   `cfg:"regex_path"`
	GzipMiddleware        *middlewares.Gzip        `cfg:"gzip"`
	DecompressMiddleware  *middlewares.Decompress  `cfg:"decompress"`
	LogMiddleware         *middlewares.Log         `cfg:"log"`
	PrintMiddleware       *middlewares.Print       `cfg:"print"`
	LoginMiddleware       *login.Login             `cfg:"login"`
	SessionMiddleware     *session.Session         `cfg:"session"`
	ViewMiddleware        *view.View               `cfg:"view"`
}

func (h *HTTPMiddleware) getFirstFound(ctx context.Context, name string) ([]echo.MiddlewareFunc, error) {
	switch {
	case h.AddPrefixMiddleware != nil:
		return []echo.MiddlewareFunc{h.AddPrefixMiddleware.Middleware()}, nil
	case h.AuthMiddleware != nil:
		return h.AuthMiddleware.Middleware(ctx, name)
	case h.InjectMiddleware != nil:
		return h.InjectMiddleware.Middleware()
	case h.HelloMiddleware != nil:
		return h.HelloMiddleware.Middleware()
	case h.TemplateMiddleware != nil:
		m, err := h.TemplateMiddleware.Middleware()
		return []echo.MiddlewareFunc{m}, err
	case h.InfoMiddleware != nil:
		return []echo.MiddlewareFunc{h.InfoMiddleware.Middleware()}, nil
	case h.SetMiddleware != nil:
		return []echo.MiddlewareFunc{h.SetMiddleware.Middleware()}, nil
	case h.StripPrefixMiddleware != nil:
		return []echo.MiddlewareFunc{h.StripPrefixMiddleware.Middleware()}, nil
	case h.RoleMiddleware != nil:
		return []echo.MiddlewareFunc{h.RoleMiddleware.Middleware()}, nil
	case h.ScopeMiddleware != nil:
		return []echo.MiddlewareFunc{h.ScopeMiddleware.Middleware()}, nil
	case h.ServiceMiddleware != nil:
		return h.ServiceMiddleware.Middleware()
	case h.FolderMiddleware != nil:
		m, err := h.FolderMiddleware.Middleware()
		return []echo.MiddlewareFunc{m}, err
	case h.BasicAuthMiddleware != nil:
		return h.BasicAuthMiddleware.Middleware(name)
	case h.CorsMiddleware != nil:
		return []echo.MiddlewareFunc{h.CorsMiddleware.Middleware()}, nil
	case h.HeadersMiddleware != nil:
		return []echo.MiddlewareFunc{h.HeadersMiddleware.Middleware()}, nil
	case h.BlockMiddleware != nil:
		return []echo.MiddlewareFunc{h.BlockMiddleware.Middleware()}, nil
	case h.RegexPathMiddleware != nil:
		return h.RegexPathMiddleware.Middleware()
	case h.GzipMiddleware != nil:
		return []echo.MiddlewareFunc{h.GzipMiddleware.Middleware()}, nil
	case h.DecompressMiddleware != nil:
		return []echo.MiddlewareFunc{h.DecompressMiddleware.Middleware()}, nil
	case h.LogMiddleware != nil:
		return h.LogMiddleware.Middleware()
	case h.PrintMiddleware != nil:
		m, err := h.PrintMiddleware.Middleware()
		return []echo.MiddlewareFunc{m}, err
	case h.LoginMiddleware != nil:
		m, err := h.LoginMiddleware.Middleware(ctx, name)
		return []echo.MiddlewareFunc{m}, err
	case h.SessionMiddleware != nil:
		m, err := h.SessionMiddleware.Middleware(ctx, name)
		return []echo.MiddlewareFunc{m}, err
	case h.ViewMiddleware != nil:
		m, err := h.ViewMiddleware.Middleware(ctx, name)
		return []echo.MiddlewareFunc{m}, err
	}

	return nil, nil
}

func (h *HTTPMiddleware) Set(ctx context.Context, name string) error {
	middleware, err := h.getFirstFound(ctx, name)
	if err != nil {
		return err
	}

	registry.GlobalReg.AddHttpMiddleware(name, middleware)

	return nil
}
