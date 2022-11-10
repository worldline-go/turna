package server

type Server struct {
	Entrypoints map[string]Entrypoint `cfg:"entrypoints"`
}

type Entrypoint struct {
	// Address to listen on.
	Address string `cfg:"address"`
	// Http    Http   `cfg:"http"`
}
