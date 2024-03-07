'use client'
import { useState, Fragment, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Swal from 'sweetalert2';
import React from 'react'
import Image from 'next/image'
import { IoSearchCircle } from 'react-icons/io5'

export default function page(){

  type resDataType = {
    statusCode: number,
    data?:{
      predictions: any[]
    }
  }
  const [text,setText] = useState('')
  const [datas,setDatas] = useState<any[]>()


  async function handleChange1(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    const res = await fetch(`/api/autocomplete/detail?query=${encodeURIComponent((e.target.value) as string)}`)
    if (res.ok){
      const resData:resDataType = await res.json()
      setDatas(resData.data?.predictions)
    }
  }
  

  const router = useRouter();

  const FormDataInput = {
      name: "",
      description: "",
      placeLocation: "",
      provinceTag: "",
      activityTag: "",
      typeTag: ""
  }
  const [data, setData] = useState(FormDataInput)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nameRegex = /^[a-zA-Z0-9]+$/;

    if(data.name == '' || data.description == '' || data.placeLocation == ''){
      Swal.fire({
          title: 'เพิ่มข้อมูลไม่สำเร็จ',
          text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          icon: 'error',
          confirmButtonText: 'ปิด'
    
      })
    }
  }

  return (
    <div className="pb-12 pt-36">
        <div className='flex justify-center items-center mt-24'>
        <div className='relative max-w-[640px] w-full px-4 mb-10'>
            <input type="text" placeholder="Search your destination" 
            value={text} onChange={handleChange1} 
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
            <div className="container">
                <div className="max-w-md mx-auto">
                    <h5 className='mb-10 font-bold text-center text-2xl'>Add Location</h5>
                    <form onSubmit={onSubmit}>
                        <div className="input-group relative mb-5">
                            <input type="text" name='name' id='name'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-5 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="name" />
                        </div>
                        <div className="input-group relative mb-5">
                            <input type="text" name='description' id='description'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-5 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="description" />
                        </div>
                        <div className="input-group relative mb-5">
                            <input type="text" name='placeLocation' id='placeLocation'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-5 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="placeLocation" />
                        </div>
                        
                        <div className='input-group'>
                            <button type='submit' className='w-full text-slate-200 bg-[#674F04] hover:bg-[#7C6417] px-7 py-2 rounded-md text-center duration-100'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

// 'use client';
// import React from 'react'
// import Image from 'next/image'
// import { IoSearchCircle } from 'react-icons/io5'
// import Link from 'next/link'
// import { FormEvent, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Swal from 'sweetalert2'


// export default function Page() {

//   type resDataType = {
//     statusCode: number,
//     data?:{
//       predictions: any[]
//     }
//   }
//   const [text,setText] = useState('')
//   const [datas,setDatas] = useState<any[]>()


//   async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setText(e.target.value);
//     const res = await fetch(`/api/place/detail?query=${encodeURIComponent((e.target.value) as string)}`)
//     if (res.ok){
//       const resData:resDataType = await res.json()
//       setDatas(resData.data?.predictions)
//     }
//   }
  
  
  
//   return (
//     <main className='container text-[#E7E0D4]'>

      

//     </main>
//   )
// }
