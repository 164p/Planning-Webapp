'use client';

import useSWR from 'swr'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ViewPlaceDetail from '@/app/components/Plan/ViewPlaceDetail';

const fetcher = (url: any) => fetch(url).then(res => res.json())

export default function page({ params }: { params: { id: string } }) {

    const { data, error, isLoading } = useSWR(`/api/plan/${params.id}`, fetcher)

    const FormDataInputs = {
        name: "",
        budget: 0,
        images: "",
        detail: "",
        status: "",
        endDate: null as any,
        startDate: null as any
    }

    const [indexPage, setIndexPage] = useState(0)
    const [maxDate, setMaxDate] = useState(0)
    const [showDate, setShowDate] = useState<Date | null>(null)
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);


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

    useEffect(() => {
        if(data?.data){
            const newDate = {
                startDate: data?.data.planData.startDate ?? '',
                endDate: data?.data.planData.endDate ?? ''
            }
            setUpArrayDataSet([new Date(newDate.startDate), new Date(newDate.endDate)])
            setValue([new Date(newDate.startDate), new Date(newDate.endDate)])
            setShowDate(new Date(newDate.startDate))
        }
    },[data])

    return (
        <div className="container py-28">
            <div className="header-section mb-8">
                <h1 className="text-center font-bold text-2xl">Plan Details</h1>
                {
                    (isLoading ? 
                        <div className='bg-gray-400 px-16 py-4 mx-auto mt-1 rounded-md  max-w-40 animate-pulse'>
                        </div>
                        : (data?.data && data.data.planData.status === 'draft') && (
                        <div className="bg-gray-500 text-white font-bold text-sm px-3 py-1.5 text-center mx-auto max-w-40 mt-1 rounded-md">
                            DRAFT PLAN
                        </div>
                    ))
                }
                {
                    (!isLoading && !data?.data) && (
                        <div className='card rounded-md bg-red-600 px-8 py-2 text-center text-white mx-auto max-w-fit mt-2'>
                            <p className='font-bold'>Your plan is not found</p>
                            <p className='text-sm'>please return to plan page</p>
                        </div>
                    )
                }
            </div>
            <div className='section'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='col'>
                        <div className='col-section mb-3'>
                            <Link href={'/plan'} className='flex hover:text-[#9B8651] duration-100 w-fit items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='mr-1.5' width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"></path></svg>
                                View all plan
                            </Link>
                        </div>
                        <div className='card rounded-md bg-[#E4D7C1] overflow-hidden'>
                            <div className='card-header relative'>
                                {
                                    (!isLoading && data?.data.planData.images) && (
                                        <>
                                            <Image src={data?.data.planData.images} alt="Preview Images" width={0} height={0} sizes="120vw" priority={true}
                                                style={{ width: '100%', height: 'auto' }} className=''/>
                                            
                                        </>
                                    )
                                }
                                <Link href={`/plan/edit/${params.id}`} className='absolute top-3 right-3 bg-[#674F04] rounded-full p-2 text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM4 21q-.425 0-.713-.288T3 20v-2.825q0-.2.075-.388t.225-.337l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225T6.825 21H4ZM14.325 9.675l-.7-.7l1.4 1.4l-.7-.7Z"></path></svg>
                                </Link>
                            </div>
                            <div className='card-body p-5'>
                                {
                                    isLoading ? (
                                        <p className='text-center'><svg xmlns="http://www.w3.org/2000/svg" className="animate-spin inline-block mr-2" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z" opacity=".1"/><path fill="currentColor" d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"/></g></svg></p>
                                    ): data?.data && (
                                        <> 
                                            <div className='mb-3'>
                                                <p className='font-semibold'>Dates</p>
                                                <p>{ value[0] ? new Date(value[0]).toLocaleDateString('en-GB') : '' } - { value[1] ? new Date(value[1]).toLocaleDateString('en-GB') : '' }</p>
                                            </div>
                                            <div className='mb-3'>
                                                <p className='font-semibold'>Plan name</p>
                                                <p>{data?.data.planData.name}</p>
                                            </div>
                                            <div className='mb-3'>
                                                <p className='font-semibold'>Plan budget</p>
                                                <p>{(data?.data.planData.budget || 0).toLocaleString()} THB</p>
                                            </div>
                                            <div className='mb-2'>
                                                <p className='font-semibold'>Plan detail</p>
                                                <p>{data?.data.planData.detail}</p>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col md:col-span-2'>
                        <div className='card rounded-md bg-[#674F04] p-3 text-slate-100 flex mb-5'>
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
                        <ViewPlaceDetail planId={params.id} date={showDate} />
                    </div>
                </div>
            </div>
        </div>
    )
}