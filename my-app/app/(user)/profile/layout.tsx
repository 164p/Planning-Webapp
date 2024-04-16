'use client'

import { createTheme, MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from 'swr';
import Image from "next/image"
const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
  });

const fetcher = (url : string) => fetch(url).then(r => r.json())

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const { data, error, isLoading } = useSWR('/api/profile', fetcher);

    const {data: session} = useSession()
    
    const ImageDataInput ={
        images: ''
    }
    const [profileData, setProfleData] = useState(ImageDataInput)

    
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;   

    return (
        <MantineProvider theme={theme}>
            <div className="mt-48 mb-40">
                <div className="container grid sm:grid-flow-col grid-cols-4">
                <div className="card bg-white rounded-md md:px-10 py-20 ">
                    <span className="icon text-9xl bg-white rounded-full">
                    {
                                            profileData.images !== '' ? (
                                                
                                                    <Image src={profileData.images} alt="Preview Images" width={0} height={0} sizes="120vw" priority={true}
                                                    style={{ width: '100%', height: 'auto' }} className=''></Image>
                                                
                                            ):data?.data.profileimage ?(
                                                
                                                    <Image src={data?.data.profileimage} alt="Preview Images" width={0} height={0} sizes="120vw" priority={true}
                                                    style={{ width: '100%', height: 'auto' }} className=''></Image>
                                                
                                            ):(<></>)
                                        }
                    </span>
                    <div className="card-header mt-10">
                        {
                            session &&
                            <p className="text-2xl font-bold text-center">{session.user.username}</p>
                        }
                    </div>
                        <hr className="h-px border-none bg-[#674F04] my-10" />
                        <div className='user-select'>
                            <ul>
                                <li>
                                    <Link href='/profile' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/profile/myplan' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        My plan
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/profile/setting' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Account Setting
                                    </Link>
                                </li>
                                  
                            </ul>
                        </div>
                </div>
                <div className="card bg-[#D3BD9A] rounded-md px-5 md:px-14 xl:px-32 py-20 col-span-3 w-full ">
                    {children}
                </div>
                </div>
            </div>
        </MantineProvider>

    )
}