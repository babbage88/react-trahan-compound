import React from 'react';

interface NumericInputProps {
  title: string;
  symbol: string;
  value: number;
  setValue: (value: number) => void;
}

const NumericInput: React.FC<NumericInputProps> = ({ title, symbol, value, setValue }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3>{title} ({symbol})</h3>
      <input
        type="number"
        className=""
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />
    </div>
  );
}

export default NumericInput;
