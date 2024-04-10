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
                        </div>
                    </div>
                </div>
        </main>
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