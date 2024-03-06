'use client';
import React from 'react'
import Image from 'next/image'
import { IoSearchCircle } from 'react-icons/io5'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'


export default function Page() {

  type resDataType = {
    statusCode: number,
    data?:{
      predictions: any[]
    }
  }
  const [text,setText] = useState('')
  const [datas,setDatas] = useState<any[]>()


  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    const res = await fetch(`/api/place/detail?query=${encodeURIComponent((e.target.value) as string)}`)
    if (res.ok){
      const resData:resDataType = await res.json()
      setDatas(resData.data?.predictions)
    }
  }
  
  
  
  return (
    <main className='container text-[#E7E0D4]'>
      <div className='flex justify-center items-center mt-24'>
        <div className='relative max-w-[640px] w-full px-4 mb-10'>
          <input type="text" placeholder="Search your destination" 
          value={text} onChange={handleChange} 
          className='w-full h-12 shadow p-4 rounded-full text-black'/>
        </div>
      </div>
      {datas && 
        datas.map((data:any,index: number)=>{
          return (
            <div key={index}> 
              <p className='text-black'>{data.description}</p>
            </div>
          )
        }) 
      }
      

    </main>
  )
}
