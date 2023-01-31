![turna](_assets/turna.svg#gh-light-mode-only)
![turna](_assets/turna_light.svg#gh-dark-mode-only)

[![License](https://img.shields.io/github/license/worldline-go/turna?color=blue&style=flat-square)](https://raw.githubusercontent.com/worldline-go/turna/main/LICENSE)
[![Coverage](https://img.shields.io/sonar/coverage/worldline-go_turna?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io&style=flat-square)](https://sonarcloud.io/summary/overall?id=worldline-go_turna)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/worldline-go/turna/test.yml?branch=main&logo=github&style=flat-square&label=ci)](https://github.com/worldline-go/turna/actions)
[![Go Report Card](https://goreportcard.com/badge/github.com/worldline-go/turna?style=flat-square)](https://goreportcard.com/report/github.com/worldline-go/turna)

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
    # name using to export value in map
    name: mytest
    # static configuration merged with other sources
    statics:
      - consul:
          # name using to export value in map
          name: myconsul
          path: test
          # default is empty
          path_prefix: finops
          # load as raw
          raw: false
          # default is YAML, [toml, yaml, json] supported
          codec: "YAML"
          # get the inner path
          inner_path: "test"
          # remap key
          map: "myapp/inner"
        vault:
          # name using to export value in map
          name: myvault
          path: test/myapp
          # default is empty, path_prefix is must!
          path_prefix: secret
          # default is auth/approle/login, not need to set
          app_role_base_path: auth/approle/login
          # get the inner path
          inner_path: "test"
          # remap key
          map: "myapp/inner"
        file:
          # name using to export value in map
          name: myfile
          # default is empty, [toml, yml, yaml, json] supported
          path: load.yml
          raw: false
          # get the inner path
          inner_path: "test"
          # remap key
          map: "myapp/inner"
        content:
          # name using to export value in map
          name: mycontent
          codec: "YAML"
          content: |
            test:
              test: 1
              test2: 2
          raw: false
          template: false
          # get the inner path
          inner_path: "test"
          # remap key
          map: "myapp/inner"
    dynamics:
      - consul:
          # name using to export value in map
          name: myconsulDynamic
          path: test
          # default is empty
          path_prefix: finops
          # load as raw
          raw: false
          # default is YAML, [toml, yaml, json] supported
          codec: "YAML"
          # get the inner path
          inner_path: "test"
          # remap key
          map: "myapp/inner"

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
    # get variables from name in loads
    env:
      TEST: 1
      TEST2: 2
      HOSTTYPE: '{{ env "HOSTTYPE" }}'
    # env_values override the os envs but not env values in upper
    env_values:
      - mytest/env # get all env values from mytest, give map value result in template
    # inherit environment values, default is false
    inherit_env: false
    # filter of output, default is none
    filters:
      - "internal"
    # filter_values effect dynamically
    filters_values:
      - mytest/filter # get all filter values from mytest, give slice value result in template
```
