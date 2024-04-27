package hlthchk

import (
	"log"
	"os"
	"time"
)

type ServerHealthStats struct {
	Hostname        string    `json:"hostname"`
	CurrentDateTime time.Time `json:"currentDateTime"`
	Message         string    `json:"message"`
}

func GetHostname() string {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	hostname, err := os.Hostname()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}

	log.Println("Hostname:", hostname)
	return hostname
}

func GetHealthStats() []ServerHealthStats {
	var serverHealthStats []ServerHealthStats
	serverHealthStats = append(serverHealthStats, ServerHealthStats{
		Hostname:        GetHostname(),
		CurrentDateTime: time.Now(),
		Message:         "Healthy",
	})

	return serverHealthStats
}
