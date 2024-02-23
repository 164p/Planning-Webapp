import React from 'react'
import Image from "next/image"

export default function PlaceDetail() {
  return (
    <div>
        <div>
            <p className="placename text-center m-6  text-5xl">หาดบางแสน</p>
            <Image src="/mockupimg.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
            style={{ width: '100%', height: '100%' }} className='img max-w-sm mx-auto'/>
        </div>
        <div className="rating-cost flex justify-between mx-auto  max-w-[60rem] ">
            <p className='text-3xl mx-8'>Rating :</p>
            <p className='text-3xl mr-8'>Cost:xxxxxx</p>
        </div>

        <div className="location-container m-8 text-2xl">
            <p>Location</p>
            <div className="m-2.5 p-4 bg-[#D3BD9A] rounded-[22px]">
                <p className="description text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos reiciendis eligendi pariatur quo, laborum quis incidunt facere officia voluptas dolorum ea blanditiis, eveniet est quas placeat nam exercitationem, dolore molestias.</p>
            </div>
        </div>

        <div className="detail-container m-8 text-2xl">
            <p>Detail</p>
            <div className="m-2.5 p-4 bg-[#D3BD9A] rounded-[22px]">
                <p className="description text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos reiciendis eligendi pariatur quo, laborum quis incidunt facere officia voluptas dolorum ea blanditiis, eveniet est quas placeat nam exercitationem, dolore molestias.</p>
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

