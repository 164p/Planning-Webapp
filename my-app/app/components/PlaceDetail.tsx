import React, { useState, useEffect } from 'react';
import Image from "next/image"
import useSWR from 'swr'
import Tag from "@/app/components/Tag"
import { MdOutlineStar } from "react-icons/md";



export default async function PlaceDetail() {

    const place_id = "ChIJzwxgI7C0AjERShi5dyiRcJI"
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
    const datas:any = await res.json()
    const photo_ref = datas.result.photos[0].photo_reference
    const url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo_ref}&maxwidth=600&maxheight=400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  return (
    <div>
        <div>
            <p className="placename text-center m-6  text-5xl">{datas.result.name}</p>
            <Image src={url} alt="logo" width={0} height={0} sizes="120vw" priority={true}
            style={{ width: '100%', height: '100%' }} className='img max-w-sm mx-auto'/>
        </div>

        <Tag/>
        
        <div className="rating-cost flex justify-between mx-auto  max-w-[60rem] ">
            <p className='flex text-3xl mx-8 items-center'>Rating : {datas.result.rating} <MdOutlineStar /> </p>
            <p className='text-3xl mr-8'>Cost : xxxxx</p>
        </div>

        <div className="location-container m-8 text-2xl">
            <p>Location</p>
            <div className="m-2.5 p-4 bg-[#D3BD9A] rounded-[22px]">
                <p className="description text-base">{datas.result.formatted_address}</p>
            </div>
        </div>

        <div className="detail-container m-8 text-2xl">
            <p>Detail</p>
            <div className="m-2.5 p-4 bg-[#D3BD9A] rounded-[22px]">
                <p className="description text-base">{datas.result.editorial_summary.overview}</p>
            </div>
        </div>
        
        <div className="share-section m-10">
            <p className="mb-2">Comment by user</p>
            <div className="share-container m-auto w-[32vw] h-10 flex items-center justify-center bg-[#E3B31F] rounded-3xl">
                <p className="text">share your stories</p>
            </div>

            <div className="sort-display mt-8 border-b border-zinc-700 ">sort by</div>
        </div>

    </div>
  )
}

