package hlthchk

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
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

// HealthCheckHandler godoc
// @Summary Returns Server Health statuses
// @Tags HealthCheck
// @ID HealtchCheck
// @Description Retures Date/Time Server Hostname and Health status if API.
// @Produce  json
// @Success 200 {object} hlthchk.ServerHealthStats
// @Router /api/healthstats [get]
func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	healthStats := GetHealthStats()
	jsonResponse, err := json.Marshal(healthStats)
	if err != nil {
		http.Error(w, "Healthcheck Failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}
