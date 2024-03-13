import { ColumnDef } from "@tanstack/react-table"

export type YearlyTotals = {
    year: number
    total: number
    contributions: number
    yearlyInterest: number
    yearlyIncome: number
    gainfromint: number
  }

  export const columns: ColumnDef<YearlyTotals>[] = [
    {
        accessorKey: "year",
        header: () => <div className="text-left text-nowrap">Year</div>,
        cell: ({ row }) => {
            const year = new Date().getFullYear() + Number(row.getValue("year"))
 
            return <div className="text-left font-medium">{year}</div>
        },
    },
    {
        accessorKey: "contributions",
        header: () => <div className="text-right text-nowrap">Total Contributions</div>,
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
        accessorKey: "yearlyInterest",
        header: () => <div className="text-right text-nowrap">Yearly Returns</div>,
        cell: ({ row }) => {
            const yearlyInterest = parseFloat(row.getValue("yearlyInterest"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(yearlyInterest)
 
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "yearlyIncome",
        header: () => <div className="text-right text-nowrap">Yearly Income</div>,
        cell: ({ row }) => {
            const yearlyIncome = parseFloat(row.getValue("yearlyIncome"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(yearlyIncome)
 
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "gainfromint",
        header: () => <div className="text-right text-nowrap">Total Gains</div>,
        cell: ({ row }) => {
            const gains = parseFloat(row.getValue("gainfromint"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(gains)
 
            return <div className="text-right text-nowrap font-medium">{formatted}</div>
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