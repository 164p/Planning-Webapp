import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa"
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";


export default function TripCard() {
    const tripcard = [
        { name: "บางแสนบางใจ", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", tag: ["sss", "ddd", "cccccc",'dsadas'] },
        { name: "ชะอ้ำ", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", tag: ["sss", "ddd", "cccccc",'dsadas'] },
        { name: "หัวหิว", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", tag: ["sss", "ddd", "cccccc",'dsadas'] },
        { name: "ภูเก็ทมั้ย", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", tag: ["sss", "ddd", "cccccc",'dsadas'] },
        { name: "เชียงรายอะ", img: "/mockupimg.jpg",rating: [<FaStar/>, <FaStar/>, <FaStar/>, <FaStar/>], cost: "10000", user: "AAA", tag: ["sss", "ddd", "cccccc",'dsadas'] },
      ];
    return(
        <main className="card grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 rounded-lg shadow-lg text-[#674F04] pb-5">
            {tripcard.map((tripcard) => (
                <div className="bg-[#fafafa] rounded-2xl shadow-lg">
                    <Image src={tripcard.img} alt="logo" width={0} height={0} sizes="120vw" priority={true}
                    style={{ width: '100%', height: 'auto' }} className='img block rounded-2xl '/>
                    <div className="card-top flex items-center justify-between px-5">
                        <p className="text-xl font-bold text-[#674F04] py-3">
                            {tripcard.name}
                        </p>
                        <div dir="rtl">
                            < PiDotsThreeCircleFill className="text-2xl"/>
                        </div> 
                    </div>
                    <div className="flex items-center md:pl-5">
                        {tripcard.rating}
                    </div>
                    <p className="pl-2 md:pl-5 pt-4">Cost : {tripcard.cost}</p>
                    <div className="flex pl-2 md:pl-5 py-4">
                        <FaUserCircle className='text-2xl' />
                        <p className="pl-3">{tripcard.user}</p>
                    </div>
                    <div className="tag-section flex justify-center items-center pb-10">
                            {tripcard.tag.map((tag) => (
                                <div>
                                        <p className="tag text-lg me-2 px-3 py-2 rounded-full bg-[#C3BAAA] text-black">{tag}</p>
                                </div>
                            ))}
                    </div>
                </div>

            ))}
        </main>
    );
}