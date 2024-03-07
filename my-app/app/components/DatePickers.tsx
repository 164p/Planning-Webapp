'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

export default function DatePickers(){

    const [menuOpen, setMenuOpen] = useState(false)
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

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

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
        <>
            <div className="card rounded-md bg-[#D3BD9A] p-3 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="col md:col-span-3">
                    <div className="w-full flex items-center bg-white rounded-md p-2 relative">
                        <div className="col grow">
                            <input type="text" 
                            className='w-full py-1.5 px-3 text-sm border border-slate-400 rounded-md' 
                            placeholder="DD/MM/YYYY" autoComplete="off" onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                            defaultValue={value[0] ? new Date(value[0]).toLocaleDateString('en-GB') : ''}/>
                        </div>
                        <div className='col mx-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.7 17.925q-.35.2-.625-.063T12 17.25L14.425 13H3q-.425 0-.713-.288T2 12q0-.425.288-.713T3 11h11.425L12 6.75q-.2-.35.075-.613t.625-.062l7.975 5.075q.475.3.475.85t-.475.85L12.7 17.925Z"></path></svg>
                        </div>
                        <div className="col grow">
                            <input type="text" 
                            className='w-full py-1.5 px-3 text-sm border border-slate-400 rounded-md' 
                            placeholder="DD/MM/YYYY" autoComplete='off' onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                            defaultValue={value[1] ? new Date(value[1]).toLocaleDateString('en-GB') : ''}/>
                        </div>
                        <div className={'datepicker absolute left-0 top-full z-10 w-full ' + (menuOpen ? 'flex' : 'hidden')}>
                            <div className='card bg-white shadow-md rounded-md p-2 mx-auto' ref={wrapperRef}>
                                <DatePicker type="range" allowSingleDateInRange value={value} onChange={setValue} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {
                        (value[0] && value[1]) ? (
                            <Link href={`/plan/create?start=${value[0]}&end=${value[1]}`}>
                                <button className='w-full h-full bg-[#674F04] hover:bg-[#856F3A] duration-100 rounded-md text-white py-2'>
                                    Create plan
                                </button>
                            </Link>
                        ):(
                            <button className='w-full h-full bg-[#856F3A] opacity-75 duration-100 rounded-md text-white py-2 cursor-not-allowed' disabled>
                                Create plan
                            </button>
                        )

                    }
                    
                </div>
            </div>
        </>
    )
}