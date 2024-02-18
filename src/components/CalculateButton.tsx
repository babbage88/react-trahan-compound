import { FC } from 'react';
import { Button } from "@/components/ui/button";

interface CalculateButtonProps {
  evaluate: () => void;
}

const CalculateButton: FC<CalculateButtonProps> = ({ evaluate }) => {
  return (
    <Button onClick={evaluate} > 
    <h4>
      Calculate Returns.
    </h4>
  </Button>
  );
}

export default CalculateButton;
