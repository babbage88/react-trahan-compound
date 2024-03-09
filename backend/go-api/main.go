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

func calculateCompoundInterest(initAmount float64, monthlyContribution float64, interestRate float64, numberOfYears int, calcMonthly bool, months int, monthlyRate float64) []YearlyTotals {
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
    // Parse request parameters (you might want to use a library like gorilla/mux for more complex routing)
    // Example: initAmount, _ := strconv.ParseFloat(r.URL.Query().Get("initAmount"), 64)

    // Call the compound interest calculation function
    yearlyTotals := calculateCompoundInterest( /* pass your parameters here */ )

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
