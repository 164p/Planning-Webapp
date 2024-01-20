"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className='fixed bg-[#4E3C05] w-full py-3 shadow-xl shadow-[#4E3C05]-500/40'>
            <div className='flex justify-between items-center h-full w-full px-10 2xl:px-16'>
                <div className='flex'>
                    <button className="block focus:outline-none" onClick={handleNav}>
                    <GiHamburgerMenu 
                        className="block h-6 w-6 text-color-[#A28F70]" 
                        aria-hidden="true"
                    />
                    </button>
                    <Link href='/' className='text-[#D3BD9A] font-bold text-3xl mx-5'>PLANTIEW</Link>
                </div>
                <div className='flex'>
                    <ul className='flex hidden sm:flex'>
                        <li className='hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Home</Link>
                        </li>
                        <li className='hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/component/plan' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Planning</Link>
                        </li>
                        <li className='hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Journey</Link>
                        </li>
                        <li className='hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl mx-10 group-hover:text-[#4E3C05]'>Explore</Link>
                        </li>
                    </ul>
                    <Link href='/' className='text-xl ml-10 p-2'>profilelogo</Link>
                </div>
            </div>
            <div className={
                menuOpen
                    ? 'fixed left-0 top-20 w-[70%] sm:w-[15%] h-screen bg-[#4E3C05] p-6 ease-out duration-700'
                    : 'fixed left-[-100%] top-0 p-10 ease-in duration-700'
                }>
                <div className='flex justify-around items-center w-full gap-sm my-5'>
                <Link href='/'>img</Link>
                <Link href='/auth/signup' className='text-xl'>Sign up</Link>
                </div>
                <div className='my-4 border-b border-[#E3B31F] pb-4'></div>
                <div className='mt-8 mb-5 mx-2'>Menu</div>
                    <ul>
                        <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Home</Link>
                        </li>
                        <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Planning</Link>
                        </li>
                        <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Journey</Link>
                        </li>
                        <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Explore</Link>
                        </li>
                    </ul>

                <div className='mt-8 mb-5 mx-2'>About PLANTIEW</div>
                    <ul>
                        <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>About us</Link>
                        </li>
                        <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Contact us</Link>
                        </li>
                        <li className='my-3 mx-6 justify-start items-center gap-4 hover:bg-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                            <Link href='/' className='nl-10 text-xl group-hover:text-[#4E3C05]'>Help</Link>
                        </li>
                    </ul>
                <div className='my-4 border-b border-[#E3B31F] pb-4'></div>
                <Link href='/'>Log out</Link>
            </div>
        </nav>
    );
};