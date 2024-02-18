import { YearlyTotals, columns } from "./ui/columns";
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from "@/components/ui/data-table" 
import { Button } from "@/components/ui/button";


export default function CalculatedTable(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

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
  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tabledata} />

      <div className="flex justify-center">
        <Button onClick={handleEdit} className="mr-4">
          <h4>Edit</h4>
        </Button>
        <Button onClick={reset}>
          <h4>Reset</h4>
        </Button>
      </div>
    </div>
  );
}
