import { createTheme, MantineProvider } from "@mantine/core";
import Link from "next/link";
import Comments from "./comment/page";

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
        <div className='flex flex-col min-h-screen mx-5'>
            <div className='bg-[#D3BD9A] w-full h-24 mt-20 text-white rounded-2xl'>
                <div className="m-5 mt-7">
                    <div className="flex justify-between align-center items-center">
                        <Link href={`/explore/trip`} className='flex text-[#674F04] duration-100 w-fit items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='mr-1.5' width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"></path></svg>
                        </Link>
                        <div className="text-[#674F04] ml-20 font-bold md:text-4xl text-2xl">Name Planning</div>
                        <div>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 3H17C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3ZM12 15.82L17 18V5H7V18L12 15.82Z" fill="#674F04"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main grow bg-first-color text-[#674F04] z-20 relative'>
                {children}
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex w-full p-0.5 mt-5 mb-10 lg:w-2/3 bg-[#9D864F] '></div>
            </div>
            <div className='flex-none max-w-6xl mx-auto w-full mb-10'>
                <div className="bg-[#D3BD9A] h-28 pt-5 text-white rounded-2xl">
                    <div className="flex justify-between px-10">
                    <div className="flex justify-center items-center ">
                        <div className="bg-[#9B8651] rounded-full w-20 h-20"></div>
                        <div className="text-[#674F04] font-bold text-2xl ml-5">Name users</div>
                    </div>
                    <div className="flex justify-center items-center">
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 3H17C18.1 3 19 3.9 19 5V21L12 18L5 21V5C5 3.9 5.9 3 7 3ZM12 15.82L17 18V5H7V18L12 15.82Z" fill="#674F04"/>
                        </svg>
                    </div>
                    </div>
                </div>
            </div>
            {/* <div className='flex justify-center items-center'>
                <div className='flex w-full p-0.5 mt-5 mb-10 lg:w-2/3 bg-[#674F04] '></div>
            </div>
            <div>
                <Comments/>
            </div> */}
        </div>
        </MantineProvider>

    )
}

{/* <div className="bg-[#F5F0E8] rounded-full h-32 w-32 my-12 ml-40"></div> */}