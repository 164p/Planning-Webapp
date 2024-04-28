'use client';
import useSWR from 'swr'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { planStatus } from "@prisma/client";


const fetcher = (url: any) => fetch(url).then(res => res.json())

export default function EditPlaceDetail(props: any){

    const [showCard, setShowCard] = useState(false)

    const { data, error, isLoading } = useSWR(`/api/place/${props.planId}?date=${encodeURIComponent((props.date || '') as string)}`, fetcher, 
    { 
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    if(!props.date || !props.planId){
        return (
            <>
                <div className='bg-gray-400 px-16 py-4 mx-auto mt-1 rounded-md  max-w-40 animate-pulse'>
                </div>
            </>
        )
    }

    if(isLoading){
        return (
            <>
                <div className='bg-gray-400 px-16 py-4 mx-auto mt-1 rounded-md  max-w-40 animate-pulse'>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='plan-detail-main'>
                {
                    data.data.length > 0 && (
                        <>
                            <div className='plan-detail-section grid grid-cols-4'>
                                <div className='col relative'>
                                    <div className='line bg-[#674F04] w-0.5 h-full absolute right-5 top-0'>
                                    </div>
                                </div>
                                <div className='col col-span-3'>
                                    <div className='bg-[#E4D7C1] p-5 rounded-md mb-5'>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='plan-detail-section grid grid-cols-4'>
                                <div className='col relative'>
                                    
                                    <div className='line bg-[#674F04] w-0.5 h-full absolute right-5 top-0'>
                                    </div>
                                </div>
                                <div className='col col-span-3'>
                                    <div className='card bg-[#E4D7C1] p-5 rounded-md mb-5'>
                                        
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <div className='plan-detail-section grid grid-cols-4 relative'>
                    <div className='col relative'>
                        <div className='line bg-[#674F04] w-0.5 h-full absolute right-5 top-0'>
                        </div>
                    </div>
                    <div className='col col-span-3'>
                        <button onClick={() => setShowCard((prevDisplay) => !prevDisplay)} className='bg-gray-200 border border-slate-300 w-full p-5 rounded-md mb-5 text-slate-500 flex flex-col items-center hover:bg-gray-300 duration-150'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path></svg>
                            <p className='font-semibold'>Add place</p>
                        </button>
                    </div>
                    <div className={"add-place-section "+
                        (showCard ?
                            "absolute top-0 left-0 z-50 w-full":
                            "hidden"
                        )
                    }>
                        <div className='card bg-white border border-slate-200 w-full rounded-md shadow p-5 relative overflow-hidden'>
                            <button onClick={() => setShowCard((prevDisplay) => !prevDisplay)} className='absolute right-3 top-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </>
    )
}