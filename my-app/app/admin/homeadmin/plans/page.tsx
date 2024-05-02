'use client';
import DashboardSearch from "@/app/components/DashboardSearch";
import Pagenavi from "@/app/components/Pagenavi";
import { planStatus } from "@prisma/client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";
import { MdSearch } from "react-icons/md";

const fetcher = (url : string) => fetch(url).then(r => r.json())

export default function Page(){

    type planDatas = {
        id: string,
        name?: string,
        budget?: number,
        images?: string,
        detail?: string,
        startDate: string,
        endDate: string,
        ownerId: string,
        createdAt: string,
        status: planStatus
    }

    const FormDataInput = {
        name: "",
        ownerId: "",
        createdAt: "",
        images: "",
    };
    
    const { data, error, isLoading } = useSWR('/api/explore/trip', fetcher);
    const { data:dataUser, error:errorUser, isLoading:isLoadingUser } = useSWR(`/api/admin/user`, fetcher);
    const [visitedProvince, setVisitedProvince] = useState(FormDataInput);
  
    // Function to filter data for the current week !!Can use to filter data only this week!!
    const filterDataForCurrentWeek = () => {
      const today = new Date();
      const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
      
      const filteredData = data?.data.filter((item:any) => {
        const itemDate = new Date(item.createdAt); 
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
        
      });
      
      return filteredData;
    };

    const [query, setQuery] = useState('')

    const handleChange = (e: any) => {
        setQuery(e.target.value);
    };


    const filterData = 
    query === ''
    ? data?.data
    : data?.data.filter(
    (place:any) =>
        place.name.toLowerCase().includes(query.toLowerCase()),
    );

    async function onDelete(event: FormEvent<HTMLFormElement>) {
        event.preventDefault
        console.log(event)
    try {
      Swal.fire({
        title: "กำลังลบข้อมูล",
        icon: "warning",
        confirmButtonText: "ปิด",
        allowOutsideClick: false,
      });
      const response = await fetch("/api/plan/delete", {
        method: "DELETE",
        body: JSON.stringify(event),
    })
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จ",
        confirmButtonText: "ปิด",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const responseData = await response.json();
    
      Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: responseData.message,
        confirmButtonText: "ปิด",
      });
    }
    }catch (error){
      Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: "เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง",
        confirmButtonText: "ปิด",
      });
    }
    };

    const dataForThisWeek = filterDataForCurrentWeek();
    console.log()
    return(
        <div className="p-10 mt-16 ml-80">
            <div>
                <p className="text-3xl font-bold mb-5">Plan</p>
            </div>
            <hr className="bg-[#E3B31F] py-1 border-1 mb-10 rounded-full" />

            <div className="grid grid-cols-3 gap-10 text-black">
                <div className="bg-[#D3BD9A] p-5 rounded-xl mb-10 text-center font-bold">
                    <p className=" text-xl my-1">All plan</p>
                    <p className="text-3xl my-1">{data?.data.length}</p>
                    <span className="text-xs"><span className="text-lime-700">{dataForThisWeek?.length}</span> plan added this week</span>
                </div>
            </div>

            <div className="bg-[#D3BD9A] p-5 rounded-xl  text-black">
                <p className="text-2xl mb-5  font-bold">Plan</p>
                <div className="mb-5">
                    <div className="flex items-center gap-1 rounded-xl p-1 bg-gray-300 w-max">
                            <MdSearch/>
                            <input 
                                type="search" 
                                placeholder='Search for username' 
                                className=" bg-transparent outline-none"
                                onChange={handleChange}
                            />
                    </div>
                </div>
            <div>
            {
                isLoading ? (
                    <p className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin inline-block mr-2" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Z" opacity=".1"/><path fill="currentColor" d="M12 4.5a7.458 7.458 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.458 10.458 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3Z"/></g></svg>
                            Loading...
                        </p>
                ): data?.data && (
                    data?.data.length > 0 ? (
                        <div>
                    {data?.data.map((planData: planDatas,index: number) => {
                        const userData = dataUser?.data.find((user: any) => user.id === planData.ownerId);
                        return (
                            <div key={index}>
                                <table className="text-xl w-full mb-20">
                    <thead className="font-bold">
                        <tr>
                            <td>Name</td>
                            <td>Create By</td>
                            <td>Created At</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="flex items-center gap-4">
                                <img className="" src={planData.images??""}
                                alt=""
                                width={40}
                                height={40}/>
                                {planData.name}
                            </td>
                            <td>{userData?.username}</td>
                            <td>{planData.createdAt}</td>
                            <td className="font-bold gap-2 ">
                                <Link href="/">
                                    <button className="p-1 rounded-md mr-2 bg-[#35C132] text-white">View</button>
                                </Link>
                                <div className="px-2 py-2 mb-20 font-bold inline-flex absolute top-3 end-2.5 ms-auto justify-center items-center" >
                                    <button onClick={() => onDelete}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="text-[#674F04] w-5 h-5 mt-2" fill="currentcolor">
                                        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                                    </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/*<Pagenavi/>*/}
                            </div>
                        )
                    })}
                    </div>
                ):(
                    <p className="text-center">ไม่มีข้อมูลผู้ใช้งาน</p>
                )
            )}
            </div>
            </div>
        </div>
    )
}

