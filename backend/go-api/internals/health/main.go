package health

import (
	"log"
	"os"
)

func getHostname() string {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	hostname, err := os.Hostname()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}

	log.Println("Hostname: %v", hostname)
	return hostname
}

func main() {
	getHostname()
}