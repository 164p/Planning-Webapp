'use client';

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function page(){

    const router = useRouter();

    const FormDataInput = {
        username: "",
        password_1: "",
        password_2: "",
        email: ""
    }
    const [data, setData] = useState(FormDataInput)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(data.username == '' || data.password_1 == '' || data.password_2 == '' || data.email == ''){
            Swal.fire({
                title: 'สมัครสมาชิกไม่สำเร็จ',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }else if(data.password_1 !== data.password_2){
            Swal.fire({
                title: 'สมัครสมาชิกไม่สำเร็จ',
                text: 'รหัสผ่านทั้ง 2 ไม่ตรงกัน',
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }else if(!usernameRegex.test(data.username)){
            Swal.fire({
                title: 'สมัครสมาชิกไม่สำเร็จ',
                text: 'ชื่อผู้ใช้งานจะต้องประกอบด้วย A-Z หรือ a-z หรือ 0-9',
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }else if(!data.email.match(emailRegex)){
            Swal.fire({
                title: 'สมัครสมาชิกไม่สำเร็จ',
                text: 'อีเมลที่สมัครไม่ถูกต้อง',
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
                
                if(response.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'สมัครสมาชิกสำเร็จ ระบบกำลังพาท่านไปหน้าเข้าสู่ระบบ', 
                        confirmButtonText: 'ปิด',
                        timer: 1500,
                        timerProgressBar: true
                    }).then(() => {
                        router.push('/auth/signin');
                    })
                }else{
                    const responseData = await response.json()

                    Swal.fire({
                        icon: 'error',
                        title: 'สมัครสมาชิกไม่สำเร็จ', 
                        text: responseData.message, 
                        confirmButtonText: 'ปิด',
                    });
                }
                
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
        <div className="pb-12 pt-36">
            <div className="container">
                <div className="max-w-md mx-auto">
                    <h5 className='mb-10 font-bold text-center text-2xl'>SIGN UP</h5>
                    <form onSubmit={onSubmit}>
                        <div className="input-group relative mb-5">
                            <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
                            </div>
                            <input type="text" name='username' id='username'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="username" />
                        </div>
                        <div className="input-group relative mb-5">
                            <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4ZM20 8l-7.475 4.675q-.125.075-.263.113t-.262.037q-.125 0-.263-.037t-.262-.113L4 8v10h16V8Zm-8 3l8-5H4l8 5ZM4 8v.25v-1.475v.025V6v.8v-.012V8.25V8v10V8Z"></path></svg>
                            </div>
                            <input type="email" name='email' id='email'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="email" />
                        </div>
                        <div className="input-group relative mb-5">
                            <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19q-.425 0-.713-.288T2 18q0-.425.288-.713T3 17h18q.425 0 .713.288T22 18q0 .425-.288.713T21 19H3Zm-.5-6.425q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T1 9.95q0-.325.213-.537T1.75 9.2h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T7 9.95q0 .325-.213.538t-.537.212H5.3l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L4 11.45l-.475.85q-.15.275-.45.35t-.575-.075Zm8 0q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T9 9.95q0-.325.213-.537T9.75 9.2h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T15 9.95q0 .325-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L12 11.45l-.475.85q-.15.275-.45.35t-.575-.075Zm8 0q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T17 9.95q0-.325.213-.537t.537-.213h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T23 9.95q0 .325-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L20 11.45l-.475.85q-.15.275-.45.35t-.575-.075Z"></path></svg>
                            </div>
                            <input type="password" name='password_1' id='password_1'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="password" />
                        </div>
                        <div className="input-group relative mb-5">
                            <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19q-.425 0-.713-.288T2 18q0-.425.288-.713T3 17h18q.425 0 .713.288T22 18q0 .425-.288.713T21 19H3Zm-.5-6.425q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T1 9.95q0-.325.213-.537T1.75 9.2h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T7 9.95q0 .325-.213.538t-.537.212H5.3l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L4 11.45l-.475.85q-.15.275-.45.35t-.575-.075Zm8 0q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T9 9.95q0-.325.213-.537T9.75 9.2h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T15 9.95q0 .325-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L12 11.45l-.475.85q-.15.275-.45.35t-.575-.075Zm8 0q-.275-.15-.35-.45t.075-.575l.475-.85h-.95q-.325 0-.537-.212T17 9.95q0-.325.213-.537t.537-.213h.95l-.475-.8q-.15-.275-.075-.575t.35-.45q.275-.15.575-.075t.45.35l.475.8l.475-.8q.15-.275.45-.35t.575.075q.275.15.35.45t-.075.575l-.475.8h.95q.325 0 .537.213T23 9.95q0 .325-.213.538t-.537.212h-.95l.475.85q.15.275.075.575t-.35.45q-.275.15-.575.075t-.45-.35L20 11.45l-.475.85q-.15.275-.45.35t-.575-.075Z"></path></svg>
                            </div>
                            <input type="password" name='password_2' id='password_2'
                            onChange={handleChange}
                            className="w-full bg-[#ede4d6] pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                            placeholder="confirm password" />
                        </div>
                        <div className='input-group'>
                            <button type='submit' className='w-full text-slate-200 bg-[#674F04] hover:bg-[#7C6417] px-7 py-2 rounded-md text-center duration-100'>
                                Sign Up
                            </button>
                        </div>
                        <hr className='my-5 bg-[#674F04] h-px border-none' />
                        <p className='text-center'>
                            Already have an account?
                            <Link href="/auth/signin" className="ml-1 font-semibold">
                                sign in!
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}