'use client'
import Image from "next/image"
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"

import useSWR from 'swr';
import { useState, useEffect } from 'react'
import { uploadImages } from "@/app/lib/uploadImages";

const fetcher = (url : string) => fetch(url).then(r => r.json())

export default function Home() {
    const { data, error, isLoading } = useSWR('/api/profile', fetcher);
    
    
    
    const ImageDataInput ={
        images: ''
    }
    
    const [profileData, setProfleData] = useState(ImageDataInput)


    const handleChangeImages = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]){

            const image = e.target.files[0]
            const file = await uploadImages(image)

            setProfleData({...profileData, [e.target.name]: file.url})
            e.target.value = ''
            console.log(profileData)
        }
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await fetch('/api/profile/changeprofile',{
            method: 'POST',
            body: JSON.stringify(profileData)
        })
        console.log(profileData)
    }

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;   
    console.log(profileData)
    return(
        <main className="content-center">
                <div className="card">
                    <div className="card-header mb-10">
                        <p className="text-2xl font-bold mb-10">PROFILE SETTING</p>
                        <hr className="h-px border-none bg-[#674F04] my-10" />
                        
                            <div className="card-section flex flex-col col-start-1 col-end-2">
                                <div className="">
                                    <span className="icon text-9xl bg-white rounded-full">
                                        {
                                            profileData.images !== '' ? (
                                                
                                                    <Image src={profileData.images} alt="Preview Images" width={0} height={0} sizes="120vw" priority={true}
                                                    style={{ width: '100%', height: 'auto' }} className=''></Image>
                                                
                                            ):data?.data.profileimage ?(
                                                
                                                    <Image src={data?.data.profileimage} alt="Preview Images" width={0} height={0} sizes="120vw" priority={true}
                                                    style={{ width: '100%', height: 'auto' }} className=''></Image>
                                                
                                            ):(<></>)
                                        }
                                    </span>
                                </div>
                                <label className="text-center text-black">Edit Picture</label>
                                <form onSubmit={onSubmit}>

                                <input type='file' id='images' name="images" className='' 
                                                    accept=".jpeg,.jpg,.png,image/jpeg,image/png" onChange={handleChangeImages} />
                                <button type="submit" >enter</button>        
                                </form>
                            </div>
            
                            <div className="my-8 p-4 w-full h-full bg-white rounded-xl">
                                <p>userdescription___ Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, iure consequuntur? Nemo deleniti nesciunt odio, voluptatem doloremque voluptate, et impedit vel vero officiis adipisci dolores suscipit alias voluptas perspiciatis veritatis.</p>
                            </div>
                            
                        
                        <p className="text-xl">bookmarks</p>
                        <div className="my-2 p-4 bg-white rounded-xl flex flex-row flex-wrap justify-evenly">
                            {/* {data?.bookmarkData.map((bookmarks:planDatas, index: number) => (
                                <Link href={`/plan/${bookmarks.id}`} className="my-2 shrink-0 basis-80 flex justify-center items-center hover:text-xl h-32 
                                 rounded-lg bg-blue-200 hover:bg-black/50" >
                                    
                                    
                                    <div className="">{bookmarks.name}</div>
                                </Link>
                            
                            ))}                             */}
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

                    // {data.map((bookmarks:any) => (
                    //     <Link href={`/plan/${bookmarks.planId}`} className="my-2 shrink-0 basis-80 flex justify-center items-center hover:text-xl h-32 
                    //      rounded-lg bg-blue-200 hover:bg-black/50" >
                            
                            
                    //         <div className="">{bookmarks.planId}</div>
                    //     </Link>
                    
                    // ))}    