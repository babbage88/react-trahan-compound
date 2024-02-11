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
        className="outline-none focus:outline-none bg-transparent text-white text-xs sm:text-sm duration-200 border border-transparent border-solid bg-slate-950 p-2 rounded hover:border-blue-700 focus:border-blue-500"
        value={value}
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />
    </div>
  );
}

export default NumericInput;
