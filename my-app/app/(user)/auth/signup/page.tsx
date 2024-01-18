'use client';

import Link from 'next/link'
import { signIn } from "next-auth/react"
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function page(){

    const router = useRouter();

    const FormDataInput = {
        username: "",
        password_1: "",
    }
    const [data, setData] = useState(FormDataInput)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(data.username == '' || data.password_1 == ''){
            Swal.fire({
                title: 'เข้าสู่ระบบไม่สำเร็จ',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }else{
            try {
                Swal.fire({
                    title: 'กำลังสมัครสมาชิก',
                    icon: 'warning',
                    confirmButtonText: 'ปิด',
                    allowOutsideClick: false
                }) 
                
                const response = await fetch("/api/auth/signup", {
                    method: 'POST',
                    body: JSON.stringify(data)
                })

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'สมัครสมาชิกไม่สำเร็จ', 
                    text: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง', 
                    confirmButtonText: 'ปิด',
                });
            }
        } 
    }
    return (
        <div className="py-12">
            <div className="container">
                <div className="card rounded-md max-w-md p-3 mx-auto">
                    <form onSubmit={onSubmit}>
                        <div className="input-group relative mb-5">
                            <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4ZM20 8l-7.475 4.675q-.125.075-.263.113t-.262.037q-.125 0-.263-.037t-.262-.113L4 8v10h16V8Zm-8 3l8-5H4l8 5ZM4 8v.25v-1.475v.025V6v.8v-.012V8.25V8v10V8Z"></path></svg>
                            </div>
                            <input type="text" name='username' id='username'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="email / username" />
                        </div>
                        <div className="input-group relative mb-5">
                            <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19q-.425 0-.713-.288T2 18q0-.425.288-.713T3 17h18q.425 0 .713.288T22 18q0 .425-.288.713T21 19H3Zm-.5-6.425q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T1 9.95q0-.325.213-.537T1.75 9.2h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T7 9.95q0 .325-.213.538t-.537.212H5.3l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L4 11.45l-.475.85q-.15.275-.45.35t-.575-.075Zm8 0q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T9 9.95q0-.325.213-.537T9.75 9.2h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T15 9.95q0 .325-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L12 11.45l-.475.85q-.15.275-.45.35t-.575-.075Zm8 0q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T17 9.95q0-.325.213-.537t.537-.213h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T23 9.95q0 .325-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L20 11.45l-.475.85q-.15.275-.45.35t-.575-.075Z"></path></svg>
                            </div>
                            <input type="password" name='password' id='password'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="password" />
                        </div>
                        <div className='input-group'>
                            <button type='submit' className='w-full bg-[#a28f70] px-4 py-2 text-white hover:bg-[#8a7b60] duration-150'>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}