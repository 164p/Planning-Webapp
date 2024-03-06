'use client'

import { useState, useEffect } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import TypeSelector from '@/app/components/TypeSelector'
import useSWR from 'swr';
import React from 'react';
import Provincefilter from '@/app/components/Provincefilter'
import {MantineProvider, MultiSelect } from '@mantine/core';
import '@mantine/core/styles.css';

const fetcher = (url : string) => fetch(url).then(r => r.json())

export default function Page() {
    const { data, error, isLoading } = useSWR('/api/explore/trip', fetcher);

    const [selectedType, setSelectedType] = useState('');
    const [query, setQuery] = useState('')
    const [selectedProvince, setSelectedProvince] = useState('')
    const [sortDirection, setSortDirection] = useState('');
    const [sortField, setSortField] = useState('')
    const [tag, setTag] = useState<string[]>([]);

    const handleChange = (e: any) => {
      setQuery(e.target.value);
    };
    
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;   

    function isItemInArray(array1: string[], array2: string[]): boolean {
      // Use the `some` method to check if at least one element satisfies the condition
      return array2.some((item) => array1.includes(item));
    }

    const sort = (data: any[], field: string, dir: string) => {
      switch (field) {
        case 'nameasc':
          return data.slice().sort((a: any, b: any) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return dir === 'asc' ? nameB < nameA? -1 : 1 : nameA < nameB ? -1 : 1;
          });
        case 'namedesc':
          return data.slice().sort((a: any, b: any) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return dir === 'desc' ? nameA < nameB ? -1 : 1 : nameB < nameA ? -1 : 1;
          });
        case 'ratingasc':
          return data.slice().sort((a: any, b: any) => dir === 'asc' ? b.rating - a.rating : a.rating - b.rating
          );
        case 'ratingdesc':
          return data.slice().sort((a: any, b: any) => dir === 'desc' ? a.rating - b.rating : b.rating - a.rating
          );
        case "costasc":
          return data.slice().sort((a: any, b: any) => dir === "asc" ? b.cost - a.cost : a.cost - b.cost
        );
        case "costdesc":
          return data.slice().sort((a: any, b: any) => dir === "desc" ? a.cost - b.cost : b.cost - a.cost
        );
        default:
          return data;
      }
    };
    
    const filterData = 
      query === ''
      ? data.place
      : data.place.filter(
        (place:any) =>
          place.name.toLowerCase().includes(query.toLowerCase()),

        );
      

        const searchRegex = new RegExp(tag.map(term => term.toLowerCase()).join('|'));

    function filterDataTag(data:any, query:any) {
      if (query.length === 0) {
        return data;
      }
    
      const searchRegex = new RegExp(query.map((term: string) => term.toLowerCase()).join('|'));
    
      return data.filter((place:any) => searchRegex.test(place.provincetag.toLowerCase()));
    }

    const filteredData1 = filterDataTag(filterData, tag);
          console.log(filteredData1)
          console.log(filterData)
          console.log(tag)
    return (
      <div className='bg-[#F5F0E8]'>
        <h1 className='text-[#674F04] text-6xl pt-60 p-10 text-center font-medium'>{tag}</h1>
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
          <div className='mb-5 mt-3 text-center'>
            <label className='font-bold text-[#674F04]'>Select Type</label>
          </div>
          <MultiSelect
              label="Your favorite libraries"
              placeholder="Pick value"
              data={['กทม', 'ข', 'ค', 'ง']}
              hidePickedOptions
              searchable
              clearable
              onChange={setTag}/>
          <p className='flex text-[#674F04] text-2xl font-medium justify-center items-center pb-3'>
            Select your interest
          </p>
          <div className='flex m-0 justify-between'>
            <TypeSelector />
          </div>
          <div className='flex justify-center items-center'>
            <div className='flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] '></div>
          </div>
          <select
            className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={sortField}
            onChange={(e) => {
              setSortField(e.target.value);
            }}>
            <option value="default">All</option>
            <option value="nameasc" onClick={() => setSortDirection('asc')}>Name A-Z</option>
            <option value="namedesc" onClick={() => setSortDirection('desc')}>Name Z-A</option>
            <option value="ratingasc" onClick={() => setSortDirection('asc')}>Rating : Low-High</option>
            <option value="ratingdesc" onClick={() => setSortDirection('desc')}>Rating : High-Low</option>
            <option value="costasc" onClick={() => setSortDirection('asc')}>Cost : Low-High</option>
            <option value="costdesc" onClick={() => setSortDirection('desc')}>Cost : High-Low</option>
          </select>
                {data && !isLoading && (
                <div className='card bg-[#F5F0E8] py-10'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 sm:px-20 md:px-20 lg:px-0 lg:grid-cols-3 gap-6 mx-auto max-w-screen-lg '>
                    {sort(filteredData1, sortField, sortDirection).map((datas:any, index:any) => (
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
                </div>
                )}</div>
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
  
