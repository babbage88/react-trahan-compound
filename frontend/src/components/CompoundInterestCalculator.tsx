import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import OptionalNumericInput from './OptionalNumericInput';
import NumericInput from './NumericInput';
import { Slider } from '@/components/ui/slider';
import CalculateButton from './CalculateButton';

const CompoundInterestCalculator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [initAmount, setInitAmount] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [numberOfYears, setNumberOfYears] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlInitAmount = params.get('initAmount');
    const urlMonthlyContribution = params.get('monthlyContribution');
    const urlInterestRate = params.get('interestRate');
    const urlNumberOfYears = params.get('numberOfYears');

    if (urlInitAmount) setInitAmount(Number(urlInitAmount));
    if (urlMonthlyContribution) setMonthlyContribution(Number(urlMonthlyContribution));
    if (urlInterestRate) setInterestRate(Number(urlInterestRate));
    if (urlNumberOfYears) setNumberOfYears(Number(urlNumberOfYears));
  }, [location.search]);

  const navigateToCalculated = () => {
    const params = new URLSearchParams({
      initAmount: initAmount.toString(),
      monthlyContribution: monthlyContribution.toString(),
      interestRate: interestRate.toString(),
      numberOfYears: numberOfYears.toString(),
    });

    navigate(`/calculated?${params.toString()}`, { replace: true });
  };

  return (
    <div className="flex flex-col container space-y-2">
      <NumericInput
        title={'Initial Amount'}
        symbol={'$'}
        value={initAmount}
        placeholder='Initial Amount'
        setValue={setInitAmount}
      />
      <NumericInput
        title={'Interest Rate'}
        symbol={'%'}
        value={interestRate}
        placeholder='Interest Rate'
        setValue={setInterestRate}
      />
      <OptionalNumericInput 
        title={'Monthly Contribution'} 
        symbol={'$'} 
        value={monthlyContribution}
        placeholder='Monthly Contribution'
        setValue={setMonthlyContribution} 
      />
      <Label className='flex pl-3 pt-4'>Years: {numberOfYears}</Label>
      <Slider 
        max={100} 
        step={1} 
        value={[numberOfYears]} 
        className='flex pl-4 pt-2' 
        onValueChange={(e) => setNumberOfYears(Number(e))}
      />
      <CalculateButton evaluate={navigateToCalculated} className='flex space-y-2 space-x-2 py-4 justify-center'/>
    </div>
  );
};

export default CompoundInterestCalculator;
