'use client'

import { useState, useEffect } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import TypeSelector from '@/app/components/TypeSelector'
import useSWR from 'swr';
import React from 'react';
import {MantineProvider, MultiSelect ,Autocomplete } from '@mantine/core';
import '@mantine/core/styles.css';
import Link from 'next/link';

const fetcher = (url : string) => fetch(url).then(r => r.json())

export default function Page() {
    const { data, error, isLoading } = useSWR('/api/explore/trip', fetcher);
    const { data:dataBookmark, error:errorBookmark, isLoading:isLoadingBookmark } = useSWR(`/api/explore/bookmark`, fetcher);

    const [query, setQuery] = useState('')
    const [sortDirection, setSortDirection] = useState('');
    const [sortField, setSortField] = useState('')
    const [tag, setTag] = useState<string[]>([]);

    const handleChange = (e: any) => {
      setQuery(e.target.value);
    };
    
    type planDatas = {
      id: string,
      name?: string,
      budget?: number,
      images?: string,
      detail?: string,
      startDate: string,
      endDate: string,
      ownerId: string,
      createdAt: string,
      status: string
  }

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;   

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
          return data.slice().sort((a: any, b: any) => dir === 'asc' ? b.bookmark - a.bookmark : a.bookmark - b.bookmark
          );
        case 'ratingdesc':
          return data.slice().sort((a: any, b: any) => dir === 'desc' ? a.bookmark - b.bookmark : b.bookmark - a.bookmark
          );
        case "costasc":
          return data.slice().sort((a: any, b: any) => dir === "asc" ? b.budget - a.budget : a.budget - b.budget
        );
        case "costdesc":
          return data.slice().sort((a: any, b: any) => dir === "desc" ? a.budget - b.budget : b.budget - a.budget
        );
        default:
          return data;
      }
    };
    
    const filterData = 
      query === ''
      ? data.data
      : data.data.filter(
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

    return (
      <div className='bg-[#F5F0E8]'>
        <h1 className='text-[#674F04] text-5xl pt-36 p-10 text-center font-bold'>Explore travel guides</h1>
        <div className='flex-col justify-center items-center text-center mx-auto max-w-screen-lg'>
          <div className='flex justify-center items-center'>
            <div className='relative max-w-[800px] w-full px-4 mb-5'>
              <input
                type="search"
                placeholder="Explore travel guides"
                className='w-full h-10 shadow p-4 rounded-full text-black bg-[#f9fafb]'
                onChange={handleChange}
              />
              <button type='submit' className='absolute top-0 end-0 pr-5 text-4xl font-medium h-full text-white rounded-e-lg'>
                <IoSearchCircle className='text-[#4E3C05]' />
              </button>
            </div>
            </div>
            <div className='font-bold'>Sort</div>
            <select
              className="px-4 mb-5 mx-auto h-10 max-w-[600px] w-full rounded-full bg-white border border-gray-300 text-gray-700 shadow-sm focus:border-indigo-500"
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value);
              }}>
              <option value="default">All</option>
              <option value="nameasc" onClick={() => setSortDirection('asc')}>Name A-Z</option>
              <option value="namedesc" onClick={() => setSortDirection('desc')}>Name Z-A</option>
              <option value="ratingasc" onClick={() => setSortDirection('asc')}>Bookmark : Low-High</option>
              <option value="ratingdesc" onClick={() => setSortDirection('desc')}>Bookmark : High-Low</option>
              <option value="costasc" onClick={() => setSortDirection('asc')}>Cost : Low-High</option>
              <option value="costdesc" onClick={() => setSortDirection('desc')}>Cost : High-Low</option>
            </select>
        </div>
        <div className='filter grid grid-cols-1 mx-auto max-w-screen-lg lg:px-0 gap-5'>
          <div className='max-w-[600px] mx-auto w-full px-4'>
          <div className='text-center font-bold'>Province Tag</div>
          <MultiSelect 
              className=''
              placeholder="Pick value"
              data={['กทม', 'กระบี่', 'ชลบุรี', 'ปทุมธานี']}
              hidePickedOptions
              searchable
              clearable
              onChange={setTag}/>
          <div className='flex justify-center items-center'>
            <div className='flex w-full p-0.5 mt-10 mb-20 lg:w-2/3 bg-[#674F04] '></div>
          </div>
          </div>
          {
              isLoading ? (
                    <p className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin inline-block mr-2" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z" opacity=".1"/><path fill="currentColor" d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"/></g></svg>
                            Loading...
                        </p>
                ): data?.data && (
                  data?.data.length > 0 ? (
                    <div className='card bg-[#F5F0E8] py-10'>
                      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 sm:px-20 md:px-20 lg:px-0 lg:grid-cols-3 gap-6 mx-auto max-w-screen-lg mx-auto'>
                  {sort(filteredData1, sortField, sortDirection)?.map((planData: planDatas, index:any) => {
                    const bookmarkData = dataBookmark?.data.filter((bookmark: any) => bookmark.planId === planData.id);
                    return (
                      <Link href={`../explore/planDetail/${planData.id}`} key={index}>
                      <div key={index} className="card-top rounded-2xl shadow-md text-[#674F04] bg-[#F5F5F5] pb-5">
                      <div dir="rtl">
                        <div className='z-10 absolute bg-[#F5F0E8] bg-opacity-90 rounded-full px-3 py-1 m-4 font-bold inline-flex'>
                          <div className='pl-2'>{bookmarkData?.length}</div>
                          <svg fill="#674F04" width="24px" height="24px" viewBox="0 0 24 24" id="bookmark" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" className="icon flat-color"><path id="primary" d="M18,2H6A2,2,0,0,0,4,4V21a1,1,0,0,0,.5.86,1,1,0,0,0,1,0L12,18.15l6.5,3.72A1,1,0,0,0,19,22a.9.9,0,0,0,.5-.14A1,1,0,0,0,20,21V4A2,2,0,0,0,18,2Z" className="fill: rgb(0, 0, 0);"></path></svg>
                        </div>
                      </div>
                      <img src={planData.images??""} alt="logo" width={0} height={0} sizes="120vw"
                          style={{ width: '100%', height: '250px' }} className='img block rounded-2xl'/>
                    <div className="card-button mx-7">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-[#674F04] text-lg py-3">{planData.name}</p>
                        </div>
                        <div className='inline-flex mb-5'>
                          <p className='font-bold'>{planData.budget??0}</p>/Trip
                        </div>
                    </div>
                </div>
                </Link>
                       )
                      }
                  )}
                  </div>
                  </div>
                ):(
                  <p className="text-center">ไม่มีข้อมูลผู้ใช้งาน</p>
                ))}
                </div>
                </div>
              )     
            }