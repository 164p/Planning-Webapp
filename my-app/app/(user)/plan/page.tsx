'use client'
import React from 'react';
import DateRangePicker from '../../components/DatePick';

const Home: React.FC = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-8">
      <DateRangePicker onSubmit={function (startDate: Date, endDate: Date): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default Home;
