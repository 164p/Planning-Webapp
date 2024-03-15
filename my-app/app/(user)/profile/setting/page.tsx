import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export default function Home() {
    return(
        <div className="card">
                    <span className="icon absolute top-8 right-8">
                        <Link href="/profile/setting"><IoSettingsOutline className="text-black text-2xl" /></Link>
                    </span>
                    <div className="card-header mb-10">
                        <p className="text-2xl font-bold mb-10">PROFILE SETTING</p>
                        <div className="card-section flex items-center justify-center">
                            <span className="icon text-9xl bg-white rounded-full">
                                <FaUserCircle className="mx-auto"/>
                            </span>
                        </div>
                    </div>
                    <div className="card-header relative mb-10">
                        <p className="text-2xl font-bold text-center">USERNAME</p>
                    </div>
                    <div className="card-body">
                        <div className="card-section mx-auto max-w-md">
                            <div className="col w-1/2 mx-auto">
                                 <button className="rounded-full w-full bg-[#674F04] text-white font-bold py-2 px-5 text-center">CHANGE</button>     {/*TEMPORARY!!!!*/}
                            </div>
                        </div>                         
                        {/* <div className="card-section mx-auto max-w-md grid grid-cols-2 gap-3">
                            <div className="col">
                                <button className="rounded-full w-full bg-[#674F04] text-white font-bold py-2 px-5 text-center">CHANGE</button>
                            </div>
                            <div className="col">
                                <button className="rounded-full w-full bg-[#F5F0E8] text-[#674F04] font-bold py-2 px-5 text-center">DELETE</button>
                            </div>
                        </div> */}
                        <hr className="h-px border-none bg-[#674F04] my-10" />
                        <div className="card-section">
                            <p className="mb-4 text-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>    
                        </div>
                    </div>
                </div>
    )
}