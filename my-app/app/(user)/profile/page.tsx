import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"
import { IoSettingsOutline } from "react-icons/io5"
import Accountset from "@/app/components/profile/accountset";

export default function Home() {
    return(

        <main className="content-center">
                <div className="card">
                    <div className="card-header mb-10">
                        <p className="text-2xl font-bold mb-10">PROFILE SETTING</p>
                        <hr className="h-px border-none bg-[#674F04] my-10" />
                        <div className="inline-flex grid grid-col-8">
                            <div className="card-section flex flex-col col-start-1 col-end-2">
                                <div className="">
                                    <span className="icon text-9xl bg-white rounded-full">
                                        <FaUserCircle className="mx-auto text-[#4E3C05]"/>
                                    </span>
                                </div>
                                <label className="text-center text-black">Edit Picture</label>
                            </div>
                            <div className="my-8 w-full h-36 bg-white rounded-xl"></div>

        <div className="mt-48 mb-40">
                <div className="container grid sm:grid-flow-col grid-col-8">
                <div className="card bg-white rounded-md md:px-10 py-20">
                    <span className="icon text-9xl bg-white rounded-full">
                        <FaUserCircle className="mx-auto"/>
                    </span>
                    <div className="card-header relative mt-10">
                        <p className="text-2xl font-bold text-center">USERNAME</p>
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
                                    <Link href='/profile/setting' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Account Setting
                                    </Link> 
                                </li>
                                <li> 
                                    <Link href='/plan' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        My Plan
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/profile' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        ???
                                    </Link>
                                </li>
                            </ul>
                        </div>
                </div>
        </main>
                <div className="card bg-[#D3BD9A] rounded-md px-10 md:px-20 py-20 col-span-6">
    
                </div>
                </div>
            </div>

    );

}

{/* <div className="card-body">                         
                        <hr className="h-px border-none bg-[#674F04] my-10" />
                        <div className="card-section">
                            <p className="mb-4 text-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>    
                        </div>
                    </div> */}