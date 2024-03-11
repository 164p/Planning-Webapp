import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar, FaStarHalf } from "react-icons/fa"
import { PiDotsThreeCircleFill } from "react-icons/pi";

export default async function LocationCard({place_id}:any){
    
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.NEXT_MAPS_API_KEY}`)
    const datas:any = await res.json()
    const photo_ref = datas.result.photos[0].photo_reference
    const url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo_ref}&maxwidth=600&maxheight=400&key=${process.env.NEXT_MAPS_API_KEY}`;

    return(
        <main className="overflow-hidden rounded-lg shadow-lg text-[#674F04] bg-[#F5F5F5]">
            <Image src={url} alt="logo" width={0} height={0} sizes="120vw" priority={true}
                    style={{ width: '100%', height: 'auto' }} className='img block rounded-2xl '/>

            <div className="flex items-center justify-between leading-tight">
                <p className="text-xl font-bold text-[#674F04] pl-2 md:pl-5 py-3">{datas.result.name}</p>
                <div dir="rtl">
                    <div className="justify-items-end z-10 top-0 right-0 pr-5">
                        < PiDotsThreeCircleFill className="text-2xl"/>
                    </div>
                </div> 
            </div>
            <div className="flex pl-2 md:pl-5 items-center ">
                <FaStar className="mx-1"/>
                <FaStar className="mx-1"/>
                <FaStar className="mx-1"/>
                <FaStar className="mx-1"/>
                <FaStarHalf className="mx-1"/>
            </div>

            <div className="flex justify-between items-center pl-2 md:pl-5 py-4">
                <FaLocationDot className="text-red-500 text-2xl"/>
                <p className="text-md px-3 break-words">{datas.result.formatted_address}</p>
            </div>
    
                <div className="flex pl-5 pt-4 pb-8">
                    <p className="text-xs me-2 px-3 py-2 rounded-full bg-[#C3BAAA] text-black justify-center items-center">tagggggggggggggggggggg</p>
                    <p className="text-xs me-2 px-3 py-2 rounded-full bg-[#C3BAAA] text-black justify-center items-center">tag</p>
                    <p className="text-xs me-2 px-3 py-2 rounded-full bg-[#C3BAAA] text-black justify-center items-center">tag</p>
                </div>
            
        </main>
    )
}