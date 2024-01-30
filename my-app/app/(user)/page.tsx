import Image from "next/image"
import Link from "next/link"

export default function page(){

    return (
        <div className="pb-12 pt-16">
            <div className="banner mb-5">
                <Image src="/banner.png" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                    style={{ width: '100%', height: 'auto' }} className='mx-auto'/>
            </div>
            <div className="container">
                <div className="section">
                    <div className="section-header">
                        <h2 className="text-2xl	font-semibold">GO TO</h2>
                    </div>
                    <hr className="bg-[#D3BD9A] h-px py-px border-none my-3" />
                    <div className="section-body mb-5">
                        <div className="grid grid-cols-3 gap-4 mb-3">
                            <div className="col">
                                <Link href={'/'} className="card overflow-hidden w-full bg-[#674F04] hover:bg-[#896A08] duration-100 px-8 py-3 rounded-md flex flex-col md:flex-row text-[#E3B31F] justify-center items-center">
                                    <div className="card-section">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-1V3c0-.6-.4-1-1-1s-1 .4-1 1v1H8V3c0-.6-.4-1-1-1s-1 .4-1 1v1H5C3.3 4 2 5.3 2 7v1h20V7c0-1.7-1.3-3-3-3M2 19c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-9H2zm15-7c.6 0 1 .4 1 1s-.4 1-1 1s-1-.4-1-1s.4-1 1-1m0 4c.6 0 1 .4 1 1s-.4 1-1 1s-1-.4-1-1s.4-1 1-1m-5-4c.6 0 1 .4 1 1s-.4 1-1 1s-1-.4-1-1s.4-1 1-1m0 4c.6 0 1 .4 1 1s-.4 1-1 1s-1-.4-1-1s.4-1 1-1m-5-4c.6 0 1 .4 1 1s-.4 1-1 1s-1-.4-1-1s.4-1 1-1m0 4c.6 0 1 .4 1 1s-.4 1-1 1s-1-.4-1-1s.4-1 1-1"></path></svg>
                                    </div>
                                    <div className="card-section md:ml-2">
                                        <p className="font-bold text-lg">PLANNING</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col">
                                <Link href={'/'} className="card overflow-hidden w-full bg-[#674F04] hover:bg-[#896A08] duration-100 px-8 py-3 rounded-md flex flex-col md:flex-row text-[#E3B31F] justify-center items-center">
                                    <div className="card-section">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 14.33c.79 0 1.63.08 2.5.24v1.5c-.62-.16-1.46-.24-2.5-.24c-1.9 0-3.39.33-4.5.99v-1.69c1.17-.53 2.67-.8 4.5-.8M13 12.46c1.29-.53 2.79-.79 4.5-.79c.79 0 1.63.07 2.5.23v1.5c-.62-.16-1.46-.24-2.5-.24c-1.9 0-3.39.34-4.5.99m4.5-3.65c-1.9 0-3.39.32-4.5 1V9.84c1.23-.56 2.73-.84 4.5-.84c.79 0 1.63.08 2.5.23v1.55c-.74-.19-1.59-.28-2.5-.28m3.5 8V7c-1.04-.33-2.21-.5-3.5-.5c-2.05 0-3.88.5-5.5 1.5v11.5c1.62-1 3.45-1.5 5.5-1.5c1.19 0 2.36.16 3.5.5m-3.5-14c2.35 0 4.19.5 5.5 1.5v14.56c0 .12-.05.24-.16.35c-.11.09-.23.17-.34.17c-.11 0-.19-.02-.25-.05c-1.28-.69-2.87-1.03-4.75-1.03c-2.05 0-3.88.5-5.5 1.5c-1.34-1-3.17-1.5-5.5-1.5c-1.66 0-3.25.36-4.75 1.07c-.03.01-.07.01-.12.03c-.04.01-.08.02-.13.02c-.11 0-.23-.04-.34-.12a.475.475 0 0 1-.16-.35V6c1.34-1 3.18-1.5 5.5-1.5c2.33 0 4.16.5 5.5 1.5c1.34-1 3.17-1.5 5.5-1.5Z"></path></svg>
                                    </div>
                                    <div className="card-section md:ml-2">
                                        <p className="font-bold text-lg">JOURNEY</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col">
                                <Link href={'/'} className="card overflow-hidden w-full bg-[#674F04] hover:bg-[#896A08] duration-100 px-8 py-3 rounded-md flex flex-col md:flex-row text-[#E3B31F] justify-center items-center">
                                    <div className="card-section">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"></path></svg>
                                    </div>
                                    <div className="card-section md:ml-2">
                                        <p className="font-bold text-lg">EXPLORE</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="section-body mb-5">

                    </div>
                </div>
                <div className="section">
                    <div className="card bg-[#EFE5D5] border-2 border-[#674F04] rounded-md p-3">
                        <Link href={"/"} className="flex justify-end items-center">
                            SEE ALL <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.3-.713t.3-.712q.3-.3.713-.3t.712.3L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.687.275t-.713-.3Z"></path></svg></span>
                        </Link>
                        <p className="font-semibold text-center">Ready for new journey?</p>
                    </div> 
                </div>
            </div>
        </div>
    )
}