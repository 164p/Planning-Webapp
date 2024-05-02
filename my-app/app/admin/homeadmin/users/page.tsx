"use client";
import DashboardSearch from "@/app/components/DashboardSearch";
import Pagenavi from "@/app/components/Pagenavi";
import { planStatus } from "@prisma/client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import useSWR, { mutate } from "swr";
import { MdSearch } from "react-icons/md";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Page(){

    type userData = {
        id:String;
        username:String;
        email:String;
        createdAt:String;
    }

    const { data, error, isLoading } = useSWR("/api/admin/user", fetcher);

    const filterDataForCurrentWeek = () => {
        const today = new Date();
        const startOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        );
        const endOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() + 6
        );
    
        const filteredData = data?.data.filter((item: any) => {
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
          place.username.toLowerCase().includes(query.toLowerCase()),

        );
        

    async function onDelete(event:any) {
        event.preventDefault;
        try {
            Swal.fire({
                title: "กำลังลบข้อมูล",
                icon: "warning",
                confirmButtonText: "ปิด",
                allowOutsideClick: false,
              });

              const response = await fetch("/api/admin/user/delete", {
                method: "DELETE",
                body: JSON.stringify(event),
              });

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

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "ลบข้อมูลไม่สำเร็จ",
                text: "เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง",
                confirmButtonText: "ปิด",
              });
        }
        await mutate("/api/admin/user");
    }

    const dataForThisWeek = filterDataForCurrentWeek();
    

    return(
        <div className="p-10 mt-16 ml-80">
            <div>
                <p className="text-3xl font-bold mb-5">User</p>
            </div>
            <hr className="bg-[#E3B31F] py-1 border-1 mb-10 rounded-full" />

            <div className="grid grid-cols-3 gap-10 text-black">
                <div className="bg-[#D3BD9A] p-5 rounded-xl mb-10 text-center font-bold">
                    <p className=" text-xl my-1">Total User</p>
                    <p className="text-3xl my-1">{data?.data.length}</p>
                    <span className="text-xs">
                        <span className="text-lime-700">{dataForThisWeek?.length}</span>{" "}
                        More than previous week
                    </span>
                </div>
            </div>

            <div className="bg-[#D3BD9A] p-5 rounded-xl  text-black">
                <p className="text-2xl mb-5  font-bold">All Users</p>
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
                    {isLoading ? (
                        <div>
                            Loading
                        </div>
                    ) : (
                        data?.data && data?.data.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-3 text-xl">
                                    <p className="w-2/5">Name</p>
                                    <p className="w-3/5">Email</p>
                                </div>
                                {filterData?.map((userData: userData,index:any) => {
                                    return(
                                        <div key={index} className="m-2">
                                            <div className="grid grid-cols-3">
                                                <div className="">
                                                    <p>{userData.username}</p>
                                                </div>
                                                <div className="">
                                                    <p>{userData.email}</p>
                                                </div>
                                                <div className="text-right">
                                                    <button className="p-1 rounded-md mr-2 bg-[#35C132] text-white">
                                                        View
                                                    </button>
                                                    <button className="p-1 rounded-md bg-[#C1323B] text-white" onClick={() => onDelete(userData)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        ) : (
                            <p>ไม่มีข้อมูลผู้ใช้งาน</p>
                        )
                    )}
                    
                </div>
            </div>
        </div>
    )
}