import { YearlyTotals, columns } from "@/components/ui/columns"
import { DataTable } from "@/components/ui/data-table"

  function getData(): YearlyTotals[] {
    // Fetch data from your API here.
    return [
    {
    
        year: 1,
        total: 1232.00,
        contributions: 1120.00,
        gainfromint: 112,
    },
      // ...
    ]
  }
   
  export default function DemoPage() {
    const data = getData()
   
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }