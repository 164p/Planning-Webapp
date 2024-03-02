'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function DatePicker(){

    const [menuOpen, setMenuOpen] = useState(false)
    const [indexDate, setIndexDate] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [firstPreviewDate, setFirstPreviewDate] = useState(Date)

    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    useEffect(() => {
        const currentDates = new Date()
        setFirstPreviewDate(String(currentDates))
    })

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

    async function nextIndexDate() {
        setIndexDate(indexDate + 1)
        setFirstPreviewDate(String(new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + indexDate))))
    }

    async function previousIndexDate() {
        setIndexDate(indexDate - 1)
        setFirstPreviewDate(String(new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() - indexDate))))
    }

    async function setDate(date: any) {
        
        if(!startDate){
            setStartDate(date)
        }

        if(!endDate && startDate){
            if(new Date(date) < new Date(startDate)){
                setStartDate(date)
            }else{
                setEndDate(date)
            }
        }

        if(startDate && endDate){
            setStartDate(date)
            setEndDate('')
        }
    }

    return (
        <div className="card rounded-md bg-[#674F04] p-3 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 relative">
            <div className="col md:col-span-3">
                <div className="w-full flex items-center bg-white rounded-md p-2" ref={wrapperRef}>
                    <div className="col grow">
                        <input type="text" 
                        className='w-full py-1.5 px-3 text-sm border border-slate-400 rounded-md' 
                        placeholder="DD/MM/YYYY" autoComplete="off" onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                        defaultValue={startDate ? new Date(startDate).toLocaleDateString('th-TH') : ''}/>
                    </div>
                    <div className='col mx-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.7 17.925q-.35.2-.625-.063T12 17.25L14.425 13H3q-.425 0-.713-.288T2 12q0-.425.288-.713T3 11h11.425L12 6.75q-.2-.35.075-.613t.625-.062l7.975 5.075q.475.3.475.85t-.475.85L12.7 17.925Z"></path></svg>
                    </div>
                    <div className="col grow">
                        <input type="text" 
                        className='w-full py-1.5 px-3 text-sm border border-slate-400 rounded-md' 
                        placeholder="DD/MM/YYYY" autoComplete='off' onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                        defaultValue={endDate ? new Date(endDate).toLocaleDateString('th-TH') : ''}/>
                    </div>
                    <div className={'datepicker absolute bg-white shadow-md left-0 top-20 z-10 w-full rounded-md p-2 ' + (menuOpen ? 'block' : 'hidden')}>
                        <div className='datepicker-body divide-x grid grid-cols-2 gap-3'>
                            <div className='col p-2'>
                                <div className='datepicker-title flex items-center mb-3'>
                                    <button onClick={previousIndexDate}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"></path></svg>
                                    </button>
                                    <p className='ml-2'>
                                        {month[new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + indexDate)).getMonth()]} {new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + indexDate)).getFullYear()}
                                    </p>
                                </div>
                                <div className='datepicker-section grid grid-cols-7 gap-2'>
                                    {
                                        Array.from(Array(new Date(new Date(firstPreviewDate).getFullYear(), new Date(firstPreviewDate).getMonth()+(1 + indexDate), 0).getDate()), (e, i) => {
                                            return (
                                                <button className='text-center rounded-full hover:text-white hover:bg-[#674F04]' 
                                                    key={i}
                                                    onClick={() => setDate(
                                                        String(new Date(`${new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + indexDate)).getFullYear()}-${new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + indexDate)).getMonth() + 1 }-${i+1}`)))}
                                                >
                                                    <p>{i+1}</p>
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='col p-2'>
                                <div className='datepicker-title flex items-center mb-3'>
                                    <p className='mr-2 ml-auto'>
                                        {month[new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + 1 + indexDate)).getMonth()]} {new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + 1 + indexDate)).getFullYear()}
                                    </p>
                                    <button className='' onClick={nextIndexDate}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.3-.713t.3-.712q.3-.3.713-.3t.712.3L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.687.275t-.713-.3Z"></path></svg>
                                    </button>
                                </div>
                                <div className='datepicker-section'>
                                    <div className='datepicker-section grid grid-cols-7 gap-2'>
                                        {
                                            Array.from(Array(new Date(new Date(firstPreviewDate).getFullYear(), new Date(firstPreviewDate).getMonth()+(2 + indexDate), 0).getDate()), (e, i) => {
                                                return (
                                                    <button className='text-center rounded-full hover:text-white hover:bg-[#674F04]' 
                                                        key={i}
                                                        onClick={() => setDate(
                                                            String(new Date(`${new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + 1 + indexDate)).getFullYear()}-${new Date(new Date(firstPreviewDate).setMonth(new Date(firstPreviewDate).getMonth() + 1 + indexDate)).getMonth() + 1}-${i+1}`)))}
                                                    >
                                                        <p>{i+1}</p>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col">
                <button className='w-full h-full bg-[#402E32] hover:bg-[#856F3A] duration-100 rounded-md text-white py-2'>
                    Create plan
                </button>
            </div>
        </div>
    )
}