import { Label } from "@/components/ui/label"
import NumericInput from './NumericInput';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface OptionalNumericInputProps {
    title: string;
    symbol: string;
    value: number;
    className?: string;
    placeholder?: string;
    setValue: (value: number) => void;
    
  }

const OptionalNumericInput: React.FC<OptionalNumericInputProps> = ({ title, symbol, value, className, placeholder, setValue  }) => {
 
    const [isChecked, setIsChecked] = useState(false);

    const switchId: string = title.replace(/\s/g, "").toLocaleLowerCase() + '-switch'; 

    const handleToggle = () => {
      setIsChecked(!isChecked);
    };

return(

<div className={className}>
        <Label htmlFor={switchId} className='flex justify-start pl-2 pt-2'>
          Add {title}
        </Label>
      <div className='flex justify-start pl-2'>
        <Switch id={switchId} onClick={handleToggle}/>
      </div>
      {isChecked && (
        <NumericInput
          title={title}
          symbol={symbol}
          value={value}
          className='flex flex-col pl-1'
          placeholder={placeholder}
          setValue={setValue}
        />
      )}
      </div>
)
      }

export default OptionalNumericInput;