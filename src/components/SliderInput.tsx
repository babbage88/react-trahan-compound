import React, { ChangeEvent } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';

interface SliderInputProps {
  title: string;
  value: number;
  setValue: (value: number) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({ title, value, setValue }) => {
  return (
    <div className="flex flex-col gap-1 pl-2 space-y-2 space-x-2 py-6">
      <Label className='tracking-tight pl-3'>{title} ({value})</Label>
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
