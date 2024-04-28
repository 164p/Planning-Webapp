'use client';
import useSWR from 'swr'
import Link from "next/link";
import { planStatus } from "@prisma/client";


const fetcher = (url: any) => fetch(url).then(res => res.json())

export default function ViewPlaceDetail(props: any){

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
        <div className='plan-detail-main'>
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
                    <div className='bg-[#E4D7C1] p-5 rounded-md mb-5'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}