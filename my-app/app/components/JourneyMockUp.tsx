import React from 'react';
import Image from "next/image"
import { IoIosSearch } from "react-icons/io";
import LocationCard from '@/app/components/LocationCard'

export default function JourneyMockUp () {
    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className="bg-[#D3BD9A] p-4 rounded-lg shadow-md">
                <div className="relative">
                    <p className='font-bold'>Select Province</p>
                    <input
                    type="text"
                    placeholder="Bangkok"
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <button className="absolute right-2 top-10">
                        <IoIosSearch />
                    </button>
                </div>
            </div>

            <div className='grid grid-col-3 md:grid-cols-3 grid-flow-col bg-[#674F04] p-4 rounded-lg shadow-md'>
                <div className="">
                    <Image src="/images.png" alt="logo" width={0} height={0} sizes="10vh" priority={true}
                    style={{ width: '100%', height: 'auto' }} className='rounded-md'/>
                </div>
                <div className='col-span-2 item'>
                    <p className='text-white text-center item-center'>PlanA</p>
                </div>
            </div>

            <div className='grid grid-col-3 md:grid-cols-3 grid-flow-col bg-[#674F04] p-4 rounded-lg shadow-md'>
                <div className="">
                    <Image src="/images.png" alt="logo" width={0} height={0} sizes="10vh" priority={true}
                    style={{ width: '100%', height: 'auto' }} className='rounded-md'/>
                </div>
                <div className='col-span-2 item'>
                    <p className='text-white text-center item-center'>PlanB</p>
                </div>
            </div>

        </div>
    );
};