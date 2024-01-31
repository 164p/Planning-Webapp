import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export default function Home() {
    return(
        <main className="mt-60 my-40">
            <div className="container">
                <div className="card relative mx-auto max-w-2xl bg-white rounded-md px-10 md:px-20 py-28">
                    <span className="icon absolute top-8 right-8">
                        <Link href="/profile/setting"><IoSettingsOutline className="text-black text-2xl" /></Link>
                    </span>
                    <div className="card-header relative mb-10">
                        <p className="text-2xl font-bold text-center mb-10">PROFILE SETTING</p>
                        <div className="card-section flex items-center justify-center">
                            <span className="icon text-9xl bg-white rounded-full">
                                <FaUserCircle className="mx-auto"/>
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-section mx-auto max-w-md grid grid-cols-2 gap-3">
                            <div className="col">
                                <button className="rounded-full w-full bg-[#674F04] text-white font-bold py-2 px-5 text-center">CHANGE</button>
                            </div>
                            <div className="col">
                                <button className="rounded-full w-full bg-[#F5F0E8] text-[#674F04] font-bold py-2 px-5 text-center">DELETE</button>
                            </div>
                        </div>
                        <hr className="h-px border-none bg-[#674F04] my-10" />
                        <div className="card-section">
                            <p className="mb-4 text-center">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>    
                        </div>
                    </div>
                </div>
                {/* <div className="card relative mx-auto max-w-2xl bg-white rounded-md px-20 py-28">
                    <div className="flex justify-center lg:pt-2 pt-2 w-full text-center mt-10">
                        <p className="text-3xl font-bold">PROFILE SETTING</p>
                    </div>
                    <div className="absolute top-8 right-8">
                        <Link href="/profileset"><IoSettingsOutline className="text-black text-2xl" /></Link>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                            <div className="relative">
                                <FaUserCircle className="text-9xl shadow-xl rounded-full mt-20 max-w-150-px"/>
                            </div>
                        </div>
                        <div className="flex pt-10">
                            <div className="px-5">
                                <button className="rounded-full bg-[#674F04] text-white font-bold py-2 px-10">CHANGE</button>
                            </div>
                            <div className="px-5">
                                <button className="rounded-full bg-[#F5F0E8] text-[#674F04] font-bold py-2 px-10">DELETE</button>
                            </div>
                        </div>
                        <div className="flex justify-center py-4 lg:pt-4 pt-8 w-full px-4 text-center mt-20">
                            <p className="text-3xl font-bold">USERNAME</p>
                        </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </main>
    )
}