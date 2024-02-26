import { YearlyTotals, columns } from "./ui/columns";
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from "@/components/ui/data-table" 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  
  const finalTotal = tabledata[tabledata.length - 1].total;
  const finyearlyGains = tabledata[tabledata.length - 1].yearlyInterest;



  return (
    <div className="flex flex-row">
      <div className="container py-4">
      <EditResetButtons onEdit={handleEdit} onReset={reset} />

      <DataTable columns={columns} data={tabledata} />

      <EditResetButtons onEdit={handleEdit} onReset={reset} />
      </div>

      <div className="w-3/5">
      <Card>
          <CardHeader>
            <CardTitle>Final Total</CardTitle>
            <CardDescription>Portfolio Value at year {numberOfYears}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(finalTotal)}</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
       </Card>
       <Card>
          <CardHeader>
            <CardTitle>Final Yearly Gains</CardTitle>
            <CardDescription>Gains from Interest year {numberOfYears}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(finyearlyGains)}</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
       </Card>
       </div>
    </div>
  );
}
