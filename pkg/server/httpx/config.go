package httpx

type Httpx struct {
	// Folders to serve.
	Folders []Folder
	// Redirects to set routes to external areas.
	Redirects []Redirect
}

type Folder struct {
	// Redirect to set URL path.
	Redirect string
	// Path to serve.
	Path string
	// Priority to serve.
	Priority int
}

type Redirect struct {
	// Path to set URL path.
	Path string
	// To to set external host.
	To string
	// Priority to serve.
	Priority int
}
