'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';

export default function page(){

    const dataFormat = {
        startDate: '',
        endDate: '',
    }

    const dateSetOfPlan = []

    const searchParams = useSearchParams()
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')
    const [data, setData] = useState(dataFormat)
    const [ArrayDataSet, setArrayDataSet] = useState([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const setUpArrayDataSet = () => {
        if(endDate && startDate){
            const Difference_In_Time = new Date(endDate).getTime() - new Date(startDate).getTime();
            const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
            console.log(Difference_In_Days)
        }
        
    }

    useEffect(() => {
        const newDate = {
            startDate: new Date(startDate ?? '').toLocaleDateString('en-CA'),
            endDate: new Date(endDate ?? '').toLocaleDateString('en-CA')
        }
        setData(newDate);
        setUpArrayDataSet()
    },[startDate, endDate])

    return (
        <div className="container pt-28">
            <div className="header-section mb-8">
                <h1 className="text-center font-bold text-2xl">Create you plan</h1>
            </div>
            <div className='section'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='col'>
                        <div className='col-section mb-3'>
                            <Link href={'/plan'} className='flex items-center hover:text-[#9B8651] duration-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='mr-1.5' width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"></path></svg>
                                Back to see your plan
                            </Link>
                        </div>
                        <div className='card rounded-md bg-[#D3BD9A] p-3'>
                            <div className='input-group mb-3'>
                                <input type='date' className='w-full py-1.5 px-3 text-sm rounded-md focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400' name='startDate' id='startDate'
                                onChange={handleChange} value={data.startDate} />
                            </div>
                            <div className='input-group'>
                                <input type='date' className='w-full py-1.5 px-3 text-sm rounded-md focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400' name='startDate' id='startDate'
                                onChange={handleChange} value={data.endDate} />
                            </div>
                        </div>
                    </div>
                    <div className='col md:col-span-2'>
                        <div className='card rounded-md bg-[#674F04] p-3 text-slate-100'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}