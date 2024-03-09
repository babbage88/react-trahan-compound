package main

import (
    "encoding/json"
    "log"
    "net/http"
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
    annualContribution := monthlyContribution * 12

    for i := 0; i < numberOfYears; i++ {
        yearlyInterest := (interestRate / 100) * total
        yearlyIncome := (interestRate / 100) * .4 * total

        total += annualContribution
        total *= 1 + interestRate / 100

        yearlyTotals = append(yearlyTotals, YearlyTotals{
            Year:           i + 1,
            Total:          total,
            Contributions:  annualContribution * float64(i + 1),
            YearlyInterest: yearlyInterest,
            YearlyIncome:   yearlyIncome,
            GainFromInt:    total - (initAmount + (annualContribution * float64(i))),
        })
    }

    return yearlyTotals
}

func compoundInterestHandler(w http.ResponseWriter, r *http.Request) {
    // parse variables form post
	r.ParseForm()
	var initAmount float64 := r.Form.Get("initAmount")
	var monthlyContrib float64 := r.Form.Get("monthlycontribution")
	var intRate float32 := r.Form.Get("interestRate")
	var numberOfYears int := r.Form.Get("numberOfYears")

    // Call the compound interest calculation function
    yearlyTotals := calculateCompoundInterest(initAmount, monthlyContrib, intRate, numberOfYears)

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
