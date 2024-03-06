'use client'
import { useState, Fragment, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Swal from 'sweetalert2';

export default function page(){

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

/* <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div> */

// export default function MyCombobox() {

//   const { data, error, isLoading } = useSWR('/api/autocomplete', fetcher)
//   const [selectedPerson, setSelectedPerson] = useState(people[0])
//   const [query, setQuery] = useState('')

//   if (error) return <div>failed to load</div>
//   if (isLoading) return <div>loading...</div>
  
//   const filteredPeople =
//     query === ''
//       ? data.data.predictions
//       : data.data.predictions.filter((place:any) => {
//           return place.description.toLowerCase().includes(query.toLowerCase())
//         })

//   return (
//     <div className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>
//             <Combobox value={selectedPerson} onChange={setSelectedPerson}>
//       <Combobox.Input
//         onChange={(event) => setQuery(event.target.value)}
//         displayValue={(place:any) => place.description}
//       />
//       <Combobox.Options>
//         {filteredPeople.map((place:any) => (
//           /* Use the `active` state to conditionally style the active option. */
//           /* Use the `selected` state to conditionally style the selected option. */
//           <Combobox.Option  value={place} as={Fragment}>
//             {({ active, selected }) => (
//               <li
//                 className={`${
//                   active ? 'bg-blue-500 text-white' : 'bg-white text-black'
//                 }`}
//               >
//                 {place.description}
//               </li>
//             )}
//           </Combobox.Option>
//         ))}
//       </Combobox.Options>
//     </Combobox>
//     </div>

//   )
// }

// import useSWR from 'swr'

// import React, { useState, useEffect } from 'react';

// const fetcher = (url : string) => fetch(url).then(r => r.json())

// export default function Page() {
//   const { data, error, isLoading } = useSWR('/api/placedetail', fetcher)
//   if (error) return <div>failed to load</div>
//   if (isLoading) return <div>loading...</div>
//   return (
//     <div className={`font-nunito bg-gray-100`}>
//       <div className='w-11/12 m-auto mt-40 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-0'>
//       </div>
//       <div className={`font-nunito bg-gray-100`}>
//         hello {data.data.result.name}
//       </div>
// </div>
// );
