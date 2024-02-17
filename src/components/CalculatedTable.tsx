import { YearlyTotals, columns } from "./ui/columns";
import { DataTable } from "@/components/ui/data-table" 
import { Button } from "@/components/ui/button";


interface Props {
  finalValue: number;
  reset: () => void;
  monthlyContribution: number;
  numberOfYears: number;
  initAmount: number;
  tabledata: YearlyTotals[]
}

export default function CalculatedAmounts(props: Props): JSX.Element {
  const { finalValue, reset, monthlyContribution, numberOfYears, initAmount, tabledata } = props;
  if (!finalValue) {
    return <div></div>;
  }



  console.log(numberOfYears, monthlyContribution, initAmount);
  

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
