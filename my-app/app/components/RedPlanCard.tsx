import React from 'react'

export default function RedPlanCard() {
  return (
    <div className='red-card flex justify-center m-auto mt-24 h-[12rem] '>
        <div className=' w-5 bg-[#853D35] rounded-l-2xl'></div>
        <div className='flex w-80 bg-[#856535] rounded-r-2xl'>
          <div className='basis-2/3 flex flex-col justify-between p-4 max-w-full'>
            <p className='text-center font-extrabold'>placename</p>
            <p className='text-xs text-left'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, facere impedit! Vel eius asperiores</p>
            <p className='text-xs text-left font-semibold'>Cost : </p>
            <p className='text-xs text-left font-semibold'>Note :</p>
          </div>
          <div className='basis-1/3 p-2 text-center '>
            cccccc
          </div>
        </div>
    </div>
  )
}
