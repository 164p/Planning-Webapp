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
        <nav className='fixed bg-[#4E3C05] w-full h-20 shadow-xl shadow-[#4E3C05]-500/40 text-[#D3BD9A]'>
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
                <div className='flex lg:flex lg:items-center lg:w-auto sm:hidden'>
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
                    </li>
                    </ul>
                        <Link href='/profile'><FaUserCircle className='text-4xl ml-10' /></Link>
                </div>
            </div>
            <div className={
                menuOpen
                    ? 'fixed left-0 top-20 lg:w-[20%] sm:w-[40%] md:w-[30%] h-screen bg-[#4E3C05] p-6 slide-in duration-700'
                    : 'fixed left-[-100%] top-20 p-6 slide-out duration-700'
                }>
                <div className='flex justify-around items-center w-full my-5'>
                <Link href='/profile'><FaUserCircle className='text-6xl ml-3'/></Link>
                    <Link href='/auth/signup' className='text-xl'>Sign up</Link>
                </div>
                <div className='my-4 border-b-2 border-[#E3B31F] pb-4'></div>
                <div className='mt-8 mb-5 mx-2'>Menu</div>
                <ul>
                    <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-[#F5F0E8] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                        <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Home</Link>
                    </li>
                    <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-[#F5F0E8] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                        <Link href='/plan' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Planning</Link>
                    </li>
                    <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-[#F5F0E8] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'> 
                        <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Journey</Link>
                    </li>
                    <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-[#F5F0E8] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                        <Link href='/explore/trip' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Explore</Link>
                    </li>
                </ul>

                <div className='mt-8 mb-5 mx-2'>About PLANTIEW</div>
                <ul>
                    <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-[#F5F0E8] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                        <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>About us</Link>
                    </li>
                    <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-[#F5F0E8] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                        <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Contact us</Link>
                    </li>
                    <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-[#F5F0E8] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                        <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Help</Link>
                    </li>
                </ul>
                <div className='my-4 border-b-2 border-[#E3B31F] pb-4 flex justify-center'></div>
                <Link href='/'>Log out</Link>
            </div>
        </nav>
    );
};