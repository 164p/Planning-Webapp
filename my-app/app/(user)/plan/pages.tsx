'use client'
import React from 'react';
import DateRangePicker from '../../components/DatePick';
import PlanningBox from '@/app/components/PlanningBox';

export default function Page(){
  
  return (
    <div className='bg-[#F5F0E8]'>
      <div className='container'>
            <h1 className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>Plan List</h1>
            <div className='flex justify-center items-center'>
            <DateRangePicker onSubmit={function (startDate: Date, endDate: Date): void {
              throw new Error('Function not implemented.');
              } } />
            </div>
            <p className='flex text-[#674F04] text-2xl font-medium justify-center items-center pb-3'></p>
            <div className='flex justify-center items-center'>
                <div className='flex w-full p-0.5 mt-10 lg:w-2/3 bg-[#674F04] '/>
            </div>
            <div className='bg-[#F5F0E8] py-10'>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6'>
                  <PlanningBox />
                  <PlanningBox />
                  <PlanningBox />
                  <PlanningBox />
                </div>
            </div>
          </div>
        </div>
  );
};







