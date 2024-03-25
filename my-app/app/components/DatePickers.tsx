'use client';

import React, { FormEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { DatePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

export default function DatePickers(){

    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false)
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(!value[0] && !value[1]){
            setError('Please select date before click create plan.')
        }else{
            setLoading(true)

            const response = await fetch("/api/plan/create", {
                method: 'POST',
                body: JSON.stringify(value)
            })

            const responseData = await response.json()
            if(response.ok){
                const planId = responseData.data.id
                router.push(`/plan/${planId}`);
            }else{
                setError(responseData.message)
            }

            setLoading(false)
        }
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="card rounded-md bg-[#9D864F] p-3 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="col md:col-span-3">
                        <div className="w-full flex items-center bg-white rounded-md p-2 relative">
                            <div className="col grow">
                                <input type="text" required
                                className='w-full py-1.5 px-3 text-sm border border-slate-400 rounded-md' 
                                placeholder="DD/MM/YYYY" autoComplete="off" onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                                defaultValue={value[0] ? new Date(value[0]).toLocaleDateString('en-GB') : ''}/>
                            </div>
                            <div className='col mx-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.7 17.925q-.35.2-.625-.063T12 17.25L14.425 13H3q-.425 0-.713-.288T2 12q0-.425.288-.713T3 11h11.425L12 6.75q-.2-.35.075-.613t.625-.062l7.975 5.075q.475.3.475.85t-.475.85L12.7 17.925Z"></path></svg>
                            </div>
                            <div className="col grow">
                                <input type="text" required
                                className='w-full py-1.5 px-3 text-sm border border-slate-400 rounded-md' 
                                placeholder="DD/MM/YYYY" autoComplete='off' onClick={() => setMenuOpen((prevDisplay) => !prevDisplay)} 
                                defaultValue={value[1] ? new Date(value[1]).toLocaleDateString('en-GB') : ''}/>
                            </div>
                            <div className={'datepicker absolute left-0 top-full z-10 w-full ' + (menuOpen ? 'flex' : 'hidden')}>
                                <div className='card bg-white shadow-md rounded-md p-2 mx-auto' ref={wrapperRef}>
                                    <DatePicker type="range" minDate={new Date()} allowSingleDateInRange value={value} onChange={setValue} />
                                </div>
                            </div>
                        </div>     
                    </div>
                    <div className="col">
                        {
                            (value[0] && value[1]) ? 
                                loading ? (
                                    <button className='w-full h-full bg-[#5F4C50] opacity-75 duration-100 rounded-md text-white py-2 cursor-not-allowed' disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin inline-block" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z" opacity=".1"/><path fill="currentColor" d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"/></g></svg>
                                    </button>
                                ): (
                                    <button type='submit' className='w-full h-full bg-[#674F04] hover:bg-[#614A03] duration-100 rounded-md text-white py-2'>
                                        Create plan
                                    </button>
                                )
                            :(
                                <button className='w-full h-full bg-[#5F4C50] opacity-75 duration-100 rounded-md text-white py-2 cursor-not-allowed' disabled>
                                    Create plan
                                </button>
                            )

                        }
                        
                    </div>
                </div>
                
            </form>
            {
                error && (
                    <div className='card bg-red-600 text-white px-5 py-2 rounded-md mt-2 text-sm flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='mr-1.5' width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm0-4q.425 0 .713-.288Q13 12.425 13 12V8q0-.425-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8v4q0 .425.288.712q.287.288.712.288Zm0 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"></path></svg>
                        <p>{ error }</p>
                        <button className='ml-auto' onClick={() => {setError('')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-2.917 2.925q-.276.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.832 7.4 8.404q0-.427.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.276-.275.704-.275q.427 0 .704.275q.3.3.3.712t-.3.688L13.375 12l2.925 2.917q.275.276.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"></path></svg>
                        </button>
                    </div>
                )
            }
        </>
    )
}