import { createTheme, MantineProvider } from '@mantine/core';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
  });

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MantineProvider theme={theme}>
            <div className="mt-48 mb-40">
                <div className="container grid sm:grid-flow-col grid-cols-4">
                <div className="card bg-white rounded-md md:px-10 py-20 w-full">
                    <span className="icon text-9xl bg-white rounded-full">
                        <FaUserCircle className="mx-auto"/>
                    </span>
                    <div className="card-header mt-10">
                        <p className="text-2xl font-bold text-center">USERNAME</p>
                    </div>
                        <hr className="h-px border-none bg-[#674F04] my-10" />
                        <div className='user-select'>
                            <ul>
                                <li>
                                    <Link href='/profile' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/profile/setting' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        Account Setting
                                    </Link> 
                                </li>
                                <li> 
                                    <Link href='/plan' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        My Plan
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/profile' className='block mb-3 hover:bg-[#F5F0E8] py-2 px-6 rounded-md hover:text-[#4E3C05]'>
                                        ???
                                    </Link>
                                </li>
                            </ul>
                        </div>
                </div>
                <div className="card bg-[#D3BD9A] rounded-md px-10 md:px-20 py-20 col-span-3 w-full ">
                    {children}
                </div>
                </div>
            </div>
        </MantineProvider>

    )
}