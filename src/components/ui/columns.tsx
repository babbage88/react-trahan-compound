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
        header: () => <div className="text-left">Year</div>,
        cell: ({ row }) => {
            const year = new Date().getFullYear() + Number(row.getValue("year"))
 
            return <div className="text-left font-medium">{year}</div>
        },
    },
    {
        accessorKey: "contributions",
        header: () => <div className="text-right">Total Contributions</div>,
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
        header: () => <div className="text-right">Gains From Growth</div>,
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