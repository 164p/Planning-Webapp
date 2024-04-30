import Image from "next/image"
import Link from "next/link"

export default function page(){

    return (
        <div className="pb-12">
            <div className="banner mb-5 relative max-h-screen overflow-hidden mx-5 mt-20">
                <div className="grid lg:grid-cols-4 z-10 absolute w-full content-center sm:grid-cols-2">
                    <div className="text-center lg:mt-40 col-start-3 col-end-5 sm:mt-20">
                        <div className="border-box bg-[#F5F0E8] lg:mx-40 shadow-3xl rounded-3xl sm:py-20 sm:px-10 sm:mx-20">
                            <div className="text-5xl mb-5 font-bold">
                                Your Next Journey
                            </div>
                            <div className="mb-5">
                                Make your new journey for new experience!
                            </div>
                            <Link className="bg-[#674F04] text-white font-bold py-2 px-4 rounded-full" href={"/plan"}>
                                Make a Trip
                            </Link>
                        </div>
                    </div>
                </div>
                <Image src="/lp3.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                    style={{ width: '100%', height: 'auto' }} className='mx-auto rounded-3xl'/>
            </div>
            <hr className="bg-[#EB8F00] mx-10 py-1 border-5 my-3 rounded-full" />
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    <div className="section mb-10 mt-20">
                        <div className="section-header">
                            <h2 className="text-2xl	font-semibold">Recommand Trip</h2>
                        </div>
                        <div className="section-body my-5">
                            <div className="grid lg:grid-cols-4 gap-5 mb-3 md:grid-cols-2">
                                <div className="col">
                                    <div className="card-section rounded-lg shadow-sm text-[#674F04] bg-[#EDE5D7] pb-3">
                                        <div dir="rtl">
                                            <div className='z-10 absolute bg-[#F5F0E8] bg-opacity-90 rounded-full px-3 py-1 m-4 font-bold inline-flex'>
                                            <div>5</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow mr-1">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"clipRule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                        <Image src="/bangsan1.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                                            style={{ width: '100%', height: '180px' }} className='mx-auto rounded-2xl'/>
                                        <div className="card-button inline-flex">
                                            <div className="button-t mx-7 mt-5">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-bold text-[#674F04] text-lg">บางแสนบางใจ</p>
                                                </div>
                                                <div className="inline-flex">
                                                    <p className="font-bold">20000</p>/Trip
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-5 lg:ml-12 sm:ml-24">
                                                <Link href={"/explore/placedetail"}>
                                                    <svg className="text-gray w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-section rounded-lg shadow-sm text-[#674F04] bg-[#EDE5D7] pb-3">
                                        <div dir="rtl">
                                            <div className='z-10 absolute bg-[#F5F0E8] bg-opacity-90 rounded-full px-3 py-1 m-4 font-bold inline-flex'>
                                            <div>4</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow mr-1">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"clipRule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                        <Image src="/bangsan.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                                            style={{ width: '100%', height: '180px' }} className='mx-auto rounded-2xl'/>
                                        <div className="card-button inline-flex">   
                                            <div className="button-t mx-7 mt-5">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-bold text-[#674F04] text-lg">ชะอำ</p>
                                                </div>
                                                <div className="inline-flex">
                                                    <p className="font-bold">10000</p>/Trip
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-5 lg:ml-12 sm:ml-24">
                                                <svg className="text-gray w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-section rounded-lg shadow-sm text-[#674F04] bg-[#EDE5D7] pb-3">
                                        <div dir="rtl">
                                            <div className='z-10 absolute bg-[#F5F0E8] bg-opacity-90 rounded-full px-3 py-1 m-4 font-bold inline-flex'>
                                            <div>5</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow mr-1">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"clipRule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                        <Image src="/beach1.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                                            style={{ width: '100%', height: '180px' }} className='mx-auto rounded-2xl'/>
                                        <div className="card-button inline-flex">
                                            <div className="card-button mx-7 mt-5">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-bold text-[#674F04] text-lg">กระบี่</p>
                                                </div>
                                                <div className="inline-flex">
                                                    <p className="font-bold">30000</p>/Trip
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-5 lg:ml-12 sm:ml-24">
                                                <svg className="text-gray w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card-section rounded-lg shadow-sm text-[#674F04] bg-[#EDE5D7] pb-3">
                                        <div dir="rtl">
                                            <div className='z-10 absolute bg-[#F5F0E8] bg-opacity-90 rounded-full px-3 py-1 m-4 font-bold inline-flex'>
                                            <div>4</div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow mr-1">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"clipRule="evenodd"></path></svg>
                                            </div>
                                        </div>
                                        <Image src="/beach2.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                                            style={{ width: '100%', height: '180px' }} className='mx-auto rounded-2xl'/>
                                        <div className="card-button inline-flex">
                                            <div className="card-button mx-7 mt-5">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-bold text-[#674F04] text-lg">บางแสนนน</p>
                                                </div>
                                                <div className="inline-flex">
                                                    <p className="font-bold">5000</p>/Trip
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-5 lg:ml-12 sm:ml-24">
                                                <svg className="text-gray w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-5">
                                <Link href={"/explore/trip"}>
                                    <button className="border-[#674F04] border-solid border-2 hover:bg-[#674F04] hover:text-white text-black font-bold py-2 px-4 rounded-full">See all</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="section my-20">
                        <div className="grid grid-cols-2">
                            <div className="col bg-[#D3BD9A] rounded-l-2xl content-center">
                                <div className="text-center">
                                    <div className="text-2xl font-semibold">Find Your Destination</div>
                                    <div className="px-16 mt-3">Find what you're interested in Places on the map with us. So that you has a purpose With color and fun!</div>
                                    <div className="text-center mt-5">
                                        <Link href={"/explore/location"}>
                                            <button className="border-[#674F04] border-solid border-2 hover:bg-[#674F04] hover:text-white text-black font-bold py-2 px-4 rounded-full">Find</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="bg-[#D3BD9A] rounded-2xl">
                                    <Image src="/map1.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                                        style={{ width: '100%', height: '330px' }} className='mx-auto rounded-r-2xl'/>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="section my-20">
                        <div className="grid grid-cols-2">
                            <div className="col">
                                <div className="p-10">
                                    <Image src="/map2.png" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                                        style={{ width: '100%', height: 'auto' }} className='mx-auto rounded-2xl'/>
                                </div>
                            </div>
                            <div className="col content-center">
                                <div className="text-center items-center">
                                    <div className="text-2xl font-semibold">Keep Your Memory</div>
                                    <div className="px-16 mt-3">Let these memories be your travel companions, Even after the journey's end. Tuck them away, a private world to revisit, Whenever your heart desires to wander again.</div>
                                    <div className="text-center mt-5">
                                        <Link href={"/journey"}>
                                            <button className="border-[#674F04] border-solid border-2 hover:bg-[#674F04] hover:text-white text-black font-bold py-2 px-4 rounded-full">Find</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}