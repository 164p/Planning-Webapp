'use client';
import React from 'react'
import Image from 'next/image'
import { IoSearchCircle } from 'react-icons/io5'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import {MantineProvider, MultiSelect ,Autocomplete } from '@mantine/core';
import '@mantine/core/styles.css';


export default function Page() {

  type resDataType = {
    statusCode: number,
    data?:{
      predictions: any[]
    }
  }
  const [text,setText] = useState('')
  const [datas,setDatas] = useState<any[]>()
  const [location,setLocation] = useState<any[]>()

  const locationAdd = (e:any) => {
    setLocation(e)
  }

  async function handleChange(e: any) {
    setText(e);
    const res = await fetch(`/api/autocomplete/detail?query=${encodeURIComponent((e) as string)}`)
    if (res.ok){
      const resData:resDataType = await res.json()
      setDatas(resData.data?.predictions)
    }
  }
  const newArray = datas?.map(subArray => subArray.description);
  console.log(location)
  return (
    <main className='container text-[#E7E0D4]'>
      <div className='flex justify-center items-center mt-24'>
        <div className='relative max-w-[640px] w-full px-4 mb-10'>
        <Autocomplete data={newArray} value={text} onChange={handleChange} onOptionSubmit={locationAdd}/>
        </div>
      </div>
      <div className='flex justify-center items-center mt-24'>
      <div className="box-content h-32 w-64 p-4 border-4 text-black">{location}</div>
      </div>

    </main>
  )
}
