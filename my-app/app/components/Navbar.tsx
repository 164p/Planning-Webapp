"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    const { data: session, status } = useSession()

    return (
        <div className='relative'>
            <nav className='fixed bg-[#402E32] w-full py-5 shadow-xl text-slate-200 z-40 shadow-md '>
                <div className='flex justify-between items-center px-7 2xl:px-16'>
                    <div className='flex'>
                        <div className='flex lg:hidden'>
                            <button className="block focus:outline-none" onClick={handleNav}>
                                <GiHamburgerMenu 
                                    className="block h-6 w-6 text-color-[#A28F70]" 
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <Link href='/' className='font-bold text-xl mx-5'>PLANTIEW</Link>
                    </div>
                    <div className='flex items-center hidden lg:block'>
                        <ul className='flex items-center'>
                            <li className='ml-2'>
                                <Link href='/' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-7 py-1.5 rounded-full duration-100'>Home</Link>
                            </li>
                            <li className='ml-2'>
                                <Link href='/plan' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-7 py-1.5 rounded-full duration-100'>Planning</Link>
                            </li>
                            <li className='ml-2'>
                                <Link href='/' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-7 py-1.5 rounded-full duration-100'>Journey</Link>
                            </li>
                            <li className='ml-2'>
                                <Link href='/explore/trip' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-7 py-1.5 rounded-full duration-100'>
                                    Explore
                                </Link>
                            </li>
                            {
                                status == "authenticated" ? (
                                    <li className='ml-2'>
                                        <Link href='/profile'>
                                            <FaUserCircle className='text-4xl' />
                                        </Link>
                                    </li>
                                ):(
                                    <li className='ml-2'>
                                        <Link href='/auth/signin' className='bg-[#674F04] hover:bg-[#7C6417] px-7 py-1.5 rounded-full duration-100'>
                                            Sign In
                                        </Link>
                                    </li>
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
                
            </nav>
            <div className={"sidebar fixed h-screen bg-[#39272B] py-6 px-5 text-slate-200 duration-700 w-64 overflow-auto top-14 "+
                (menuOpen
                    ? 'left-0'
                    : 'left-[-100%]')
                }>
                <div className='sidebar-header flex justify-around items-center w-full mb-5 mt-3'>
                    {
                        status == "authenticated" ? (
                            <Link href='/profile'><FaUserCircle className='text-5xl'/></Link>
                        ):(
                            <Link href='/auth/signin' className='w-full bg-[#674F04] hover:bg-[#7C6417] px-7 py-1.5 rounded-md text-center duration-100'>
                                Sign In
                            </Link>
                        )
                    }
                </div>
                <div className='my-5 border-b-2 border-[#E3B31F]'></div>
                <div className='sidebar-body'>
                    <div className='sidebar-section mb-5'>
                        <div className='sidebar-section-header mb-3'>
                            <p className='font-bold'>Menu</p>
                        </div>
                        <div className='sidebar-section-body'>
                            <ul>
                                <li>
                                    <Link href='/' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/plan' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Planning
                                    </Link>
                                </li>
                                <li> 
                                    <Link href='/' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Journey
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/explore/trip' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Explore
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='my-5 border-b-2 border-[#E3B31F]'></div>
                    <div className='sidebar-section'>
                        {
                            status == "authenticated" && (
                                <button className='w-full block px-5 py-1.5 bg-red-600 hover:bg-red-500 text-whtie rounded-md duration-100' onClick={() => signOut()}>
                                    Sign out
                                </button>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};