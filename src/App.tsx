import React, { useState } from 'react'

import Layout from "@/components/Layout"
import NumericInput from './components/NumericInput'
import SliderInput from './components/SliderInput'
import CalculateButton from './components/CalculateButton'
import CalculatedAmounts from './components/CalculatedAmounts'

function App() {
  const [initAmount, setInitAmount] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [numberOfYears, setNumberOfYears] = useState<number>(0);
  const [finalValue, setFinalValue] = useState<number | null>(null);


  function calculateCompoundInterest() {
    let total: number = initAmount
    // eslint-disable-next-line prefer-const
    let annualContribution: number = monthlyContribution * 12
    for (let i = 0; i < numberOfYears; i++) {
      total = total + annualContribution
      total *= 1 + interestRate / 100
    }
    setFinalValue(total)
  }

  function reset() {
    setInitAmount(0)
    setMonthlyContribution(0)
    setInterestRate(0)
    setFinalValue(null)
    setNumberOfYears(0)
  }

  return (
    <Layout>
      {finalValue ? (
        <CalculatedAmounts finalValue={finalValue} numberOfYears={numberOfYears} monthlyContribution={monthlyContribution} reset={reset} initAmount={initAmount} />
      ) : (
        <>
          <NumericInput title={'Initial Amount'} symbol={'$'} value={initAmount} setValue={setInitAmount} />
          <NumericInput title={'Monthly Contribution'} symbol={'$'} value={monthlyContribution} setValue={setMonthlyContribution} />
          <NumericInput title={'Interest Rate'} symbol={'%'} value={interestRate} setValue={setInterestRate} />
          <SliderInput title={'Number of Years'} value={numberOfYears} setValue={setNumberOfYears} />
          <CalculateButton evaluate={calculateCompoundInterest} />
        </>
      )}
    </Layout>
  )
}

export default App
