import { FC } from 'react';
import { Button } from "@/components/ui/button";

interface CalculateButtonProps {
  evaluate: () => void;
  className?:  string;
}

const CalculateButton: FC<CalculateButtonProps> = ({ evaluate, className }) => {
  return (
    <div className={className}>
      <Button onClick={evaluate} > 
    <h4>
      Calculate Returns.
    </h4>
  </Button>
    </div>
    
  );
}

export default CalculateButton;
