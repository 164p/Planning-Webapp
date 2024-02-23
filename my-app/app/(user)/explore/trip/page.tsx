import TripCard from '@/app/components/TripCard'
import TypeSelector from '@/app/components/TypeSelector'
import { IoSearchCircle } from 'react-icons/io5'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

export default function Home() {
      
    return (
        <div className='bg-[#F5F0E8]'>
            <h1 className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>Explore travel guides</h1>
            <div className='search'>
                <div className='search-bar flex justify-center items-center'>
                    <div className='relative max-w-[640px] w-full px-4 mb-5'>
                        <input type="search" placeholder="Search your destination" className='w-full h-12 shadow p-4 rounded-full text-black'/>
                        <button type='submit' className='absolute top-0 end-0 pr-5 text-5xl font-medium text-white rounded-e-lg'>
                            <IoSearchCircle className='text-[#4E3C05]'/>
                        </button>
                    </div>
                </div>
                <div className='filter grid grid-cols-1 mx-auto max-w-screen-lg px-20 lg:px-0 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                    <div className='typetag mb-5 mt-3 text-center'>
                        <label className='font-bold text-[#674F04]'>Select Type</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
                            <option value="">-</option>
                            <option value="1">กทม</option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                    <div className='activitytag mb-5 mt-3 text-center'>
                        <label className='font-bold text-[#674F04]'>Select Activity</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
                            <option value="">-</option>
                            <option value="1">กทม</option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                    <div className='provincetag mb-5 mt-3 text-center'>
                    <label className='font-bold text-[#674F04]'>Select Province</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
                            <option value="">-</option>
                            <option value="1">กทม</option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                    <div className='provincetag mb-5 mt-3 text-center'>
                    <label className='font-bold text-[#674F04]'>Select Cost</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
                            <option value="">-</option>
                            <option value="1"></option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                </div>
            </div>
            <p className='flex text-[#674F04] text-2xl font-medium justify-center items-center my-5'>Select your interest</p>
            <div className='section'>
                <TypeSelector/>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] '>
                    
                </div>
            </div>
            <div className='bg-[#F5F0E8] my-5'>
                <div className='grid grid-cols-1 mx-auto max-w-screen-lg px-20 lg:px-0'>

                    <Link href="/explore/tripdetail"><TripCard/></Link>
  
                    </div>
            </div>
        </div>
    )
}