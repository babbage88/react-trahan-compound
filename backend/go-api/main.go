package main

import (
	"encoding/json"
	"log"
	"net/http"

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
	initAmount          float64
	monthlyContribution float64
	interestRate        float32
	numberOfYears       int
}

func calculateCompoundInterest(initAmount float64, monthlyContribution float64, interestRate float32, numberOfYears int) []YearlyTotals {
	var yearlyTotals []YearlyTotals
	var total float64 = initAmount
	var annualContribution float64 = monthlyContribution * 12

	for i := 0; i < numberOfYears; i++ {
		var yearlyInterest float64
		var yearlyIncome float64
		yearlyInterest = (float64(interestRate) / 100) * total
		yearlyIncome = (float64(interestRate) / 100) * .4 * total

		total += annualContribution
		total *= 1 + float64(interestRate)/100

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

// authLogin godoc
// @Summary Compund Interest calculation
// @Description Takes params from frontend and returns YearlyTotals for Compound Interest
// @Tags Calc
// @ID auth-login
// @Accept  json
// @Produce  json
// @Param InitialNumericInput body InitialNumericInput true "Values from user"
// @Success 200 {object} YearlyTotals
// @Router /compound-interest [post]
func compoundInterestHandler(w http.ResponseWriter, r *http.Request) {
	// parse variables form post
	r.ParseForm()

	var request_input InitialNumericInput

	err := json.NewDecoder(r.Body).Decode(&request_input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Call the compound interest calculation function
	yearlyTotals := calculateCompoundInterest(request_input.initAmount, request_input.monthlyContribution, float32(request_input.interestRate), int(request_input.numberOfYears))

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

func main() {
	http.HandleFunc("/swagger/", httpSwagger.WrapHandler)
	http.HandleFunc("/compound-interest", compoundInterestHandler)

	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
