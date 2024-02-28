import * as React from "react"
import { Button } from "@/components/ui/button"
import { YearlyTotals } from "./ui/columns";
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
// Define the props interface for CardDropDownSelector
interface CardDropDownSelectorProps {
    yearlyTotals: YearlyTotals[];
    onYearChange: (year: number) => void;
  }
export function CardDropDownSelector(props: CardDropDownSelectorProps) {
  const [position, setPosition] = React.useState("bottom")
  
  const handleYearChange = (year: number) => {
    setPosition("bottom"); // Reset position if needed
    props.onYearChange(year);
  };
 
  return (
    

    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" >
      <ScrollArea className="h-72 w-59 rounded-md border">
        <DropdownMenuLabel>Year</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {props.yearlyTotals.map((yearlyTotal) => (
            <DropdownMenuRadioItem key={yearlyTotal.year} value={yearlyTotal.year.toString()} onSelect={() => handleYearChange(yearlyTotal.year)}>
              {new Date().getFullYear() + Number(yearlyTotal.year)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
    
  );
}