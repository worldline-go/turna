![turna](_assets/turna.svg#gh-light-mode-only)
![turna](_assets/turna_light.svg#gh-dark-mode-only)

Turna gets configuration files from various sources and runs commands.

With _turna_, we can use third party programs directly in our systems without giving extra configuration files to them.

## Installation

Check the releases page for versions and download the binary for your system.

```sh
curl -fsSL https://github.com/worldline-go/turna/releases/latest/download/turna_Linux_x86_64.tar.gz | sudo tar -xz --overwrite -C /usr/local/bin/
```

## Usage

Give config file with `CONFIG_FILE` env value [toml, yaml, yml, json] extensions supported.

To get this file from consul and vault area set the consul and vault enviroment variables.

```sh
# APPNAME
APP_NAME=test
PREFIX_VAULT=finops
PREFIX_CONSUL=finops

# First initialize configuration
CONFIG_SET_CONSUL=true
CONFIG_SET_VAULT=true
CONFIG_SET_FILE=true

# CONSUL
CONSUL_HTTP_ADDR="localhost:8500"
# VAULT
VAULT_ADDR="http://localhost:8200"
VAULT_ROLE_ID="${ROLE_ID}"
# VAULT_CONSUL_ADDR_DISABLE=false
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
          # default is empty, path_prefix is must!
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
