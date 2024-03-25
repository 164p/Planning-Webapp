'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

export default function page(){

    const dataFormat = {
        startDate: '',
        endDate: '',
    }

    const dateSetOfPlan = []

    const searchParams = useSearchParams()

    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')

    const [indexPage, setIndexPage] = useState(0)
    const [maxDate, setMaxDate] = useState(0)
    const [ArrayDataSet, setArrayDataSet] = useState([])
    const [showDate, setShowDate] = useState<Date | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    
    const handleChange = (val: [Date | null, Date | null]) => {
        setValue(val)
        setUpArrayDataSet(val)
        setShowDate(val[0])
        setIndexPage(0)
    };

    const nextIndexPage = () => {
        setIndexPage(indexPage + 1)
        setCurrentDate(1)
    }

    const previousIndexPage = () => {
        setIndexPage(indexPage - 1)
        setCurrentDate(-1)
    }

    const setCurrentDate = (index: number) => {
        if(showDate){
            setShowDate(new Date(showDate.setDate(showDate.getDate() + index)))
        }
    }

    const setUpArrayDataSet = (val: [Date | null, Date | null]) => {
        if(val[0] && val[1]){
            const Difference_In_Time = new Date(val[1]).getTime() - new Date(val[0]).getTime();
            const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
            setMaxDate(Difference_In_Days+1)
        }
    }

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenuOpen(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        const newDate = {
            startDate: startDate ?? '',
            endDate: endDate ?? ''
        }
        setUpArrayDataSet([new Date(newDate.startDate),new Date(newDate.endDate)])
        setValue([new Date(newDate.startDate),new Date(newDate.endDate)])
        setShowDate(new Date(newDate.startDate))

    },[startDate, endDate])

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className="container pt-28 pb-12">
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
                        <div className='card rounded-md bg-[#E4D7C1] p-5'>
                            <div className='card-header mb-3'>
                                <p className='font-semibold'>Setting plan details</p>
                            </div>
                            <div className='card-body'>
                                <div className='section w-full flex items-center mb-2 relative'>
                                    <div className='col grow'>
                                        <input type="text" id='startDate'
                                        className='w-full py-1.5 px-3 text-sm rounded-md focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400' 
                                        placeholder="DD/MM/YYYY" autoComplete="off" onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                                        defaultValue={value[0] ? new Date(value[0]).toLocaleDateString('en-GB') : ''}/>
                                    </div>
                                    <div className='col mx-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.7 17.925q-.35.2-.625-.063T12 17.25L14.425 13H3q-.425 0-.713-.288T2 12q0-.425.288-.713T3 11h11.425L12 6.75q-.2-.35.075-.613t.625-.062l7.975 5.075q.475.3.475.85t-.475.85L12.7 17.925Z"></path></svg>
                                    </div>
                                    <div className='col grow'>
                                        <input type="text" id='endDate'
                                        className='w-full py-1.5 px-3 text-sm rounded-md focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400' 
                                        placeholder="DD/MM/YYYY" autoComplete="off" onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                                        defaultValue={value[1] ? new Date(value[1]).toLocaleDateString('en-GB') : ''}/>
                                    </div>
                                    <div className={'datepicker absolute left-0 top-full z-10 w-full ' + (menuOpen ? 'flex' : 'hidden')}>
                                        <div className='card bg-white shadow-md rounded-md p-2 mx-auto' ref={wrapperRef}>
                                            <DatePicker type="range" minDate={new Date()} allowSingleDateInRange value={value} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor='planName' className='text-sm'>Plan Name</label>
                                    <input type='text' id='planName'
                                    className='w-full py-1.5 px-3 text-sm rounded-md focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400'
                                    placeholder='Plan name'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col md:col-span-2'>
                        <div className='card rounded-md bg-[#674F04] p-3 text-slate-100 flex'>
                            <div className='col'>
                                {
                                    indexPage > 0 ? (
                                        <button type='button' className='hover:text-slate-300 duration-100' onClick={previousIndexPage}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"></path></svg>
                                        </button>
                                    ):(
                                        <button className='cursor-not-allowed text-slate-400' disabled>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"></path></svg>
                                        </button>
                                    )
                                }
                            </div>
                            <div className='col mx-auto text-center'>
                                <p className='font-bold text-lg'>Day {indexPage+1}</p>
                                {
                                    showDate ? (
                                        <p className='text-sm'>{String(showDate.toLocaleDateString('en', {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',}))}</p>
                                    ):(
                                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin inline-block mr-2" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z" opacity=".1"/><path fill="currentColor" d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"/></g></svg>
                                    )
                                }
                                
                            </div>
                            <div className='col'>
                                {
                                    indexPage < (maxDate-1) ? (
                                        <button type='button' className='hover:text-slate-300 duration-100' onClick={nextIndexPage}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.3-.713t.3-.712q.3-.3.713-.3t.712.3L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.687.275t-.713-.3Z"></path></svg>
                                        </button>
                                    ):(
                                        <button className='cursor-not-allowed text-slate-400' disabled>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.3-.713t.3-.712q.3-.3.713-.3t.712.3L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.687.275t-.713-.3Z"></path></svg>
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}