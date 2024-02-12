import React from 'react'
import Image from 'next/image'
import RedPlanCard from '@/app/components/RedPlanCard'
import BluePlanCard from '@/app/components/BluePlanCard'
import GreyPlanCard from '@/app/components/GreyPlanCard'


export default function page() {
  return (
    <main className='container text-[#E7E0D4]'>

      <RedPlanCard/>

      <BluePlanCard/>

      <GreyPlanCard/>

    </main>
  )
}
