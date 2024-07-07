package hlthchk

import (
	"fmt"
	"log/slog"
	"os"
	"time"
)

type ServerHealthStats struct {
	Hostname        string    `json:"hostname"`
	CurrentDateTime time.Time `json:"currentDateTime"`
	Message         string    `json:"message"`
}

func GetHostname() string {
	hostname, err := os.Hostname()
	if err != nil {
		slog.Info(fmt.Sprint(err))
		os.Exit(1)
	}

	slog.Debug(fmt.Sprint("Hostname:", hostname))
	return hostname
}

func GetHealthStats() []ServerHealthStats {
	var serverHealthStats []ServerHealthStats
	serverHealthStats = append(serverHealthStats, ServerHealthStats{
		Hostname:        GetHostname(),
		CurrentDateTime: time.Now(),
		Message:         "Healthy",
	})
	slog.Debug("Responding to Helthcheck")
	return serverHealthStats
}
