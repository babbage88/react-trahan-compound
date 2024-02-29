import { YearlyTotals } from "./ui/columns";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
 
// Define the props interface for CardDropDownSelector
interface CardDropDownSelectorProps {
    yearlyTotals: YearlyTotals[];
    onYearChange: (year: number) => void;
  }
export function CardDropDownSelector(props: CardDropDownSelectorProps) {

  
  const handleYearChange = (year: number) => {
    props.onYearChange(year);
  };
 

  return (

        <Select onValueChange={(e) => handleYearChange(Number(e))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {props.yearlyTotals.map((yearlyTotal) => (
              <SelectItem key={yearlyTotal.year} value={yearlyTotal.year.toString()} onSelect={() => handleYearChange(yearlyTotal.year)}>
                {new Date().getFullYear() + Number(yearlyTotal.year)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

    
  );
}