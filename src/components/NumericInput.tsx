import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "@/components/ui/input";
import { useEffect } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';


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

  return (
    <div className={className}>
      
      <Label className='tracking-tight pl-3'>{title} ({symbol})</Label>
      
      <Input
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
