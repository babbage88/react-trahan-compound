import React from 'react';

interface Props {
  finalValue: number;
  reset: () => void;
  monthlyContribution: number;
  numberOfYears: number;
  initAmount: number;
}

export default function CalculatedAmounts(props: Props): JSX.Element {
  const { finalValue, reset, monthlyContribution, numberOfYears, initAmount } = props;
  if (!finalValue) {
    return <div></div>;
  }
  console.log(numberOfYears, monthlyContribution, initAmount);
  const amounts: {[key: string]: number} = {
    'Compounded Amount': finalValue,
    'Ordinary Amount':
      numberOfYears * monthlyContribution * 12 + initAmount,
    'Difference':
      finalValue -
      (numberOfYears * monthlyContribution * 12 + initAmount),
  };

  return (
    <div className="bg-blue-400 rounded text-white flex flex-col gap-6 p-4">
      {Object.keys(amounts).map((amount, amountIndex) => {
        return (
          <div key={amountIndex} className="flex items-center gap-2">
            <h2 className="text-lg font-semibold sm:text-xl md:text-2xl ">{amount}</h2>
            <p>${amounts[amount].toFixed(2)}</p>
          </div>
        );
      })}
      <button
        className="px-4 py-2 text-center border-2 border-solid border-white font-bold text-white rounded"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
}
