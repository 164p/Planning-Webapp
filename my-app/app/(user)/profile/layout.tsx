'use client'
import prisma from '@/app/lib/prisma';
import { createTheme, MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
  });


export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const {data: session} = useSession()
    

    return (
        <MantineProvider theme={theme}>
            <div className="mt-48 mb-40">
                <div className="container grid sm:grid-flow-col grid-cols-4">
                <div className="card bg-white rounded-md md:px-10 py-20 ">
                    <span className="icon text-9xl bg-white rounded-full">
                        <FaUserCircle className="mx-auto"/>
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
                <div className="card bg-[#D3BD9A] rounded-md px-5 md:px-14 lg:px-32 py-20 col-span-3 w-full grid content-center">
                    {children}
                </div>
                </div>
            </div>
        </MantineProvider>

    )
}