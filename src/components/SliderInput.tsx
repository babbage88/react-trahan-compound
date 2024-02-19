import React, { ChangeEvent } from 'react';

interface SliderInputProps {
  title: string;
  value: number;
  setValue: (value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({ title, value, setValue }) => {
  return (
    <div className="flex flex-col w-1/5 gap-1 space-y-2 space-x-2 py-6">
      <h3>{title} ({value})</h3>
      <input
        type="range"
        min="1"
        max="120"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(parseInt(e.target.value, 10));
        }}
      />
    </div>
  );
};

export default SliderInput;
