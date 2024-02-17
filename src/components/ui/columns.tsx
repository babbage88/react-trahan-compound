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
      header: "Contributions",
    },
    {
      accessorKey: "gainfromint",
      header: "Gains",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
  ]