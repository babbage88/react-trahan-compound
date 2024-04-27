package main

import (
	"encoding/json"
	"fmt"
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
	InitAmount          float64 `json:"initAmount"`
	MonthlyContribution float64 `json:"monthlyContribution"`
	InterestRate        float32 `json:"interestRate"`
	NumberOfYears       int     `json:"numberOfYears"`
}

func calculateCompoundInterest(initAmount float64, monthlyContribution float64, interestRate float32, numberOfYears int) []YearlyTotals {
	var yearlyTotals []YearlyTotals
	var total float64 = initAmount
	var annualContribution float64 = monthlyContribution * 12
	var months int8 = 12
	var monthlyIntRate float32 = (interestRate / 100) / float32(months)

	for i := 0; i < numberOfYears; i++ {
		fmt.Println("Year: ", i)
		var yearlyStart float64 = total
		fmt.Println("Total Start: ", total)

		for i := 0; i < int(months); i++ {
			fmt.Println("Month: ", i)
			var monthlyGain float64 = total * float64(monthlyIntRate)
			fmt.Println("MonthlyGain: ", monthlyGain)
			total = total + monthlyContribution
			fmt.Println("Total After Contribution: ", total)
			total = total + monthlyGain
			fmt.Println("Total After MonthlyGain: ", total)
		}

		var yearlyInterest float64 = (total - annualContribution) - yearlyStart
		fmt.Print("End Year: ", i)
		fmt.Println("YearlyInterest ", yearlyInterest)
		var yearlyIncome float64 = (float64(interestRate) / 100) * .4 * total
		fmt.Println("YearlyIncome ", yearlyIncome)

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
// @Router /compound-interest [post]
func compoundInterestHandler(w http.ResponseWriter, r *http.Request) {

	var request_input InitialNumericInput
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&request_input)
	if err != nil {
		panic(err)
	}
	log.Println(request_input.InitAmount)

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

// func healthCheck(w http.ResponseWriter, r *http.Request) {

//}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/swagger/", httpSwagger.WrapHandler)
	mux.HandleFunc("/compound-interest", compoundInterestHandler)
	log.Println(testhealth.getHostname())
	log.Println("Starting server on :8283...")
	log.Fatal(http.ListenAndServe(":8283", mux))
}
