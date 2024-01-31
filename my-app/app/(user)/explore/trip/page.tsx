import TripCard from '@/app/components/TripCard'
import TypeSelector from '@/app/components/TypeSelector'
import { IoSearchCircle } from 'react-icons/io5'
import Link from 'next/link'


export default function Home() {
    return (
        <div className='bg-[#F5F0E8]'>
            <h1 className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>Explore travel guides</h1>
            <div className='flex justify-center items-center'>
                <div className='relative max-w-[640px] w-full px-4 mb-10'>
                    <input type="search" placeholder="Search your destination" className='w-full h-12 shadow p-4 rounded-full text-black'/>
                    <button type='submit' className='absolute top-0 end-0 pr-5 text-5xl font-medium h-full text-white rounded-e-lg'>
                    <IoSearchCircle className='text-[#4E3C05]'/>
                    </button>
                </div>
            </div>
            <div className='flex pl-5 justify-center items-center mb-20'>
                <p className="text-lg me-2 px-3 py-2 rounded-full bg-[#C3BAAA] text-black">tagggggggggggggggggggg</p>
                <p className="text-lg me-2 px-3 py-2 rounded-full bg-[#C3BAAA] text-black">tag</p>
                <p className="text-lg me-2 px-3 py-2 rounded-full bg-[#C3BAAA] text-black">tag</p>
            </div>
            <p className='flex text-[#674F04] text-2xl font-medium justify-center items-center pb-3'>Select your interest</p>
            <div className='section'>
                <TypeSelector/>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] '>
                    
                </div>
            </div>
            <div className='bg-[#F5F0E8] py-10'>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 sm:px-20 md:px-20 lg:px-0 lg:grid-cols-3 gap-6 mx-auto max-w-screen-lg '>
                    <Link href="/explore/tripdetail"><TripCard /></Link>
                    <TripCard />
                    <TripCard />
                    <TripCard />
                </div>
            </div>
        </div>
    )
}