# Login

Oauth2 login support for web applications.

```yaml
server:
  entrypoints:
    web:
      address: ":8082"
  http:
    middlewares:
      main:
        hello:
          headers:
            Content-Type: "text/html; charset=utf-8"
          message: |
            <!DOCTYPE html>
            <head>
              <title>Turna</title>
              <style>
                body {background-color: #f7fff7;}
                h1 {border-bottom: 2px solid #ff6b6b;}
                .logout {float: right; color: #ff6b6b; text-decoration: none;}
                pre {background-color: #faf0ca; overflow: auto; white-space: pre-wrap; word-wrap: break-word; }
              </style>
            </head>
            <body>
              <h1>Turna - Test Page <a class="logout" href="/logout/">Logout</a></h1>
              <div>
                <p>Test page</p>
              </div>
            </body>
            </html>
      token:
        set:
          values:
          - token_header
          - disable_redirect
      session:
        session:
          cookie_name: "turna_test"
          session_key: "my_secret_key"
          information:
            values:
            - preferred_username
            - email
            - given_name
            - family_name
            roles: true
          store:
            active: redis
            file: {}
            redis:
              address: "localhost:6379"
              key_prefix: "turna_test_"
          options:
            http_only: true
            secure: false
            same_site: 2
          actions:
            token:
              login_path: "/login/"
              oauth2:
                token_url: "http://localhost:8080/realms/master/protocol/openid-connect/token"
                cert_url: "http://localhost:8080/realms/master/protocol/openid-connect/certs"
                client_id: "test"
                client_secret: ""
      logout:
        set:
          values:
          - logout
      login:
        login:
          info:
            title: "Turna Login"
          session_middleware: "session"
          ui:
            embed_path_prefix: "/login/"
          provider:
            keycloak:
              oauth2:
                client_id: "test"
                client_secret: ""
                cert_url: "http://localhost:8080/realms/master/protocol/openid-connect/certs"
                token_url: "http://localhost:8080/realms/master/protocol/openid-connect/token"
      whoami:
        service:
          loadbalancer:
            servers:
              - url: "http://localhost:9090"
    routers:
      login:
        path: /login/*
        middlewares:
          - login
      logout:
        path: /logout/*
        middlewares:
          - logout
          - login
      whoami:
        path: /whoami/*
        middlewares:
          - token
          - session
          - whoami
      main:
        path: /*
        middlewares:
          - session
          - main
```