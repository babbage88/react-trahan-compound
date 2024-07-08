package main

import (
	"flag"
	"log/slog"
	"net/http"
	"os"
	"runtime/debug"

	"github.com/prometheus/client_golang/prometheus/promhttp"

	hlthchk "github.com/babbage88/go-compound-api/api/health"
	_ "github.com/babbage88/go-compound-api/swagger"

	compound_interest_handler "github.com/babbage88/go-compound-api/api/compound_handler"
	httpSwagger "github.com/swaggo/http-swagger/v2"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)
	buildInfo, _ := debug.ReadBuildInfo()

	srvport := flag.String("srvadr", ":8283", "Address and port that http server will listed on. :8238 is default")
	flag.Parse()

	servername := hlthchk.GetHostname()
	child := logger.With(
		slog.String("Hostname", servername),
		slog.Group("program_info",
			slog.Int("pid", os.Getpid()),
			slog.String("Listen Address:", *srvport),
			slog.String("go_version", buildInfo.GoVersion),
		),
	)

	mux := http.NewServeMux()
	mux.Handle("/metrics", promhttp.Handler())
	mux.HandleFunc("/swagger/", httpSwagger.WrapHandler)
	mux.HandleFunc("/api/compound-interest", compound_interest_handler.CompoundInterestHandler)
	mux.HandleFunc("/api/healthstats", hlthchk.HealthCheckHandler)

	child.Info("Starting http server.")
	http.ListenAndServe(*srvport, mux)
}
