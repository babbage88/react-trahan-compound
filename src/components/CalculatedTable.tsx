import { useState } from 'react';
import { YearlyTotals, columns } from './ui/columns';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from "@/components/ui/data-table" 
import { CardDropDownSelector} from "@/components/cardDropdownSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"


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
  
  const finalTotal = tabledata[selectedYear - 1].total;
  const finyearlyGains = tabledata[selectedYear - 1].yearlyInterest;
  const finalYear = tabledata[selectedYear - 1].year + new Date().getFullYear();



  return (
    <div className="flex flex-row">
      <div className="container py-4 mr-4">
      <EditResetButtons onEdit={handleEdit} onReset={reset} />

      <DataTable columns={columns} data={tabledata} />

      <EditResetButtons onEdit={handleEdit} onReset={reset} />
      </div>

      <div className="flex flex-row space-x-2">
      <Card className="h-40">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <CardDescription className="text-sm font-small">{finalYear} {selectedYear} Value</CardDescription>
          </CardHeader>
          <CardContent className="font-semibold">
            <p>{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(finalTotal)}</p>
          </CardContent>
       </Card>
       <Card className="h-40">
          <CardHeader>
            <CardTitle className="text-sm font-medium justify-center text-nowrap">Yearly Gains</CardTitle>
            <CardDescription className="text-sm font-small text-nowrap">{finalYear} Return</CardDescription>
          </CardHeader>
          <CardContent className="font-semibold">
            <p>{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(finyearlyGains)}</p>
          </CardContent>
       </Card>
       <CardDropDownSelector yearlyTotals={tabledata} onYearChange={handleYearChange}/>
       </div>
    </div>
  );
}
