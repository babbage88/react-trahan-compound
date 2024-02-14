import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "@/components/ui/input"


interface NumericInputProps {
  title: string;
  symbol: string;
  value: number;
  setValue: (value: number) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({ title, symbol, value, setValue }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <h3>{title} ({symbol})</h3>
      <Input
        type="number"
        className=""
        defaultValue={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
        ref={inputRef}
        onFocus={handleClick}
      />
    </div>
  );
}

export default NumericInput;
