import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NumericInput from './NumericInput';
import SliderInput from './SliderInput';
import CalculateButton from './CalculateButton';
import { YearlyTotals } from "@/components/ui/columns";

const CompoundInterestCalculator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [initAmount, setInitAmount] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [numberOfYears, setNumberOfYears] = useState<number>(0);
  const [tabledata, setTableData] = useState<YearlyTotals[]>([]);

  useEffect(() => {
    if (location.state) {
      const { initAmount, monthlyContribution, interestRate, numberOfYears } = location.state;
      if (initAmount) setInitAmount(initAmount);
      if (monthlyContribution) setMonthlyContribution(monthlyContribution);
      if (interestRate) setInterestRate(interestRate);
      if (numberOfYears) setNumberOfYears(numberOfYears);
    }
  }, [location.state]);

  function calculateCompoundInterest() {
    let total: number = initAmount;
    const annualContribution: number = monthlyContribution * 12;
    const yearlyTotals: YearlyTotals[] = [];

    for (let i = 0; i < numberOfYears; i++) {
      total = total + annualContribution;
      total *= 1 + interestRate / 100;

      tabledata.push({
        year: i + 1,
        total: total,
        contributions: annualContribution * (i + 1),
        gainfromint: total - (initAmount + (annualContribution * i))
      });
    }
    setTableData(yearlyTotals);
    navigate('/calculated', {
        state: {
          numberOfYears,
          monthlyContribution,
          initAmount,
          tabledata,
          interestRate
        }
      }); // Navigate to calculated page after calculation
  }

  return (
    <>
      <NumericInput title={'Initial Amount'} symbol={'$'} value={initAmount} setValue={setInitAmount} />
      <NumericInput title={'Monthly Contribution'} symbol={'$'} value={monthlyContribution} setValue={setMonthlyContribution} />
      <NumericInput title={'Interest Rate'} symbol={'%'} value={interestRate} setValue={setInterestRate} />
      <SliderInput title={'Number of Years'} value={numberOfYears} setValue={setNumberOfYears} />
      <CalculateButton evaluate={calculateCompoundInterest} />
    </>
  );
}

export default CompoundInterestCalculator;
