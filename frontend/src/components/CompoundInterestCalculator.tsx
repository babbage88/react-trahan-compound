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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);


  const apiUrl = import.meta.env.VITE_API_URL;
  const url: string = apiUrl + 'api/compound-interest'
 
  useEffect(() => {
    if (location.state) {
      const { initAmount, monthlyContribution, interestRate, numberOfYears } = location.state;
      if (initAmount) setInitAmount(initAmount);
      if (monthlyContribution) setMonthlyContribution(monthlyContribution);
      if (interestRate) setInterestRate(interestRate);
      if (numberOfYears) setNumberOfYears(numberOfYears);
    }
  }, [location.state]);

  const calculateCompoundInterest = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ initAmount: initAmount, monthlyContribution: monthlyContribution, interestRate: interestRate, numberOfYears: numberOfYears })
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
  
      // Assuming data is an array of objects with properties matching YearlyTotals type
      const yearlyTotalsData = data.map((item: YearlyTotals) => ({
        year: item.year,
        total: item.total,
        contributions: item.contributions,
        yearlyInterest: item.yearlyInterest,
        yearlyIncome: item.yearlyIncome,
        gainfromint: item.gainfromint
      }));
  
      setTableData(yearlyTotalsData);
      console.log(tabledata);
  
      setError(null);
      navigate('/calculated', {
        state: {
          numberOfYears,
          monthlyContribution,
          initAmount,
          tabledata: yearlyTotalsData,
          interestRate
        }
      });
    }
    
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('Error fetching data. Please try again later.');
    }
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
