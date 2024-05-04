import React, { useState } from 'react';
import { YearlyTotals } from './ui/columns';

const TestApi: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResult] = useState<YearlyTotals[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const url: string = apiUrl + 'api/compound-interest'

  const initAmount: number = 1000
  const monthlyContribution: number = 0
  const interestRate: number = 10
  const numberOfYears: number = 14

  
  const calculateCompoundInterest = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ initAmount: initAmount, monthlyContribution: monthlyContribution, interestRate: interestRate, numberOfYears: numberOfYears })
    };

    try {
       await fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setResult(data));

      setError(null);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('Error fetching data. Please try again later.');
    }
  }

  return (
    <div>
      <button onClick={calculateCompoundInterest}>Calculate Compound Interest</button>
      {error && <div>{error}</div>}
      {results && results.length && results.map( result =>
        <li key={result.year}>
          <ul>Total Amount: {result.total}</ul>
          <ul>Yearly Interest: {result.yearlyInterest}</ul>
          {/* Add more fields as needed */}
        </li>
      )}
    </div>
  );
}

export default TestApi;
