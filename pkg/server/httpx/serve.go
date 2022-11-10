package httpx

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/rs/zerolog/log"
)

var serverShutdownTimeout = 5 * time.Second

// ServeHTTP returns a new HTTP server.
func ServeHTTP(addr string) *http.Server {
	mux := &Mux{}

	// Not found
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Not found")) //nolint:errcheck
	})

	s := &http.Server{
		Addr:           addr,
		Handler:        mux,
		MaxHeaderBytes: 1 << 20,
	}

	return s
}

// func StartHttpWithWaitGroup(server *http.Server, wg *sync.WaitGroup) error {

// StartHTTP starts the HTTP server.
func StartHTTP(server *http.Server) error {
	if server == nil {
		return nil
	}

	log.Info().Msgf("server on [%s]", server.Addr)
	if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	log.Info().Msg("server stopped gracefully")

	return nil
}

// StopHTTP stops the HTTP server.
func StopHTTP(server *http.Server) error {
	if server == nil {
		return nil
	}

	log.Info().Msg("server stopping...")

	ctx, cancel := context.WithTimeout(context.Background(), serverShutdownTimeout)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		return err
	}

	return nil
}
