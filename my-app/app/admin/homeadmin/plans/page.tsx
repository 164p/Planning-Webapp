import DashboardSearch from "@/app/components/DashboardSearch";
import Pagenavi from "@/app/components/Pagenavi";
import Link from "next/link";

export default function Page({placeholder}){
    return(
        <div className="p-10 mt-16 ml-80">
            <div>
                <p className="text-3xl font-bold mb-5">Plan</p>
            </div>
            <hr className="bg-[#E3B31F] py-1 border-1 mb-10 rounded-full" />

            <div className="grid grid-cols-3 gap-10 text-black">
                <div className="bg-[#D3BD9A] p-5 rounded-xl mb-10 text-center font-bold">
                    <p className=" text-xl my-1">All plan</p>
                    <p className="text-3xl my-1">12</p>
                    <span className="text-xs"><span className="text-lime-700">5</span> plan added this week</span>
                </div>
            </div>

            <div className="bg-[#D3BD9A] p-5 rounded-xl  text-black">
                <p className="text-2xl mb-5  font-bold">Plan</p>
                <div className="mb-5">
                    <DashboardSearch placeholder="Search for a plan..."/>
                </div>

                <table className="text-xl w-full mb-20">
                    <thead className="font-bold">
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Created At</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="flex items-center gap-4">
                                <img className="" src="/images/-bndJxl9ejc3SDbanTlIL-xiCpqSs2G3aF36PNd8WbA=/60.1712173254571.XNh5kIHDDx+u-ihfsXXf-1yRFy7VqQDSBn464ftFLis=.webp"
                                alt=""
                                width={40}
                                height={40}/>
                                NamePlan
                            </td>
                            <td>some@email.com</td>
                            <td>Nov 04 2024</td>
                            <td className="font-bold gap-2 ">
                                <Link href="/">
                                    <button className="p-1 rounded-md mr-2 bg-[#35C132] text-white">View</button>
                                </Link>
                                <Link href="/">
                                    <button className="p-1 rounded-md bg-[#C1323B] text-white">Delete</button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagenavi/>

            </div>
        </div>
    )
}