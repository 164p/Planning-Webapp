import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export default function Home() {
    return(
        <main>
        <div className="mt-60 my-40">
            <div className="w-full lg:w-6/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
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
                </div>
            </div>
            </div>
            <p>ddddddddd</p>
        </div>
        </main>
    )
}