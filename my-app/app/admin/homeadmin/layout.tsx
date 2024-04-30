import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { createTheme, MantineProvider } from '@mantine/core';
import { signOut } from "next-auth/react"


const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
  });

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return(
        <MantineProvider theme={theme}>
        <div>
            <div className="bg-[#39272B] fixed h-screen py-6 px-5 text-slate-100 duration-500 min-w-80 overflow-auto top-14 shadow-md">
                <div>
                    <button className='block bg-[#D3BD9A] text-[#674F04] py-5 px-5 rounded-md flex items-center text-start w-full mb-5'>
                        <FaUserCircle className='text-4xl'/>
                        <div className='section ml-2.5'>
                            <p className='font-bold'>ADMIN</p>
                            <p className='text-sm'>admin@gmail.com</p>
                        </div>
                    </button>
                </div>
                <div className='my-5 border-b-2 border-[#E3B31F]'></div>
                <div className='section mb-5'>
                    <div className='sidebar-section-header mb-3'>
                        <p className='font-bold'>Menu</p>
                    </div>
                    <div className='section-body'>
                    <ul>
                        <li>
                            <Link href='/admin/homeadmin/Users' className='block flex items-center mb-3 hover:bg-[#F5F0E8] py-2 px-5 rounded-md hover:text-[#4E3C05]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm6 8H6q-.825 0-1.413-.588T4 18v-.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.588 1.413T18 20ZM6 18h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
                                <p className='ml-1'>Users</p>
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/homeadmin/Plan' className='block flex items-center mb-3 hover:bg-[#F5F0E8] py-2 px-5 rounded-md hover:text-[#4E3C05]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 5.1q.275-.05.5-.075T12 5q.275 0 .5.025t.5.075V5q0-.425-.288-.712T12 4q-.425 0-.712.288T11 5zM7 22q-.825 0-1.412-.587T5 20v-8q0-2.125 1.113-3.8T9 5.7V5q0-1.25.863-2.125T12 2q1.275 0 2.138.875T15 5v.7q1.575.725 2.625 2.138t1.325 3.212q-.45-.05-1-.05t-1 .075q-.35-1.725-1.725-2.9T12 7Q9.925 7 8.463 8.462T7 12v8h4.3q.15.5.413 1.038t.537.962zm2-8h3.25q.35-.525.938-1.075T14.4 12H9q-.425 0-.712.288T8 13q0 .425.288.713T9 14m9-1q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13m0 8q.275 0 .463-.187t.187-.463q0-.275-.187-.462T18 19.7q-.275 0-.462.188t-.188.462q0 .275.188.463T18 21m0-1.8q.2 0 .325-.125t.125-.325q0-.2.15-.4t.35-.4q.35-.3.55-.575t.2-.775q0-.725-.475-1.162T18 15q-.475 0-.875.238t-.65.637q-.1.15-.025.313t.25.237q.15.075.313 0t.262-.2q.125-.175.313-.275t.412-.1q.375 0 .588.188t.212.562q0 .275-.15.463t-.35.387q-.15.15-.312.3t-.288.35q-.075.15-.112.3t-.038.35q0 .2.125.325T18 19.2"></path></svg>
                                <p className='ml-1'>Plan</p>
                            </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className='my-5 border-b-2 border-[#E3B31F]'></div>
                <div className='sidebar-section'>
                    <button className='w-full block px-5 py-1.5 bg-red-600 hover:bg-red-500 text-whtie rounded-md duration-100' >
                        Sign out
                    </button>
                </div>
            </div>
            <div className="h-screen w-full">
                {children}
            </div>
        </div>
        </MantineProvider>
    )
}