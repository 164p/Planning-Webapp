import DatePickers from "@/app/components/DatePickers"
import { url } from "inspector"
import Image from "next/image"
export default function page(){

    const images = '/beach1.jpg'
    return (
        <div className="container pt-28 pb-12">
            <div className="header-section mb-8">
                <h1 className="text-center font-bold text-2xl">My Planning</h1>
                <p className="text-center">Select your plan for edit</p>
            </div>
            <div className="section mb-10">
                <DatePickers />
            </div>
            <div className="section">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card rounded-md bg-[#D3BD9A] flex overflow-hidden items-center">
                        <div className="card-col relative overflow-fidden w-40 h-28 " 
                            style={{
                                backgroundImage: `url(/beach1.jpg)`,
                                backgroundPosition: 'left center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            {/* <Image src="/beach1.jpg" alt="logo" width={0} height={0} sizes="120vw" priority={true}
                                style={{ width: 'auto', height: '100%' }} className='mx-auto h-full'/> */}
                            <div className="line h-full w-5 absolute bg-gradient-to-l from-[#D3BD9A] bottom-0 right-0 ">
                            </div>
                        </div>
                        <div className="card-col grow p-5">
                            <p className="text-xl font-bold">Trip Name</p>
                            <p className="">Budget : 10000</p>
                        </div>
                    </div>
                    <div className="card p-5 rounded-md bg-[#D3BD9A]">

                    </div>
                    <div className="card p-5 rounded-md bg-[#D3BD9A]">

                    </div>
                    <div className="card p-5 rounded-md bg-[#D3BD9A]">

                    </div>
                </div>
            </div>
        </div>
    )
}