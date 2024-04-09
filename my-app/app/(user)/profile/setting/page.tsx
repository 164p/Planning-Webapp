'use client'
import React from 'react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function page() {

    const NewDisplayNameInput = {
        newDisplayName :''
      }
    
    const [displayName,setDisplayName] = useState(NewDisplayNameInput)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setDisplayName({...displayName, [e.target.name]: e.target.value })
    }
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        try {
            const response = await fetch("/api/auth/resetdisplayname",{
              method:'POST',
              body: JSON.stringify(displayName)
            })
            if(response.ok){
                Swal.fire({
                    title: 'เปลี่ยนชื่อเล่นสำเร็จ',
                    text: 'ระบบอาจใช้เวลาในการเปลี่ยนการแสดงผลชื่อเล่นของคุณ',
                    icon: 'success',
                    confirmButtonText: 'ปิด'
                })
            }else{
                Swal.fire({
                    title: 'เปลี่ยนชื่อเล่นไม่สำเร็จ',
                    text: 'กรุณาลองใหม่อีกครั้งในภายหลัง',
                    icon: 'error',
                    confirmButtonText: 'ปิด'
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'เปลี่ยนชื่อเล่นไม่สำเร็จ',
                text: 'กรุณาลองใหม่อีกครั้งในภายหลัง',
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }
    }


    const NewPasswordInput = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }
    const [newPassword, setNewPassword] = useState(NewPasswordInput)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword({...newPassword, [e.target.name]: e.target.value})
        console.log(newPassword)
    }
    async function passwordSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if(newPassword.newPassword !== newPassword.confirmNewPassword){
            Swal.fire({
              title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
              text: 'รหัสผ่านใหม่ทั้ง 2 ไม่ตรงกัน',
              icon: 'error',
              confirmButtonText: 'ปิด'
          })
        }else if(newPassword.newPassword.length < 6){  
            Swal.fire({
                title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
                text: 'รหัสผ่านต้องมีความยาวมากกว่า 6 ตัวอักษร',
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
        }else if(newPassword.newPassword == newPassword.oldPassword){
            Swal.fire({
                title: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
                text: 'รหัสผ่านใหม่ต้องไม่เหมือนรหัสผ่านเก่า',
                icon: 'error',
                confirmButtonText: 'ปิด'
            })
         
        }else{
            try {
                const response = await fetch("/api/auth/resetpassword",{
                    method:'POST',
                    body: JSON.stringify(newPassword)
                  })
                  if(response.ok){
                    Swal.fire({
                        title: 'เปลี่ยนรหัสผ่านใหม่สำเร็จ',
                        text: 'กรุณาเข้าสู่ระบบใหม่',
                        icon: 'success',
                        confirmButtonText: 'ปิด'
                    })///อยากให้มีการ logout แล้วไปหน้า login ใหม่
                }else{
                    Swal.fire({
                        title: 'เปลี่ยนรหัสผ่านใหม่ไม่สำเร็จ',
                        text: 'รหัสผ่านเก่าผิด',
                        icon: 'error',
                        confirmButtonText: 'ปิด'
                    })
                }
                  
            } catch (error) {
                Swal.fire({
                    title: 'เปลี่ยนรหัสผ่านใหม่ไม่สำเร็จ',
                    text: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
                    icon: 'error',
                    confirmButtonText: 'ปิด'
                })
            }
        }}


  return (
    <main>
      <div className="m-12 flex flex-col">
        {/* <form onSubmit={onSubmit}>
            <label>New Displayname</label>
            <div className="input-group relative">
                <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
                </div>
                <input type='text' onChange={handleChange} name='newDisplayName' id='newDisplayName' className="rounded-md my-5 w-full pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                placeholder="username"/>
            </div>
            <div className='text-end mb-8'>
                <button type='submit' className='bg-[#ae7a28] w-1/3 py-2 h-full  text-[#F5F0E8] rounded-lg'>Change</button>
            </div>
        </form> */}
        <form onSubmit={passwordSubmit}>
            <label>Old Password</label>
            <div className="input-group relative mb-2">
                <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
                </div>
                <input type='password' onChange={handlePasswordChange} name='oldPassword' id='oldPassword' className="rounded-md my-5 w-full pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                    placeholder="old password"/>
            </div>
            <label>New Password</label>
            <div className="input-group relative mb-2">
                <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
                </div>
                <input type='password' onChange={handlePasswordChange} name='newPassword' id='newPassword' className="rounded-md my-5 w-full pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                    placeholder="New password"/>
            </div>
            <label>Confirm Password</label>
            <div className="input-group relative">
                <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
                </div>
                <input type='password' onChange={handlePasswordChange} name='confirmNewPassword' id='confirmNewPassword' className="rounded-md my-5 w-full pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
                    placeholder="Confirm password"/>
            </div>
            <div className='text-end'>
                <button type='submit' className='bg-[#ae7a28] w-1/3 py-2 h-full  text-[#F5F0E8] rounded-lg'>Change</button>
            </div>
        </form>
        
         
        
      </div>
    </main>
  )
}
