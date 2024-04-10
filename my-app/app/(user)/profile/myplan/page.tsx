'use client'
import React from 'react'
import DatePickers from "@/app/components/DatePickers"
import Image from "next/image"
import useSWR from 'swr'
import Link from "next/link";
import { planStatus } from "@prisma/client";

const fetcher = (url: any) => fetch(url).then(res => res.json())

export default function page() {

  type planDatas = {
    id: String,
    name?: String,
    budget?: Number
    images?: String,
    detail?: String,
    startDate: Date,
    endDate: Date,
    ownerId: String,
    status: planStatus
}
const { data, error, isLoading } = useSWR('/api/plan', fetcher)

  return (
    <>
      <div className="section">
                {
                    isLoading ? (
                        <p className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin inline-block mr-2" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z" opacity=".1"/><path fill="currentColor" d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"/></g></svg>
                            Loading...
                        </p>
                    ): data?.data && (
                        data?.data.length > 0 ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {data?.data.map((planData: planDatas, index: number) => {
                                    return (
                                        <Link key={index} href={`/plan/${planData.id}`}>
                                            <div className="card rounded-md bg-[#E4D7C1] flex overflow-hidden items-center relative">
                                                {
                                                    planData.images ? (
                                                        <div className="card-col relative overflow-fidden w-40 h-28 " 
                                                            style={{
                                                                backgroundImage: `url(${planData.images})`,
                                                                backgroundPosition: 'left center',
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat'
                                                            }}>
                                                            <div className="line h-full w-4 absolute bg-gradient-to-l from-[#E4D7C1] bottom-0 right-0 ">
                                                            </div>
                                                        </div>
                                                    ):(
                                                        <div className="card-col relative overflow-fidden w-40 h-28 " 
                                                            style={{
                                                                backgroundImage: `url(/ImageTemplate.png)`,
                                                                backgroundPosition: 'left center',
                                                                backgroundSize: 'cover',
                                                                backgroundRepeat: 'no-repeat'
                                                            }}>
                                                            <div className="line h-full w-5 absolute bg-gradient-to-l from-[#E4D7C1] bottom-0 right-0 ">
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div className="card-col grow p-5">
                                                    <p className="text-xl font-bold">Trip Name</p>
                                                    <p className="">Budget: 10,000 THB</p>
                                                </div>
                                                {
                                                    planData.status === 'draft' && (
                                                        <span className="absolute">

                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        ):(
                            <p className="text-center">ไม่พบข้อมูลแพลนของคุณ</p>
                        )
                    )
                }
            </div>
    </>
  )
}