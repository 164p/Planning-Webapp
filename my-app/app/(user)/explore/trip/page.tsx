'use client'

import { useState, useEffect } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import TypeSelector from '@/app/components/TypeSelector'
import useSWR from 'swr';
import React from 'react';

const fetcher = (url : string) => fetch(url).then(r => r.json())

export default function Page() {
    const { data, error, isLoading } = useSWR('/api/explore/trip', fetcher);

    const tag = [
      {
        provincetag: ["กทม",'เชียงใหม่','ฮ่องกง']
      },
      {
        activitytag: ["ทะเล",'ภูเขา','กิจกรรม'],
      },
      {
        typetag: ["ร้านอาหาร",'ทีพัก','สวนสนุก'],
      }
    ]
  
    const [selectedType, setSelectedType] = useState(''); // State to store the selected type
    const [query, setQuery] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const handleChange = (e: any) => {
      setQuery(e.target.value);
      setSelectedType(e.target.value);
    };
  
    const filterData = (type: any) => {
      if (type === '') {
        return data?.place;
      } else {
        return data.place.filter((place: any) => place.provincetag === type);
      }
    };
  
    const filteredPlaces = filterData(selectedType);

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
  
    return (
      <div className='bg-[#F5F0E8]'>
        <h1 className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>Explore travel guides</h1>
        <div className='flex justify-center items-center'>
          <div className='relative max-w-[640px] w-full px-4 mb-5'>
            <input
              type="search"
              placeholder="Search your destination"
              className='w-full h-12 shadow p-4 rounded-full text-black'
              onChange={handleChange}
            />
            <button type='submit' className='absolute top-0 end-0 pr-5 text-5xl font-medium h-full text-white rounded-e-lg'>
              <IoSearchCircle className='text-[#4E3C05]' />
            </button>
          </div>
        </div>
        <div className='filter grid grid-cols-1 mx-auto max-w-screen-lg px-20 lg:px-0 gap-5'>
          <div className='dropdown mb-5 mt-3 text-center'>
            <label className='font-bold text-[#674F04]'>Select Type</label>
            <input
              type="search"
              placeholder="Search your destination"
              className='w-full h-12 shadow p-4 rounded-full text-black'
              onChange={handleChange}
          />
          
          {dropdownOptions.length > 0 && (
            <ul className='absolute top-full left-0 w-full bg-white shadow rounded-b-lg z-50'>
              {dropdownOptions.map((option, index) => (
                <li key={index} className='p-2 hover:bg-gray-200'>
                  <button type='button' onClick={() => {

                    setSelectedType(option);
                    setQuery(option);
                  }}>
                    {filteredPlaces}
                  </button>
                </li>
              ))}
            </ul>
          )}
          </div>
          <p className='flex text-[#674F04] text-2xl font-medium justify-center items-center pb-3'>
            Select your interest
          </p>
          <div className='flex m-0 justify-between'>
            <TypeSelector />
          </div>
                    <div className='flex justify-center items-center'>
                        <div className='flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] '>
                            
                        </div>
                    </div>
                {data && !isLoading && (
                <div className='card bg-[#F5F0E8] py-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 sm:px-20 md:px-20 lg:px-0 lg:grid-cols-3 gap-6 mx-auto max-w-screen-lg '>
                    {filteredPlaces.map((datas: any , index: any) => (
                            <div key={index} className="card-top rounded-lg shadow-lg text-[#674F04] bg-[#F5F5F5] pb-5">
                                <img src={datas.img} alt="logo" width={0} height={0} sizes="120vw" 
                                    style={{ width: '100%', height: 'auto' }} className='img block rounded-lg '/>
                            <div className="card-button mx-7">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-[#674F04] py-3">{datas.name}</p>
                                </div>
                                <div className="flex">{datas.rating}</div>
                                <p className="pt-4 mb-5">Cost : {datas.cost}</p>
                                <div className="tag-section flex">
                                    <p className="tag px-3 py-2 rounded-full bg-[#C3BAAA] text-black mx-2">{datas.provincetag}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>)}
                </div>
                </div>
            )
    }
  

{/* <div className='filter grid grid-cols-1 mx-auto max-w-screen-lg px-20 lg:px-0 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
                    <div className='typetag mb-5 mt-3 text-center'>
                        <label className='font-bold text-[#674F04]'>Select Type</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full' name="typetag">
                            <option value="">-</option>
                            <option value="1">กทม</option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                    <div className='activitytag mb-5 mt-3 text-center'>
                        <label className='font-bold text-[#674F04]'>Select Activity</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
                            <option value="">-</option>
                            <option value="1">กทม</option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                    <div className='provincetag mb-5 mt-3 text-center'>
                    <label className='font-bold text-[#674F04]'>Select Province</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
                            <option value="">-</option>
                            <option value="1">กทม</option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                    <div className='provincetag mb-5 mt-3 text-center'>
                    <label className='font-bold text-[#674F04]'>Select Cost</label>
                        <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
                            <option value="">-</option>
                            <option value="1"></option>
                            <option value="2">ชลบุรี</option>
                        </select>
                    </div>
                </div> */}




function setFilteredTypes(filtered: any) {
  throw new Error('Function not implemented.');
}
// export default function Page() {
//     const { data, error, isLoading } = useSWR('/api/explore/trip', fetcher)

//     if (error) return <div>failed to load</div>
//     if (isLoading) return <div>loading...</div>
//     return (
//         <div className='bg-[#F5F0E8]'>
//             <h1 className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>Explore travel guides</h1>
//             <div className='flex justify-center items-center'>
//             <div className='relative max-w-[640px] w-full px-4 mb-5'>
//                 <input type="search" placeholder="Search your destination" className='w-full h-12 shadow p-4 rounded-full text-black'/>
//                     <button type='submit' className='absolute top-0 end-0 pr-5 text-5xl font-medium h-full text-white rounded-e-lg'>
//                         <IoSearchCircle className='text-[#4E3C05]'/>
//                     </button>
//                 </div>
//             </div>   
//             <div className='filter grid grid-cols-1 mx-auto max-w-screen-lg px-20 lg:px-0 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
//                     <div className='typetag mb-5 mt-3 text-center'>
//                         <label className='font-bold text-[#674F04]'>Select Type</label>
//                         <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
//                             <option value="1">กทม</option>
//                             <option value="2">ชลบุรี</option>
//                         </select>
//                     </div>
//                     <div className='activitytag mb-5 mt-3 text-center'>
//                         <label className='font-bold text-[#674F04]'>Select Activity</label>
//                         <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
//                             <option value="">-</option>
//                             <option value="1">กทม</option>
//                             <option value="2">ชลบุรี</option>
//                         </select>
//                     </div>
//                     <div className='provincetag mb-5 mt-3 text-center'>
//                     <label className='font-bold text-[#674F04]'>Select Province</label>
//                         <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
//                             <option value="">-</option>
//                             <option value="1">กทม</option>
//                             <option value="2">ชลบุรี</option>
//                         </select>
//                     </div>
//                     <div className='provincetag mb-5 mt-3 text-center'>
//                     <label className='font-bold text-[#674F04]'>Select Cost</label>
//                         <select className='form-select appearance-none w-4/5 px-5 py-2.5 rounded-full'>
//                             <option value="">-</option>
//                             <option value="1"></option>
//                             <option value="2">ชลบุรี</option>
//                         </select>
//                     </div>
//                 </div> 
//                 <p className='flex text-[#674F04] text-2xl font-medium justify-center items-center pb-3'>Select your interest</p>
//                     <div className='flex m-0 justify-between'>
//                         <TypeSelector/>
//                     </div>
//                     <div className='flex justify-center items-center'>
//                         <div className='flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] '>
                            
//                         </div>
//                     </div>
//                 <div className='card bg-[#F5F0E8] py-10'>
//                     <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 sm:px-20 md:px-20 lg:px-0 lg:grid-cols-3 gap-6 mx-auto max-w-screen-lg '>
//                     {data.place.map((datas: any , index: any) => (
//                             <div key={index} className="card-top rounded-lg shadow-lg text-[#674F04] bg-[#F5F5F5] pb-5">
//                                 <img src={datas.img} alt="logo" width={0} height={0} sizes="120vw" 
//                                     style={{ width: '100%', height: 'auto' }} className='img block rounded-lg '/>
//                             <div className="card-button mx-7">
//                                 <div className="flex items-center justify-between">
//                                     <p className="font-bold text-[#674F04] py-3">{datas.name}</p>
//                                 </div>
//                                 <div className="flex">{datas.rating}</div>
//                                 <p className="pt-4 mb-5">Cost : {datas.cost}</p>
//                                 <div className="tag-section flex">
//                                     <p className="tag px-3 py-2 rounded-full bg-[#C3BAAA] text-black mx-2">{datas.provincetag}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     </div>
//                 </div>
//                 </div>
//             )
//         }
  
