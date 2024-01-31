"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function TypeSelector() {
    const [activeLink, setActiveLink] = useState('/pages/trip');
    const currentRoute = usePathname();

    useEffect(() => {
        setActiveLink(currentRoute); 
    }, [currentRoute]);

    const activeStyle = 'text-[#674F04] font-medium bg-[#D3BD9A] h-12 py-4 px-10 rounded-full shadow w-18'; 
    const nonActiveStyle = 'text-[#674F04] font-medium';

    return(
        <div className='w-full max-w-sm mx-auto'>
            <div className="grid grid-cols-2 bg-white rounded-full">
                <div className="col">
                    <Link href={"/explore/trip"}>
                        <button className={"w-full px-5 py-2 rounded-full text-[#674F04] "+(currentRoute === '/explore/trip' ? "bg-[#D3BD9A]" : "")}>
                            Trip
                        </button>
                    </Link>
                </div>
                <div className="col">
                    <Link href={"/explore/location"}>
                        <button className={"w-full px-5 py-2 rounded-full text-[#674F04] "+(currentRoute === '/explore/location' ? "bg-[#D3BD9A]" : "")}>
                            Location
                        </button>
                    </Link>
                </div>
            </div>
            {/* <div className="shadow rounded-full h-12 mt-4 flex p-1 items-center grid grid-cols-2 gap-4 bg-white">
                <div className='w-full flex justify-center'>
                    <button>
                    <Link href='/pages/trip' className={currentRoute === '/pages/trip' ? activeStyle : nonActiveStyle}>Trip</Link>
                    </button>
                </div>

                <div className='w-full flex justify-center'>
                    <button>
                    <Link href="/pages/location" className={currentRoute === '/pages/location' ? activeStyle : nonActiveStyle}>Location</Link>
                    </button>
                </div>
            </div> */}
        </div>
    );
}