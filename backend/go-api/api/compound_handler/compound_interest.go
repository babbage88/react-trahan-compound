package compound_interest

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
)

type YearlyTotals struct {
	Year                int     `json:"year"`
	Total               float64 `json:"total"`
	YearlyContributions float64 `json:"yearlyContributions"`
	YearlyInterest      float64 `json:"yearlyInterest"`
	YearlyIncome        float64 `json:"yearlyIncome"`
	YearlyTotalGains    float64 `json:"yearlyTotalGains"`
}

type InitialNumericInput struct {
	InitAmount          float64 `json:"initAmount"`
	MonthlyContribution float64 `json:"monthlyContribution"`
	InterestRate        float32 `json:"interestRate"`
	NumberOfYears       int     `json:"numberOfYears"`
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "calc.trahan.dev")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func calculateCompoundInterest(initalInput InitialNumericInput) []YearlyTotals {
	var yearlyTotals []YearlyTotals
	var total float64 = initalInput.InitAmount
	var annualContribution float64 = initalInput.MonthlyContribution * 12
	var months int8 = 12
	var monthlyIntRate float32 = (initalInput.InterestRate / 100) / float32(months)

	for i := 0; i < initalInput.NumberOfYears; i++ {
		slog.Debug("Year Value", slog.String("Year: ", fmt.Sprint(i)))
		var yearlyStart float64 = total
		slog.Debug("Total Start: ", slog.String("Total", fmt.Sprint(total)))

		for i := 0; i < int(months); i++ {
			slog.Debug("Monthly Iteration", slog.String("Month Number ", fmt.Sprint(i)))
			var monthlyGain float64 = total * float64(monthlyIntRate)
			slog.Debug("Adding Monthly contribution to total", slog.String("Monthly Contribution", fmt.Sprint(initalInput.MonthlyContribution)))
			total = total + initalInput.MonthlyContribution
			slog.Debug("Adding monthly gains to Total", slog.String("Monthly Gain", fmt.Sprint(monthlyGain)))
			total = total + monthlyGain
			slog.Debug("MOnthly Gains added", slog.String("New Total after contribution and gains", fmt.Sprint(total)))
		}

		var yearlyInterest float64 = (total - annualContribution) - yearlyStart
		slog.Debug("All yearly calculations completed", slog.String("Year Number", fmt.Sprint(i)))
		slog.Debug("Yearly interest/Gains", slog.String("Yearly Interest", fmt.Sprint(yearlyInterest)))
		var yearlyIncome float64 = (float64(initalInput.InterestRate) / 100) * .4 * total
		slog.Debug("Yearly Income.", slog.String("YearlyIncome", fmt.Sprint(yearlyIncome)))

		yearlyTotals = append(yearlyTotals, YearlyTotals{
			Year:                i + 1,
			Total:               total,
			YearlyContributions: annualContribution * float64(i+1),
			YearlyInterest:      yearlyInterest,
			YearlyIncome:        yearlyIncome,
			YearlyTotalGains:    total - (initalInput.InitAmount + (annualContribution * float64(i))),
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
func CompoundInterestHandler(w http.ResponseWriter, r *http.Request) {
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
	yearlyTotals := calculateCompoundInterest(request_input)

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
