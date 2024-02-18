import { ColumnDef } from "@tanstack/react-table"

export type YearlyTotals = {
    year: number
    total: number
    contributions: number
    gainfromint: number
  }

  export const columns: ColumnDef<YearlyTotals>[] = [
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "contributions",
        header: () => <div className="text-right">Contributions</div>,
        cell: ({ row }) => {
            const contributions = parseFloat(row.getValue("contributions"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(contributions)
 
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "gainfromint",
        header: () => <div className="text-right">Gains</div>,
        cell: ({ row }) => {
            const gains = parseFloat(row.getValue("gainfromint"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(gains)
 
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "total",
        header: () => <div className="text-right">Total</div>,
        cell: ({ row }) => {
            const totals = parseFloat(row.getValue("total"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(totals)
 
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
  ]