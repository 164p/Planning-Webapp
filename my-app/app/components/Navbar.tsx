"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false)
    const [dropDownShow, setDropDown] = useState(false)

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }



    const { data: session, status } = useSession()

    return (
        <div className='relative'>
            <nav className='fixed bg-[#402E32] w-full py-5 shadow-xl text-slate-100 z-40 shadow-md'>
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
                                <Link href='/' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-5 py-1 rounded-full duration-100'>
                                    Home
                                </Link>
                            </li>
                            <li className='ml-2'>
                                <Link href='/plan' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-5 py-1 rounded-full duration-100'>
                                    Planning
                                </Link>
                            </li>
                            <li className='ml-2'>
                                <Link href='/' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-5 py-1 rounded-full duration-100'>
                                    Journey
                                </Link>
                            </li>
                            <li className='ml-2'>
                                <Link href='/explore/trip' className='hover:text-[#4E3C05] hover:bg-[#F5F0E8] px-5 py-1 rounded-full duration-100'>
                                    Explore
                                </Link>
                            </li>
                            {
                                status == "authenticated" ? (
                                    <>
                                        <li className='ml-2 flex items-center'>
                                            <Link href='/profile'>
                                                <FaUserCircle className='text-2xl' />
                                            </Link>
                                            
                                        </li>
                                        <li className='dropdown ml-2 flex items-center relative'>
                                            <button onClick={() => setDropDown((prevDisplay) => !prevDisplay)} type='button' className='dropdown-btn'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.975q-.2 0-.388-.075t-.312-.2l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"></path></svg>
                                            </button>
                                            <div className={
                                                (dropDownShow ? "md:block md:right-0 md:-bottom-14 absolute" : "md:hidden")+
                                                ' dropdown-body absolute px-3 py-1.5 bg-white rounded-md shadow text-slate-600'
                                                }>
                                                asda
                                            </div>
                                        </li>
                                    </>
                                ):(
                                    <li className='ml-2'>
                                        <Link href='/auth/signin' className='bg-white text-slate-600 font-bold px-7 py-1.5 rounded-full duration-100'>
                                            Sign In
                                        </Link>
                                    </li>
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={"sidebar fixed h-screen bg-[#39272B] py-6 px-5 text-slate-100 duration-500 w-60 overflow-auto top-14 shadow-md "+
                (menuOpen
                    ? 'left-0'
                    : 'left-[-100%]')
                }>
                <div className='sidebar-header mt-3 block'>
                    {
                        status == "authenticated" ? (
                            
                                <Link href='/profile'>
                                    <button className='block bg-[#D3BD9A] text-[#674F04] py-3 px-5 rounded-md flex items-center text-start w-full mb-5'>
                                        <FaUserCircle className='text-4xl'/>
                                        <div className='section ml-2.5'>
                                            <p className='font-bold'>{session.user.username}</p>
                                            <p className='text-sm'>{session.user.email}</p>
                                        </div>
                                    </button>
                                </Link>
                            
                        ):(
                            <Link href='/auth/signin' className='block w-full bg-[#674F04] hover:bg-[#7C6417] px-7 py-1.5 rounded-md text-center duration-100'>
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
                                    <Link href='/' className='block flex items-center mb-3 hover:bg-[#F5F0E8] py-2 px-5 rounded-md hover:text-[#4E3C05]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10v9Zm0 2q-.825 0-1.413-.588T4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.275-.2.575-.3T12 3.5q.325 0 .625.1t.575.3l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-5v-6h-2v6H6Zm6-8.75Z"></path></svg>
                                        <p className='ml-1'>Home</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/plan' className='block flex items-center mb-3 hover:bg-[#F5F0E8] py-2 px-5 rounded-md hover:text-[#4E3C05]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 5.1q.275-.05.5-.075T12 5q.275 0 .5.025t.5.075V5q0-.425-.288-.712T12 4q-.425 0-.712.288T11 5zM7 22q-.825 0-1.412-.587T5 20v-8q0-2.125 1.113-3.8T9 5.7V5q0-1.25.863-2.125T12 2q1.275 0 2.138.875T15 5v.7q1.575.725 2.625 2.138t1.325 3.212q-.45-.05-1-.05t-1 .075q-.35-1.725-1.725-2.9T12 7Q9.925 7 8.463 8.462T7 12v8h4.3q.15.5.413 1.038t.537.962zm2-8h3.25q.35-.525.938-1.075T14.4 12H9q-.425 0-.712.288T8 13q0 .425.288.713T9 14m9-1q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13m0 8q.275 0 .463-.187t.187-.463q0-.275-.187-.462T18 19.7q-.275 0-.462.188t-.188.462q0 .275.188.463T18 21m0-1.8q.2 0 .325-.125t.125-.325q0-.2.15-.4t.35-.4q.35-.3.55-.575t.2-.775q0-.725-.475-1.162T18 15q-.475 0-.875.238t-.65.637q-.1.15-.025.313t.25.237q.15.075.313 0t.262-.2q.125-.175.313-.275t.412-.1q.375 0 .588.188t.212.562q0 .275-.15.463t-.35.387q-.15.15-.312.3t-.288.35q-.075.15-.112.3t-.038.35q0 .2.125.325T18 19.2"></path></svg>
                                        <p className='ml-1'>Planning</p>
                                    </Link>
                                </li>
                                <li> 
                                    <Link href='/' className='block flex items-center mb-3 hover:bg-[#F5F0E8] py-2 px-5 rounded-md hover:text-[#4E3C05]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M14.35 20.775L9 18.9l-4.65 1.8q-.5.2-.925-.112T3 19.75v-14q0-.325.188-.575T3.7 4.8l4.65-1.575q.325-.1.65-.113t.65.113L15 5.1l4.65-1.8q.5-.2.925.113T21 4.25v14q0 .325-.187.575t-.513.375l-4.65 1.575q-.325.1-.65.113t-.65-.113ZM14 18.55V6.85l-4-1.4v11.7l4 1.4Zm2 0l3-1V5.7l-3 1.15v11.7ZM5 18.3l3-1.15V5.45l-3 1V18.3ZM16 6.85v11.7v-11.7Zm-8-1.4v11.7v-11.7Z"></path></svg>
                                        <p className='ml-1'>Journey</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/explore/trip' className='block flex items-center mb-3 hover:bg-[#F5F0E8] py-2 px-5 rounded-md hover:text-[#4E3C05]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 22q-.825 0-1.413-.588T2 20V8q0-.825.588-1.413T4 6h3.175L8.4 4.65q.275-.325.663-.488T9.874 4h.375q-.125.5-.188 1.088T10 6.225q0 .425.063.925t.187.85H4v12h16v-4.025q.45-.425.988-.95T22 14v6q0 .825-.588 1.413T20 22H4Zm8-3.5q1.3 0 2.388-.675T16.024 16q-.375-.35-.8-.763t-.775-.762q-.15.875-.85 1.45T12 16.5q-1.05 0-1.775-.725T9.5 14q0-1 .675-1.725t1.775-.775q-.25-.35-.562-.888t-.513-.962Q9.4 9.975 8.45 11.2T7.5 14q0 1.875 1.312 3.188T12 18.5Zm6.6-4.025q2.725-2.4 4.063-4.463T24 6.15q0-2.825-1.813-4.487T18 0q-2.375 0-4.188 1.663T12 6.15q0 1.8 1.338 3.863t4.062 4.462q.25.225.6.225t.6-.225Zm-.6-2.15q-2.6-2.45-3.3-3.95T14 6.15q0-2.025 1.263-3.088T18 2q1.475 0 2.738 1.063T22 6.15q0 .725-.7 2.225t-3.3 3.95Zm-.85-4.075L18 7.6l.85.65q.325.25.537.088t.088-.538l-.325-1.075l.875-.7q.325-.275.238-.525t-.513-.25h-1.025l-.35-1.05q-.075-.2-.163-.313T18 3.776q-.075 0-.375.425l-.35 1.05H16.25q-.425 0-.525.25t.25.525l.875.7l-.325 1.075q-.125.375.088.538t.537-.088ZM12 14Zm6-7.275Z"></path></svg>
                                        <p className='ml-1'>Explore</p>
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