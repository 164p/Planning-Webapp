import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { createTheme, MantineProvider } from '@mantine/core';
import Link from 'next/link';


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
            <div className='flex flex-col min-h-screen'>
                <div className='flex-none z-50'>
                    <Navbar />
                </div>
            <div className='main grow bg-first-color text-[#674F04] relative'>
                {children}
            </div>
            {/* <div className='flex-none z-30'>
                <footer className="bg-[#402E32] py-5 text-slate-200 h-fit">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="col">
                            <p className="mb-1 text-slate-300 text-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23c.23.01.44.05.63.13c.2.09.38.21.52.36s.25.33.34.53s.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01s-.66-.5-1.08-.66s-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92s-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35s.72.69 1.2.91c.48.22 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63s.56-.58.74-.94s.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46s-.32.23-.52.3c-.19.07-.39.09-.6.1c-.36-.01-.66-.08-.89-.23c-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88s-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"></path></svg>
                                2024, Developed by GoldenDuck.
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-1 text-yellow-400" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 8c-3.052 4.517-5.987 5.81-8 5c.543 1.833 4.443 4.375 6.927 5.838c1.07.63 1.383 2.065.638 3.059C10.202 23.717 8.315 26.289 8 27C.954 39.79 16.482 44.648 24 44c22.144-1.908 21.355-19.197 18-26c-8.052 13.994-20.481 5.915-20 3c.481-2.915 3.792-2.335 5-7C29.013 4.768 16.374.399 12 8"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 31c2.5 3.5 10 7 16 2"></path><circle cx="17" cy="12" r="2" fill="currentColor"></circle></g></svg>
                            </p>
                            <Link href='/homeadmin/Users' className='font-bold text-4xl hover:text-slate-400 duration-100'>
                                PLANTIEW
                            </Link>
                        </div>
                        <div className="col mt-5 flex align-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" className='text-xl'><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm6 8H6q-.825 0-1.413-.588T4 18v-.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.588 1.413T18 20ZM6 18h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6-8q.825 0 1.413-.588T14 8q0-.825-.588-1.413T12 6q-.825 0-1.413.588T10 8q0 .825.588 1.413T12 10Zm0-2Zm0 10Z"></path></svg>
                            <Link href='/homeadmin/Users' className="font-semibold ml-2 text-lg">Users</Link>
                        </div>
                        <div className="col mt-5 flex align-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" className='text-xl'><path fill="currentColor" d="M11 5.1q.275-.05.5-.075T12 5q.275 0 .5.025t.5.075V5q0-.425-.288-.712T12 4q-.425 0-.712.288T11 5zM7 22q-.825 0-1.412-.587T5 20v-8q0-2.125 1.113-3.8T9 5.7V5q0-1.25.863-2.125T12 2q1.275 0 2.138.875T15 5v.7q1.575.725 2.625 2.138t1.325 3.212q-.45-.05-1-.05t-1 .075q-.35-1.725-1.725-2.9T12 7Q9.925 7 8.463 8.462T7 12v8h4.3q.15.5.413 1.038t.537.962zm2-8h3.25q.35-.525.938-1.075T14.4 12H9q-.425 0-.712.288T8 13q0 .425.288.713T9 14m9-1q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13m0 8q.275 0 .463-.187t.187-.463q0-.275-.187-.462T18 19.7q-.275 0-.462.188t-.188.462q0 .275.188.463T18 21m0-1.8q.2 0 .325-.125t.125-.325q0-.2.15-.4t.35-.4q.35-.3.55-.575t.2-.775q0-.725-.475-1.162T18 15q-.475 0-.875.238t-.65.637q-.1.15-.025.313t.25.237q.15.075.313 0t.262-.2q.125-.175.313-.275t.412-.1q.375 0 .588.188t.212.562q0 .275-.15.463t-.35.387q-.15.15-.312.3t-.288.35q-.075.15-.112.3t-.038.35q0 .2.125.325T18 19.2"></path></svg>
                            <Link href='/homeadmin/Plan' className="font-semibold ml-2 text-lg">Plan</Link>
                        </div>
                    </div>
                </div>
                </footer>
            </div> */}
        </div>
        </MantineProvider>

    )
}