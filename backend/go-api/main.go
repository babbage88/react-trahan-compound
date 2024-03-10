package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

type YearlyTotals struct {
	Year           int     `json:"year"`
	Total          float64 `json:"total"`
	Contributions  float64 `json:"contributions"`
	YearlyInterest float64 `json:"yearlyInterest"`
	YearlyIncome   float64 `json:"yearlyIncome"`
	GainFromInt    float64 `json:"gainfromint"`
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

// swagger:meta
func compoundInterestHandler(w http.ResponseWriter, r *http.Request) {
	// parse variables form post
	r.ParseForm()

	var initAmountStr string = r.Form.Get("init_amount")
	initAmount, err := strconv.ParseFloat(initAmountStr, 64)
	if err != nil {
		// Handle the error, e.g., return an error response to the client
		fmt.Print("Error:", err)

	}

	var monthlyContribStr string = r.Form.Get("monthly")

	monthlyContrib, err := strconv.ParseFloat(monthlyContribStr, 64)
	if err != nil {
		//handle error
		fmt.Print("Error:", err)
	}

	var intRateStr string = r.Form.Get("int_rate")
	intRate, err := strconv.ParseFloat(intRateStr, 32)
	if err != nil {
		//handle error
		fmt.Print("Error:", err)
	}

	var numberOfYearsStr string = r.Form.Get("num_years")
	numberOfYears, err := strconv.ParseInt(numberOfYearsStr, 10, 0)
	if err != nil {
		//handle error
		fmt.Print("Error:", err)
	}

	// Call the compound interest calculation function
	yearlyTotals := calculateCompoundInterest(initAmount, monthlyContrib, float32(intRate), int(numberOfYears))

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
	http.HandleFunc("/compound-interest", compoundInterestHandler)

	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
