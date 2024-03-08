import { useState } from 'react';
import { YearlyTotals, columns } from './ui/columns';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from "@/components/ui/data-table" 
import { CardDropDownSelector} from "@/components/cardDropdownSelector";
import { Button } from "@/components/ui/button";
import { CalculatedCards } from './calculatedCards';


function EditResetButtons({ onEdit, onReset }: { onEdit: () => void; onReset: () => void; }) {
  return (
    <div className="flex flex-row justify-between items-center p-2">
      <div className="flex">
        <Button onClick={onEdit} className="mr-4">
          <h4>Edit</h4>
        </Button>
        <Button onClick={onReset}>
          <h4>Reset</h4>
        </Button>
      </div>
    </div>
  );
}

export default function CalculatedTable(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number>(1);
  
  
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  // Access props passed from CompoundInterestCalculator component
  const {
    numberOfYears,
    monthlyContribution,
    initAmount,
    tabledata,
    interestRate
  } = location.state as {
    numberOfYears: number;
    monthlyContribution: number;
    initAmount: number;
    tabledata: YearlyTotals[];
    interestRate: number;
  };

  const reset = () => {
    // Navigate back to the CompoundInterestCalculator component
    navigate('/');
  };

  const handleEdit = () => {
    // Navigate back to the CompoundInterestCalculator component with current values
    navigate('/', {
      state: {
        numberOfYears,
        monthlyContribution,
        initAmount,
        interestRate
      }
    });
  };
  console.log(numberOfYears, monthlyContribution, initAmount, interestRate);
  
  const displayedTotal = tabledata[selectedYear - 1].total;
  const displayedGains = tabledata[selectedYear - 1].yearlyInterest;
  const displayedYear = tabledata[selectedYear - 1].year + new Date().getFullYear();



  return (
    <div className="flex flex-row">
      <div className="container py-4 mr-4">
       <div className='flex flex-row justify-between'>
        <EditResetButtons onEdit={handleEdit} onReset={reset} />
        <CardDropDownSelector yearlyTotals={tabledata} onYearChange={handleYearChange}/>
      </div> 

      <div className="flex flex-row space-x-2 md:hidden">
        <CalculatedCards cardTitle='Total' cardDescription={displayedYear.toString() + " Assets"} cardContent={displayedTotal}/>
        <CalculatedCards cardTitle='Yearly Gains' cardDescription={displayedYear.toString() + " Gain"} cardContent={displayedGains}/>
      </div>
      <DataTable columns={columns} data={tabledata} />

      <EditResetButtons onEdit={handleEdit} onReset={reset} />
      </div>

      <div className="md:flex hidden flex-row space-x-2">
        <CalculatedCards cardTitle='Total' cardDescription={displayedYear.toString() + " Assets"} cardContent={displayedTotal}/>
        <CalculatedCards cardTitle='Yearly Gains' cardDescription={displayedYear.toString() + " Gain"} cardContent={displayedGains}/>
      </div>
    </div>
  );
}
