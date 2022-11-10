![turna](_assets/turna.svg#gh-light-mode-only)
![turna](_assets/turna_light.svg#gh-dark-mode-only)

[![License](https://img.shields.io/github/license/worldline-go/turna?color=red&style=flat-square)](https://raw.githubusercontent.com/worldline-go/turna/main/LICENSE)
[![Coverage](https://img.shields.io/sonar/coverage/worldline-go_turna?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io&style=flat-square)](https://sonarcloud.io/summary/overall?id=worldline-go_turna)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/worldline-go/turna/Test?logo=github&style=flat-square&label=ci)](https://github.com/worldline-go/turna/actions)
[![Go Report Card](https://goreportcard.com/badge/github.com/worldline-go/turna?style=flat-square)](https://goreportcard.com/report/github.com/worldline-go/turna)
[![Web](https://img.shields.io/badge/web-document-blueviolet?style=flat-square)](https://worldline-go.github.io/turna/)

Turna gets configuration files from various sources and runs commands.

With _turna_, we can use third party programs directly in our systems without giving extra configuration files to them.

## Installation

Check the releases page for versions and download the binary for your system.

```sh
curl -fsSL https://github.com/worldline-go/turna/releases/latest/download/turna_Linux_x86_64.tar.gz | sudo tar -xz --overwrite -C /usr/local/bin/
```

## Configuration

```yml
# application log, default is info
log_level: info

# loads configuration to files
loads:
  - export: test.yml
    # static configuration merged with other sources
    statics:
      - consul:
          path: test
          # default is empty
          path_prefix: finops
          # default is 0 and consul first to merge of statics
          order: 1
        vault:
          path: test/myapp
          # default is empty
          path_prefix: secret
          # default is auth/approle/login, not need to set
          app_role_base_path: auth/approle/login
          # additional paths to get from extra content, default is none
          additional_paths:
            - map: ""
              name: generic
          # default is 0 and vault second to merge of statics
          order: 2
        file:
          # default is empty, [toml, yml, yaml, json] supported
          path: load.yml
          # default is 0 and file third to merge of statics
          order: 3

server:
  entrypoints:
    web:
      address: 0.0.0.0:3000
  http:
    middlewares:
      myauth:
        auth:
          basic:
            username: admin
            password: admin
          # oauth2:
          #   client_id: client_id
          #   client_secret: client_secret
          #   auth_url: https://auth.example.com/oauth2/auth
          #   token_url: https://auth.example.com/oauth2/token
          #   scopes:
          #     - openid
          #     - profile
          #     - email
          #   user_url: https://auth.example.com/userinfo
    services:
    - routes:
        rule: PathPrefix(`/products/`)
        entrypoints:
        - web
        middlewares:
        - myauth
      # share folder to serve files
      folders:
      - redirect: /static
        # folder location
        path: static
        # default is length of redirect
        priority: 2
        middlewares:
        - myauth
      - redirect: /templates
        # folder location
        path: templates
        # default is length of redirect
        priority: 3
        middlewares:
        - myauth
      redirect:
        path: "/"
        to: "http://localhost:8080"
        # default is length of path
        priority: 1
        middlewares:
        - myauth

# declare commands to run
services:
  # service name just for information purpose
  - name: cat my file
    # command will run inside of this path
    path: "."
    # command to run
    command: cat test.yml
    # environment variables to set
    # usable with gotemplate and sprig functions
    env:
      TEST: 1
      TEST2: 2
      HOSTTYPE: '{{ env "HOSTTYPE" }}'
    # inherit environment values, default is false
    inherit_env: false
    # filter of output, default is none
    filters:
      - "internal"
```

## Development

Generate binary with goreleaser:

```sh
goreleaser release --snapshot --rm-dist
```
