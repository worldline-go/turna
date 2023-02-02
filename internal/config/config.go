package config

import (
	"github.com/rytsh/liz/loader"
	"github.com/worldline-go/turna/internal/service"
)

var Application = struct {
	LogLevel string           `cfg:"log_level"`
	Loads    loader.Configs   `cfg:"loads"`
	Services service.Services `cfg:"services"`
	Print    string           `cfg:"print"`
}{
	LogLevel: "info",
}