"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className='navbar fixed bg-[#4E3C05] w-full h-20 shadow-xl shadow-[#4E3C05]-500/40 text-[#D3BD9A]'>
            <div className='flex justify-between items-center h-full w-full px-10 2xl:px-16'>
                <div className='flex'>
                    <div className='flex sm:w-auto sm:flex lg:hidden'>
                        <button className="block focus:outline-none" onClick={handleNav}>
                        <GiHamburgerMenu 
                            className="block h-6 w-6 text-color-[#A28F70]" 
                            aria-hidden="true"
                        />
                        </button>
                    </div>
                    <Link href='/' className='text-[#D3BD9A] font-bold text-3xl mx-5'>PLANTIEW</Link>
                </div>
                <div className='flex lg:flex lg:items-center lg:w-auto hidden lg:block'>
                    <ul className='flex'>
                        <li className='flex hover:bg-[#F5F0E8] p-2 rounded-full group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Home</Link>
                        </li>
                        <li className='flex hover:bg-[#F5F0E8] p-2 rounded-full group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/plan' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Planning</Link>
                        </li>
                        <li className='flex hover:bg-[#F5F0E8] p-2 rounded-full group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Journey</Link>
                        </li>
                        <li className='flex hover:bg-[#F5F0E8] p-2 rounded-full group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/explore/trip' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Explore</Link>
                        </li>
                    </ul>
                    <Link href='/profile'><FaUserCircle className='text-4xl ml-10' /></Link>
                </div>
            </div>
            <div className={'sidebar fixed duration-700 overflow-auto py-6 px-8 h-screen bg-[#4E3C05] '+
                (
                    menuOpen ? 
                    'left-0 top-20 w-full max-w-72'
                    : '-left-full top-20'
                )}>
                
                <div className='sidebar-header flex justify-center items-center w-full'>
                    <Link href='/profile'>
                        <FaUserCircle className='text-3xl'/>
                    </Link>
                    <Link href='/auth/signup' className='ml-3'>
                        Sign up
                    </Link>
                </div>
                <hr className='my-5 h-px bg-[#E3B31F] border-none'/>
                <div className='sidebar-body'>
                    <ul>
                        <li className="sidebar_section mb-6">
                            <p className='mb-3 font-bold'>Menu</p>
                            <Link href='/' className='block w-full hover:bg-[#F5F0E8] px-5 py-2 rounded-md hover:text-[#4E3C05]'>
                                Home
                            </Link>
                            <Link href='/plan' className='block w-full hover:bg-[#F5F0E8] px-5 py-2 rounded-md hover:text-[#4E3C05]'>
                                Planning
                            </Link>
                            <Link href='/' className='block w-full hover:bg-[#F5F0E8] px-5 py-2 rounded-md hover:text-[#4E3C05]'>
                                Journey
                            </Link>
                            <Link href='/explore/trip' className='block w-full hover:bg-[#F5F0E8] px-5 py-2 rounded-md hover:text-[#4E3C05]'>
                                Explore
                            </Link>
                        </li>
                        <li className="sidebar_section mb-6">
                            <p className='mb-3 font-bold'>About PLANTIEW</p>
                            <Link href='/' className='block w-full hover:bg-[#F5F0E8] px-5 py-2 rounded-md hover:text-[#4E3C05]'>
                                About us
                            </Link>
                            <Link href='/' className='block w-full hover:bg-[#F5F0E8] px-5 py-2 rounded-md hover:text-[#4E3C05]'>
                                Contact us
                            </Link>
                            <Link href='/' className='block w-full hover:bg-[#F5F0E8] px-5 py-2 rounded-md hover:text-[#4E3C05]'>
                                Help
                            </Link>
                        </li>
                        <li className="sidebar_section mb-6">
                            <Link href='/' className='block w-full px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'>
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    );
};