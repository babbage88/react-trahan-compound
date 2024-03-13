import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Label } from "@/components/ui/label"
import OptionalNumericInput from './OptionalNumericInput';
import NumericInput from './NumericInput';
import { Slider } from '@/components/ui/slider'
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
  // const [calcMonthly, setCalcMonthly] = useState<boolean>(true);
  const calcMonthly: boolean = true; 
  const monthlyRate: number = (interestRate /100) / 12;
  // const totalNumberOfMonths: number = numberOfYears * 12;
  const months: number = 12; 

 
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
    let yearlyInterest: number = 0;
    let yearlyIncome: number = 0;
    
    if(!calcMonthly){
      for (let i = 0; i < numberOfYears; i++) {
        yearlyInterest = (interestRate / 100) * total;
        yearlyIncome = (interestRate / 100) * .4 * total;
        total = total + annualContribution;
        total *= 1 + interestRate / 100;

        tabledata.push({
          year: i + 1,
          total: total,
          contributions: annualContribution * (i + 1),
          yearlyInterest: yearlyInterest,
          yearlyIncome: yearlyIncome,
          gainfromint: total - (initAmount + (annualContribution * i))
        });
    }
      setTableData(yearlyTotals);
    }

    else{
      for (let i = 0; i < numberOfYears; i++) {
        const yearlyStart: number = total

        for (let i = 0; i < months; i++){
          const monthlyIntGain: number = total * monthlyRate;
          total = total + monthlyIntGain + monthlyContribution;
        }
        yearlyInterest = (total - annualContribution) - yearlyStart; 
        yearlyIncome = (interestRate / 100) * .4 * total;

        tabledata.push({
          year: i + 1,
          total: total,
          contributions: annualContribution * (i + 1),
          yearlyInterest: yearlyInterest,
          yearlyIncome: yearlyIncome,
          gainfromint: total - (initAmount + (annualContribution * i))
        });
    }
      setTableData(yearlyTotals);
    }

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
    <div className="flex flex-col container space-y-2">
      <NumericInput
        title={'Initial Amount'}
        symbol={'$'}
        value={initAmount}
        className='container space-y-1 space-x-2 pl-2 mb-2 gap-1'
        placeholder='Initial Amount'
        setValue={setInitAmount}
      />
      <NumericInput
        title={'Interest Rate'}
        symbol={'%'}
        value={interestRate}
        className='container space-y-1 space-x-2 pl-2 mb-2'
        placeholder='Interest Rate'
        setValue={setInterestRate}
      />
      <OptionalNumericInput 
      title={'Monthly Contribution'} 
      symbol={'$'} 
      value={monthlyContribution}
      className='flex flex-col space-y-2 pl-2 container'
      placeholder='Monthly Contribution'
      setValue={setMonthlyContribution} 
      />

      <Label className='flex pl-3 pt-4'>Years: {numberOfYears}</Label>
      <Slider max={100} step={1} defaultValue={[numberOfYears]} className='flex pl-4 pt-2' onValueChange={(e) => {
          setNumberOfYears(Number(e));
        }}/>
      
      <CalculateButton evaluate={calculateCompoundInterest} className='flex space-y-2 space-x-2 py-4 justify-center'/>
    </div>
  );
}

export default CompoundInterestCalculator;
