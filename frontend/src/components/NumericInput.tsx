import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "@/components/ui/input";
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';


interface NumericInputProps {
  title: string;
  symbol: string;
  value: number;
  className?: string;
  placeholder?: string;
  setValue: (value: number) => void;
  
}

const NumericInput: React.FC<NumericInputProps> = ({ title, symbol, value, className, placeholder, setValue  }) => {
  const inputRef = useRef<HTMLInputElement>(null);


  // Update input value when the value prop changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = String(value);
    }
  }, [value]);


  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
}).format(Number(value))

  const isCurrency = symbol == '$'

  return (
    <div className={className}>
      <div className='flex felx-row justify-between'>
        <Label className='tracking-tight pl-3 pb-2'>{title} ({symbol})</Label>
        {isCurrency && 
          <Label htmlFor={title} className='pb-2'>{formatted}</Label>
        }
      </div>
      <Input
        id={title}
        type="number"
        className={"gap-1"}
        defaultValue={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        ref={inputRef}
        placeholder={placeholder}
        onFocus={handleClick}
      />
    </div>
  );
}

export default NumericInput;
