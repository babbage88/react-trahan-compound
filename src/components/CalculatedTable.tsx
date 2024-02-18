import { YearlyTotals, columns } from "./ui/columns";
import { useLocation } from 'react-router-dom';
import { DataTable } from "@/components/ui/data-table" 
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CalculatedTable(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  // Access props passed from CompoundInterestCalculator component
  const {
    finalValue,
    numberOfYears,
    monthlyContribution,
    initAmount,
    tabledata
  } = location.state as {
    finalValue: number | null;
    numberOfYears: number;
    monthlyContribution: number;
    initAmount: number;
    tabledata: YearlyTotals[];
  };

  
  const reset = () => {
    // Navigate back to the CompoundInterestCalculator component
    navigate('/');
  };
  console.log(numberOfYears, monthlyContribution, initAmount, finalValue);
  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tabledata} />

      <Button
        onClick={reset}
      >
        <h4>
          Reset
        </h4>
      </Button>
    </div>
  );
}
