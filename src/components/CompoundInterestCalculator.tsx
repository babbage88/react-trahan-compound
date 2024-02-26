import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Label } from '@radix-ui/react-dropdown-menu';
import NumericInput from './NumericInput';
import { Slider } from '@/components/ui/slider'
import CalculateButton from './CalculateButton';
import { YearlyTotals } from "@/components/ui/columns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  

const CompoundInterestCalculator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [initAmount, setInitAmount] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [numberOfYears, setNumberOfYears] = useState<number>(7);
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
      <Accordion type="single" collapsible className='container space-y-2 space-x-2 pl-2 ml-2 gap-1 hover:outline-2'>
        <AccordionItem value="item-1">
          <AccordionTrigger className='space-y-2 space-x-2 pl-1 gap-1 text-sm'>Add Monthly Contribution</AccordionTrigger>
          <AccordionContent>
           <NumericInput
              title={'Monthly Contribution'}
              symbol={'$'}
              value={monthlyContribution}
              className='flex justify-center flex-col'
              placeholder='Monthly Contribution'
              setValue={setMonthlyContribution}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Label className='flex pl-3 pt-4'>Years: {numberOfYears}</Label>
      <Slider max={100} step={1} defaultValue={[numberOfYears]} className='container pl-4 pt-2' onValueChange={(e) => {
          setNumberOfYears(Number(e));
        }}/>
      <CalculateButton evaluate={calculateCompoundInterest} className='flex space-y-2 space-x-2 py-4 justify-center'/>
    </div>
  );
}

export default CompoundInterestCalculator;
