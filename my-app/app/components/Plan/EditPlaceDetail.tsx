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
    
    type resDataLocationDetail = {
        statusCode: number;
        data?: {
            html_attributions?: [];
            result?: {
                formatted_address?: string;
                name?: string;
                photos?: [{
                    photo_reference?: string;
                }];
            };
        };
    };
    
    interface BoxData {
        id: string;
        content?: string;
    }
    
    const [datas, setDatas] = useState<any[]>();
    const [photos, setPhotos] = useState<any[]>([]);
    const [placeDetails, setPlaceDetails] = useState<any[]>([]);
    const [location, setLocation] = useState<any[]>(["central world"]);
    const [boxes, setBoxes] = useState<BoxData[]>([]);
    const [boxCount, setBoxCount] = useState(0);
    const placeDescription = datas?.map((subArray) => subArray.description);
    const [search, setSearcPlace] = useState("");
    const placeID = datas?.map((subArray) => subArray.place_id)?.[0];
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m13 12.175l2.25 2.25q.275.275.275.688t-.275.712q-.3.3-.713.3t-.712-.3L11.3 13.3q-.15-.15-.225-.338T11 12.575V9q0-.425.288-.713T12 8q.425 0 .713.288T13 9v3.175ZM12 6q-.425 0-.713-.288T11 5V4h2v1q0 .425-.288.713T12 6Zm6 6q0-.425.288-.713T19 11h1v2h-1q-.425 0-.713-.288T18 12Zm-6 6q.425 0 .713.288T13 19v1h-2v-1q0-.425.288-.713T12 18Zm-6-6q0 .425-.288.713T5 13H4v-2h1q.425 0 .713.288T6 12Zm6 10q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm8-10q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20q3.35 0 5.675-2.325T20 12Zm-8 0Z"></path></svg>
        </ActionIcon>
    );

    async function searchPlace(e: any){
        setSearcPlace(e.target.value)

        const resAutocomplete = await fetch(
            `/api/autocomplete/detail?query=${encodeURIComponent(e.target.value as string)}`
        );
        if (resAutocomplete.ok) {
            const resData: resDataType = await resAutocomplete.json();
            setDatas(resData.data?.predictions);
        }
    }

    async function locationAdd(e: any) {
        setLocation(e);
        const resLocation = await fetch(
            `/api/explore/locationDetails?place_id=${encodeURIComponent(placeID as string)}`
        );
        if (resLocation.ok) {
            const resLocationData = await resLocation.json();
            setPhotos(prevPhotos => [...prevPhotos, resLocationData.data?.result.photos[1].photo_reference]);
            setPlaceDetails(prevPlaceDetails => [...prevPlaceDetails, {
                placeName: resLocationData.data?.result.name,
                placeAddress: resLocationData.data?.result.formatted_address
            }]);
            const newData = { id: placeID };

            // Update state with the new data and increment box count
            setBoxes([...boxes, newData]);
            setBoxCount(boxCount + 1);
        }
    }
    
    async function addPlace(placeData: any) {

        setShowCard(false)
        setSearcPlace('')

        if(placeData && props.planId && ref.current?.value){

            const targetDate = new Date(props.date)
            const time = ref.current?.value
            const spritTime = time.split(":")

            targetDate.setHours(Number(spritTime[0]), Number(spritTime[1]))

            const json = {
                placeData: placeData,
                planId: props.planId,
                time: targetDate
            }

            const response = await fetch(`/api/place/add`, {
                method: 'POST',
                body: JSON.stringify(json)
            })

            if(response.ok){
                mutate(`/api/place/${props.planId}?date=${encodeURIComponent((props.date || '') as string)}`)
            }else{
                const resp = await response.json()
                await Swal.fire({
                    title: 'Save failed',
                    text: resp.message,
                    icon: 'error',
                }) 
            }
        }
    }

    const photoUrls = photos.map(photo =>`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`);

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
                    data.data?.length > 0 && (
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
                {/* {placeDetails.map((place, index) => (
                    <div key={index} className="box">
                        {photos[index] && <img src={photoUrls[index]} alt={`Photo of ${place.placeName}`} />}
                        <p>{place.placeName}</p>
                        <p>{place.placeAddress}</p>
                    </div>
                ))} */}
                <div className='plan-detail-section grid grid-cols-4'>
                    <div className='col relative'>
                        <div className='line bg-[#674F04] w-0.5 h-full absolute right-5 top-0'>
                        </div>
                    </div>
                    <div className='col col-span-3 relative'>
                        <button onClick={() => setShowCard((prevDisplay) => !prevDisplay)} className='bg-gray-200 border border-slate-300 w-full py-3 px-5 rounded-md mb-5 text-slate-500 flex flex-col items-center hover:bg-gray-300 duration-150'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path></svg>
                        </button>
                        <div className={"add-place-section "+
                            (showCard ?
                                "absolute top-0 left-0 z-50 w-full":
                                "hidden"
                            )
                        }>
                            <div className='card bg-[#E4D7C1] border border-slate-300 w-full rounded-md shadow p-5 overflow-hidden'>
                                <div className='card-header flex items-center mb-3'>
                                    <p className='font-semibold'>Add your faverite place</p>
                                    <button onClick={() => setShowCard((prevDisplay) => !prevDisplay)} className='ml-auto'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path></svg>
                                    </button>
                                </div>
                                <div className='card-body'>
                                    <div className='input-group mb-3'>
                                        <TimeInput label="Choose time" ref={ref} rightSection={pickerControl} />
                                    </div>
                                    <div className='input-group'>
                                        <label htmlFor="search">Search place</label>
                                        <input type='text' id='search' name='search'
                                            className='w-full py-1.5 px-3 text-sm rounded-md bg-white focus:outline-none forcus:border-slate-400 focus:ring-1 focus:ring-slate-400'
                                            placeholder='Search place'
                                            onChange={searchPlace}
                                            value={search}
                                        />
                                    </div>
                                    <div className='overflow-auto max-h-52'>
                                        {
                                            search && datas && datas.map((place, index) => (
                                                <button 
                                                    onClick={() => addPlace(place)}
                                                    key={index} className='block w-full px-5 py-3 mb-2 rounded-md border border-[#876A0F] first:mt-3 last:mb-0 text-start'>
                                                    <p className='font-bold'>{place.structured_formatting.main_text}</p>
                                                    <p>{place.structured_formatting.secondary_text}</p>
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </>
    )
}