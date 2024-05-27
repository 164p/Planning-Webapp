'use client';
import useSWR from 'swr'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { mutate } from "swr"
import { ActionIcon, rem } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import Swal from 'sweetalert2'

const fetcher = (url: any) => fetch(url).then(res => res.json())

export default function EditPlaceDetail(props: any){

    const [showCard, setShowCard] = useState(false)

    const { data, error, isLoading } = useSWR(`/api/place/${props.planId}?date=${encodeURIComponent((props.date || '') as string)}`, fetcher, 
    { 
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    type resDataType = {
        statusCode: number;
        data?: {
            predictions: any[];
        };
    };
    
    const [datas, setDatas] = useState<any[]>();
    const [search, setSearcPlace] = useState("");
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m13 12.175l2.25 2.25q.275.275.275.688t-.275.712q-.3.3-.713.3t-.712-.3L11.3 13.3q-.15-.15-.225-.338T11 12.575V9q0-.425.288-.713T12 8q.425 0 .713.288T13 9v3.175ZM12 6q-.425 0-.713-.288T11 5V4h2v1q0 .425-.288.713T12 6Zm6 6q0-.425.288-.713T19 11h1v2h-1q-.425 0-.713-.288T18 12Zm-6 6q.425 0 .713.288T13 19v1h-2v-1q0-.425.288-.713T12 18Zm-6-6q0 .425-.288.713T5 13H4v-2h1q.425 0 .713.288T6 12Zm6 10q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm8-10q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20q3.35 0 5.675-2.325T20 12Zm-8 0Z"></path></svg>
        </ActionIcon>
    );

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
    
    const photoUrls = data?.data.map(
        (photo:any) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.images}&key=AIzaSyB5kjqj-I8H1VN5FsJXRBco_84TGWSLspM`
        )

    const googlemapsearch = data?.data.map((e:any) => `https://www.google.com/maps/search/?api=1&query=${e.name}`)

    return (
        <>
            <div className='plan-detail-main'>
                {
                    (data.data.length > 0) && data.data.map((placeData: any, index: number) => (
                        <div key={index} className='plan-detail-section grid grid-cols-4'>
                            <div className='col relative flex'>
                                <span className='ml-auto mr-5 px-5 py-2'>
                                    {new Date(placeData.time).getHours()} : {(new Date(placeData.time).getMinutes() < 10 ? '0' : '') + new Date(placeData.time).getMinutes()}
                                </span>
                                <div className='line bg-[#674F04] w-0.5 h-full absolute right-5 top-0'>
                                </div>
                            </div>
                            <div className='col col-span-3'>
                                <div className='card bg-[#E4D7C1] rounded-md mb-5 flex overflow-hidden'>
                                    {
                                        placeData.images ? (
                                               
                                               <div className='card-header min-w-32 min-h-full' 
                                               style={{
                                                   backgroundImage: `url(${photoUrls[index]})`,
                                                   backgroundPosition: 'center center',
                                                   backgroundSize: 'cover',
                                                   backgroundRepeat: 'no-repeat'
                                               }}>
                                           </div>
                                        ):(
                                            <div className='card-header min-w-32 min-h-full' 
                                                style={{
                                                    backgroundImage: `url(/ImageTemplate.png)`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}>
                                            </div>
                                        )
                                    }
                                    <a href={googlemapsearch[index]} target="_blank">
                                    <div className='card-body p-5'>
                                        <p className='font-bold'>{placeData.name}</p>
                                        <p className='text-sm'>{placeData.detail}</p>
                                    </div>
                                    </a>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className='plan-detail-section grid grid-cols-4'>
                    <div className='col relative'>
                        <div className='line bg-[#674F04] w-0.5 h-full absolute right-5 top-0'>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}