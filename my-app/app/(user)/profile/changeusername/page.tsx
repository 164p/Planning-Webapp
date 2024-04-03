'use client'
import React from 'react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'



export default function page() {

  const router = useRouter()

  const NewDisplayNameInput = {
    newDisplayName :''
  }

  const [data,setData] = useState(NewDisplayNameInput)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setData({...data, [e.target.name]: e.target.value })
  }


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      

      try {
          const response = await fetch("/api/auth/resetdisplayname",{
            method:'POST',
            body: JSON.stringify(data)
            
          })
          if(response.ok){
            console.log(data)
            console.log(response.status)
            
          }
      } catch (error) {
        console.log(error)
      }
  }

         

  return (
    <main>
      <div className="m-12 flex flex-col">
        <label>NEW DISPLAYNAME</label>
        <form onSubmit={onSubmit}>
          <div className="input-group relative mb-5">
            <div className="text-slate-600 dark:text-slate-600 absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
            </div>
            <input type='text' onChange={handleChange} name='newDisplayName' id='newDisplayName' className="rounded-md my-5 w-full pl-12 text-slate-700 px-3 py-2 rounded-md focus:outline-none forcus:border-[#674F04]/50 focus:ring-1 focus:ring-[#674F04]/50" 
              placeholder="username"/>
          </div>
          <div className='flex justify-between'>
            <button type='submit'  className='bg-[#ae7a28] w-1/3 py-2 h-full text-[#F5F0E8] rounded-lg'>Change</button>
          </div>
        </form>
      </div>
    </main>
    )
}
