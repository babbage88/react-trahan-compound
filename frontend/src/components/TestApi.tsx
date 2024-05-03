import React, { useState } from 'react';

const TestApi: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateCompoundInterest = async () => {
    const url = 'https://calc.api.trahan.dev/api/compound-interest';
    const requestData = {
      initAmount: 1000,
      interestRate: 10,
      monthlyContribution: 0,
      numberOfYears: 10
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setResult(responseData);
      setError(null);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setResult(null);
      setError('Error fetching data. Please try again later.');
    }
  }

  return (
    <div>
      <button onClick={calculateCompoundInterest}>Calculate Compound Interest</button>
      {error && <div>{error}</div>}
      {result && (
        <div>
          <h2>Compound Interest Result</h2>
          <p>Amount: {result.amount}</p>
          <p>Interest: {result.interest}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
}

export default TestApi;
