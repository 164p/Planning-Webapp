import React from 'react'

export default function BluePlanCard() {
  return (
    <div className='blue-card flex justify-center m-auto mt-12 h-[9rem] '>
        <div className=' w-5 bg-[#344F76] rounded-l-2xl'></div>
        <div className='flex w-72 bg-[#856535] rounded-r-2xl'>
          <div className=' flex flex-col justify-between p-4 max-w-full'>
            <p className='text-sm text-left font-semibold'>placename</p>
            <p className='text-xs text-left'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, facere impedit! Vel eius asperiores</p>
            <p className='text-xs text-left font-semibold'>Note :</p>
          </div>
        </div>
      </div>
  )
}
