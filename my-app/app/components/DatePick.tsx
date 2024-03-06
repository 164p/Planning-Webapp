import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'

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
    if(!startDate || !endDate){
      Swal.fire({
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        icon: 'error',
        confirmButtonText: 'ปิด'
      })
    }else{
      try {
        const response = await fetch('/api/plan/adddate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate, endDate }),
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มข้อมูลสำเร็จ', 
            confirmButtonText: 'ปิด',
            timer: 1500,
            timerProgressBar: true
          })
        }else{
          const responseData = await response.json()

          Swal.fire({
              icon: 'error',
              title: 'เพิ่มข้อมูลไม่สำเร็จ', 
              text: responseData.message, 
              confirmButtonText: 'ปิด',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'เพิ่มข้อมูลไม่สำเร็จ',
          text: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง',
          icon: 'error',
          confirmButtonText: 'ปิด'
        })
      }
      
    }
  };

  return (
    <div>
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
    </div >
      <div className='flex'>
        <button onClick={handleAddDateRecord} className="mx-auto overflow-hidden max-w-15 font-bold text-lg bg-[#674F04] hover:bg-[#896A08] duration-100 px-8 py-3 rounded-md text-[#E3B31F] mt-5">
          Start planning
        </button>
      </div> 
    </div>


  );
};

export default DateRangePicker;
