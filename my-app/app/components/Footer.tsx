import Link from "next/link"

export default function Footer(){
    return (
        <footer className="bg-[#402E32] py-5 text-slate-200 h-fit">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="col">
                        <p className="mb-1 text-slate-300 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23c.23.01.44.05.63.13c.2.09.38.21.52.36s.25.33.34.53s.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01s-.66-.5-1.08-.66s-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92s-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35s.72.69 1.2.91c.48.22 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63s.56-.58.74-.94s.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46s-.32.23-.52.3c-.19.07-.39.09-.6.1c-.36-.01-.66-.08-.89-.23c-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88s-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"></path></svg>
                            2024, Developed by GoldenDuck.
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-1 text-yellow-400" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 8c-3.052 4.517-5.987 5.81-8 5c.543 1.833 4.443 4.375 6.927 5.838c1.07.63 1.383 2.065.638 3.059C10.202 23.717 8.315 26.289 8 27C.954 39.79 16.482 44.648 24 44c22.144-1.908 21.355-19.197 18-26c-8.052 13.994-20.481 5.915-20 3c.481-2.915 3.792-2.335 5-7C29.013 4.768 16.374.399 12 8"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 31c2.5 3.5 10 7 16 2"></path><circle cx="17" cy="12" r="2" fill="currentColor"></circle></g></svg>
                        </p>
                        <Link href='/' className='font-bold text-4xl hover:text-slate-400 duration-100'>
                            PLANTIEW
                        </Link>
                    </div>
                    <div className="col">
                        <p className="font-semibold mb-3">Menu</p>
                        <Link className="block text-slate-400 hover:text-slate-300 duration-100 mb-1.5" href={'/'}>
                            Home
                        </Link>
                        <Link className="block text-slate-400 hover:text-slate-300 duration-100 mb-1.5" href={'/plan'}>
                            Planning
                        </Link>
                        <Link className="block text-slate-400 hover:text-slate-300 duration-100 mb-1.5" href={'/journey'}>
                            Journey
                        </Link>
                    </div>
                    <div className="col">
                        <p className="font-semibold mb-3">Support Service</p>
                        <Link className="block text-slate-400 hover:text-slate-300 duration-100 mb-1.5" href={''}>
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}