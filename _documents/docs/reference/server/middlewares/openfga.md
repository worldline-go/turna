# OpenFGA

Use https://openfga.dev/ for authorization.

This middleware create table inside of the database to record users alias.

To do that first install openfga but with using turna:

```yaml
services:
  - name: openfga_migrate
    command: "openfga migrate"
    order: 0
    inherit_env: true
    env:
      OPENFGA_DATASTORE_ENGINE: postgres
      OPENFGA_DATASTORE_URI: postgres://postgres:password@localhost:5432/postgres?sslmode=disable&search_path=openfga
  - name: openfga_server
    command: "openfga run --datastore-max-open-conns 5 --datastore-conn-max-lifetime 15m"
    order: 1
    inherit_env: true
    env:
      OPENFGA_DATASTORE_ENGINE: postgres
      OPENFGA_DATASTORE_URI: postgres://postgres:password@localhost:5432/postgres?sslmode=disable&search_path=openfga
      OPENFGA_LOG_FORMAT: json
      OPENFGA_AUTHN_METHOD: preshared
      OPENFGA_AUTHN_PRESHARED_KEYS: testkey
```

And middleware configuration:

```yaml
middlewares:
  test:
    openfga:
      prefix_path: "" # BasePath of the openfga middleware
      shared_key: "" # Shared key for the openfga server
      api_url: "http://localhost:8080" # URL of the openfga server
      insecure_skip_verify: false # Skip verification of the server's certificate chain and host name
      database:
        postgres: "postgres://postgres:password@localhost:5432/postgres?sslmode=disable&search_path=openfga"
```
