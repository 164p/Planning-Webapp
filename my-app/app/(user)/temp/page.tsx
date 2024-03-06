import React from 'react'
import Image from 'next/image'
import { IoSearchCircle } from 'react-icons/io5'

export default function page() {
   
 
  return (
    <main className='container text-[#E7E0D4]'>
      <div className='flex justify-center items-center mt-24'>
                <div className='relative max-w-[640px] w-full px-4 mb-10'>
                <input type="search" placeholder="Search your destination" className='w-full h-12 shadow p-4 rounded-full text-black'/>
                <button type='submit' className='absolute top-0 end-0 pr-5 text-5xl font-medium h-full text-white rounded-e-lg'>
                <IoSearchCircle className='text-[#4E3C05]'/>
              </button>
          </div>
      </div>
      

    </main>
  )
}
