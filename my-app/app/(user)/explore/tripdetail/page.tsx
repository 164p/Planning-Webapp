import React from 'react'
import Image from 'next/image'



import TripDetail from '@/app/components/TripDetail'

import TripTime from '@/app/components/TripTime'

export default function Tripdetail() {
  return (
    <main className="container pb-12 pt-16">
        

      <TripDetail/>

      
      <div className='w-full border-t border-black'></div>

      <TripTime/>
    </main>
  )
}
