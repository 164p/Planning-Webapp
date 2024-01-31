import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  onSubmit: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleAddDateRecord = async () => {
    if (startDate && endDate) {
      try {
        const response = await fetch('/api/plan/adddate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate, endDate }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData)
        if (responseData.message == 'success') {
          alert('Date record added to MongoDB!');
        } else {
          alert(`Failed to add date record: ${responseData.message}`);
        }
      } catch (error) {
        console.error('Error adding date record:', error);
        alert(error);
      }
    } else {
      alert('Please select both start and end dates.');
    }
  };

  return (
    <div className="flex flex-row space-x-4">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="p-2 border rounded"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className="p-2 border rounded"
      />
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={handleAddDateRecord}
      >
        Add Date Record
      </button>
    </div>
  );
};

export default DateRangePicker;
