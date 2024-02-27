import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa"
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";


export default function TripCard() {
    const tripcard = [
        { name: "บางแสนบางใจ", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", typetag: "sss", activitytag: "jjjj", provincetag: "ddd"},
        { name: "ชะอ้ำ", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", typetag: "sss", activitytag: "jjjj", provincetag: "ddd"},
        { name: "หัวหิว", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", typetag: "sss", activitytag: "jjjj", provincetag: "ddd"},
        { name: "หัวหิว", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", typetag: "sss", activitytag: "jjjj", provincetag: "ddd"}
      ];
    return(
        <main className="card grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {tripcard.map((tripcard, index) => (
                <div key={index} className="card-top rounded-lg shadow-lg text-[#674F04] bg-[#F5F5F5] pb-5">
                    <Image src={tripcard.img} alt="logo" width={0} height={0} sizes="120vw" priority={true}
                    style={{ width: '100%', height: 'auto' }} className='img block rounded-2xl '/>
                    <div className="card-button mx-7">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-[#674F04] py-3">
                                {tripcard.name}
                            </p>
                            <div dir="rtl">
                                < PiDotsThreeCircleFill className="text-2xl"/>
                            </div> 
                        </div>
                        <div className="flex">
                            {tripcard.rating}
                        </div>
                        <p className="pt-4">Cost : {tripcard.cost}</p>
                        <div className="flex py-4">
                            <FaUserCircle className='text-2xl' />
                            <p className="pl-3">{tripcard.user}</p>
                        </div>
                        <div className="tag-section flex">
                            <p className="tag px-3 py-2 rounded-full bg-[#C3BAAA] text-black mx-2">{tripcard.typetag}</p>
                            <p className="tag px-3 py-2 rounded-full bg-[#C3BAAA] text-black">{tripcard.activitytag}</p>
                            <p className="tag px-3 py-2 rounded-full bg-[#C3BAAA] text-black mx-2">{tripcard.provincetag}</p>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}