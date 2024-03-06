import React from 'react'
import Image from 'next/image'
import Tag from './Tag'


export default function TripDetail() {
  return (
    <main>
      <div>
      <p className="placename text-center m-6  text-5xl">หาดบางแสน</p>
        <Image src="/bangsan1.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
          style={{ width: '80%', height: '100%' }} className='img max-w-sm mx-auto'/>
      </div>
      <Tag/>
      <div className='user-description max-w-7xl mx-auto flex'>
        <div className="profile mr-3 w-12 h-12 aspect-square rounded-full bg-blue-400 "></div>
        <div className='rec bg-[#D5B179] rounded-[18px]'>
          <div className='trip-info-box '>
            <p className='text-lg ml-5 my-0.5'>By Matt</p>
            <p className='text-lg ml-5 my-0.5'>cost 9999</p>
            <p className='text-lg ml-5 my-0.5'>rating </p>
          </div>
        <p className='m-3 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab cumque laudantium fugit, atque soluta consectetur nemo deleniti optio, omnis, dolore porro voluptas sed doloribus perspiciatis delectus. Qui officiis animi optio.</p>
        </div>
      </div>
      
      <p className='trip-description m-6 mx-10'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque pariatur saepe adipisci minima, ad, ea sed nesciunt reiciendis voluptatem vel labore error quis suscipit quas animi eum eligendi laborum quasi.
      </p>
      <div className='trip-token mx-auto'>
        <p className='trip-tokens m-auto w-[32vw] h-10 flex items-center justify-center bg-[#E3B31F] hover:bg-amber-300 rounded-3xl'>Get Trip Token</p>
        <p className='used-count my-1.5 text-xs text-center text-gray-400'>1200 user used this plan</p>
    </div>
    </main>
  )
}
