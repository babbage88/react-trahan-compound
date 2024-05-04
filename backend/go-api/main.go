package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"runtime/debug"

	"github.com/prometheus/client_golang/prometheus/promhttp"

	hlthchk "github.com/babbage88/go-compound-api/api/health"
	_ "github.com/babbage88/go-compound-api/swagger"

	httpSwagger "github.com/swaggo/http-swagger/v2"
)

type YearlyTotals struct {
	Year           int     `json:"year"`
	Total          float64 `json:"total"`
	Contributions  float64 `json:"contributions"`
	YearlyInterest float64 `json:"yearlyInterest"`
	YearlyIncome   float64 `json:"yearlyIncome"`
	GainFromInt    float64 `json:"gainfromint"`
}

type InitialNumericInput struct {
	InitAmount          float64 `json:"initAmount"`
	MonthlyContribution float64 `json:"monthlyContribution"`
	InterestRate        float32 `json:"interestRate"`
	NumberOfYears       int     `json:"numberOfYears"`
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func calculateCompoundInterest(initAmount float64, monthlyContribution float64, interestRate float32, numberOfYears int) []YearlyTotals {
	var yearlyTotals []YearlyTotals
	var total float64 = initAmount
	var annualContribution float64 = monthlyContribution * 12
	var months int8 = 12
	var monthlyIntRate float32 = (interestRate / 100) / float32(months)

	for i := 0; i < numberOfYears; i++ {
		slog.Debug(fmt.Sprint("Year: ", i))
		var yearlyStart float64 = total
		slog.Debug(fmt.Sprint("Total Start: ", total))

		for i := 0; i < int(months); i++ {
			slog.Debug(fmt.Sprint("Month: ", i))
			var monthlyGain float64 = total * float64(monthlyIntRate)
			slog.Debug(fmt.Sprint("MonthlyGain: ", monthlyGain))
			total = total + monthlyContribution
			slog.Debug(fmt.Sprint("Total After Contribution: ", total))
			total = total + monthlyGain
			slog.Debug(fmt.Sprint("Total After MonthlyGain: ", total))
		}

		var yearlyInterest float64 = (total - annualContribution) - yearlyStart
		slog.Debug(fmt.Sprint("End Year: ", i))
		slog.Debug(fmt.Sprint("YearlyInterest ", yearlyInterest))
		var yearlyIncome float64 = (float64(interestRate) / 100) * .4 * total
		slog.Debug(fmt.Sprint("YearlyIncome ", yearlyIncome))

		yearlyTotals = append(yearlyTotals, YearlyTotals{
			Year:           i + 1,
			Total:          total,
			Contributions:  annualContribution * float64(i+1),
			YearlyInterest: yearlyInterest,
			YearlyIncome:   yearlyIncome,
			GainFromInt:    total - (initAmount + (annualContribution * float64(i))),
		})
	}

	return yearlyTotals
}

// calculateCompoundInterest godoc
// @Summary Compund Interest calculation
// @Description Takes params from frontend and returns YearlyTotals for Compound Interest
// @Tags Calc
// @ID Calculator
// @Accept  application/json
// @Content
// @Produce  json
// @Param InitialNumericInput body InitialNumericInput true "Values from user"
// @Success 200 {object} YearlyTotals
// @Router /api/compound-interest [post]
func compoundInterestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		enableCors(&w)
		return
	}

	enableCors(&w)
	var request_input InitialNumericInput
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request_input)
	if err != nil {
		http.Error(w, "Failed to decode JSON request", http.StatusBadRequest)
		return
	}
	slog.Info(fmt.Sprint("Initial Amount: ", request_input.InitAmount))
	slog.Info(fmt.Sprint("Interest Rate: ", request_input.InterestRate))
	slog.Info(fmt.Sprint("Monthly Contribution: ", request_input.MonthlyContribution))
	slog.Info(fmt.Sprint("Years: ", request_input.NumberOfYears))

	// Call the compound interest calculation function
	yearlyTotals := calculateCompoundInterest(request_input.InitAmount, request_input.MonthlyContribution, float32(request_input.InterestRate), int(request_input.NumberOfYears))

	// Serialize response to JSON
	jsonResponse, err := json.Marshal(yearlyTotals)
	if err != nil {
		http.Error(w, "Failed to marshal JSON response", http.StatusInternalServerError)
		return
	}

	// Set response headers and write JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

// healthCheckHandler godoc
// @Summary Returns Server Health statuses
// @Tags HealthCheck
// @ID HealtchCheck
// @Description Retures Date/Time Server Hostname and Health status if API.
// @Produce  json
// @Success 200 {object} hlthchk.ServerHealthStats
// @Router /api/healthstats [get]
func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	healthStats := hlthchk.GetHealthStats()
	jsonResponse, err := json.Marshal(healthStats)
	if err != nil {
		http.Error(w, "Healthcheck Failed", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

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
	mux.HandleFunc("/api/compound-interest", compoundInterestHandler)
	mux.HandleFunc("/api/healthstats", healthCheckHandler)

	child.Info("Starting http server.")
	http.ListenAndServe(*srvport, mux)
}
