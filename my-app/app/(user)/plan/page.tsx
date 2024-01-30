import React from 'react';
import DateRangePicker from '../../components/DatePick';

const Home: React.FC = () => {
  const handleAddDateRecord = async (startDate: Date, endDate: Date) => {
    try {
      const response = await fetch('/api/addDateRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      if (response.ok) {
        alert('Date record added to MongoDB!');
      } else {
        const { message } = await response.json();
        alert(`Failed to add date record: ${message}`);
      }
    } catch (error) {
      console.error('Error adding date record:', error);
      alert('Failed to add date record to MongoDB');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-8">
      <DateRangePicker onSubmit={handleAddDateRecord} />
    </div>
  );
};

export default Home;
