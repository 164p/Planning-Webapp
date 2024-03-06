import React from 'react'

export default function GreyPlanCard() {
  return (
    <div className='grey-card flex justify-center m-auto mt-12 h-[5rem] '>
        <div className=' w-5 bg-[#B3ABBA] rounded-l-2xl'></div>
        <div className='flex w-60 bg-[#856535] rounded-r-2xl'>
          <div className='flex flex-col justify-between p-4 max-w-full'>
            <p className='text-sm text-left'>placename</p>
            <p className='text-xs text-left'>Note :</p>
          </div>
        </div>
      </div>
  )
}
