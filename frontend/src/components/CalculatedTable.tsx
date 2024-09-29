import { useState, useEffect } from 'react';
import { YearlyTotals, columns } from './ui/columns';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from "@/components/ui/data-table"; 
import { CardDropDownSelector } from "@/components/cardDropdownSelector";
import { Button } from "@/components/ui/button";
import { CalculatedCards } from './calculatedCards';

function EditResetButtons({ onEdit, onReset }: { onEdit: () => void; onReset: () => void; }) {
  return (
    <div className="flex flex-row justify-between items-center p-2">
      <div className="flex">
        <Button onClick={onEdit} className="mr-4">
          <h4>Edit</h4>
        </Button>
        <Button onClick={onReset}>
          <h4>Reset</h4>
        </Button>
      </div>
    </div>
  );
}

export default function CalculatedTable(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [tabledata, setTableData] = useState<YearlyTotals[]>([]);

  const initAmount = Number(new URLSearchParams(location.search).get('initAmount'));
  const monthlyContribution = Number(new URLSearchParams(location.search).get('monthlyContribution'));
  const interestRate = Number(new URLSearchParams(location.search).get('interestRate'));
  const numberOfYears = Number(new URLSearchParams(location.search).get('numberOfYears'));

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL + 'api/compound-interest';
      const requestOptions = {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ initAmount, monthlyContribution, interestRate, numberOfYears }),
      };
      
      try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (initAmount && monthlyContribution && interestRate && numberOfYears) {
      fetchData();
    }
  }, [initAmount, monthlyContribution, interestRate, numberOfYears]);

  const reset = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate('/', {
      state: {
        numberOfYears,
        monthlyContribution,
        initAmount,
        interestRate,
      },
    });
  };

  const displayedTotal = tabledata[selectedYear - 1]?.total || 0;
  const displayedGains = tabledata[selectedYear - 1]?.yearlyInterest || 0;
  const displayedYear = (tabledata[selectedYear - 1]?.year || 0) + new Date().getFullYear();

  return (
    <div className="flex flex-row">
      <div className="container py-4 mr-4">
        <div className='flex flex-row justify-between'>
          <EditResetButtons onEdit={handleEdit} onReset={reset} />
          <CardDropDownSelector yearlyTotals={tabledata} onYearChange={setSelectedYear}/>
        </div> 

        <DataTable columns={columns} data={tabledata} />

        <EditResetButtons onEdit={handleEdit} onReset={reset} />
      </div>

      <div className="md:flex hidden flex-row space-x-2">
        <CalculatedCards cardTitle='Total' cardDescription={`${displayedYear} Assets`} cardContent={displayedTotal} />
        <CalculatedCards cardTitle='Yearly Gains' cardDescription={`${displayedYear} Gain`} cardContent={displayedGains} />
      </div>
    </div>
  );
}
