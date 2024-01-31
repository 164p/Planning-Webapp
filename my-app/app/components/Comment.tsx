import Image from "next/image"
import { SlHeart } from "react-icons/sl";

export default function Comment() {
    return(
        <main>
          <div className="comment-container p-6 my-8 mx-9 text-[#E7E0D4] bg-[#835E4F] rounded-[22px]">
            <div className="top m-0 flex items-center justify-between">
              <div className="left flex items-center justify-start">
                <div className="mr-3 w-10 h-10 aspect-w-1 aspect-h-1 rounded-full bg-blue-400 "></div>
                  <p className="text-2xl">asfsfafafa</p>
              </div>
                <div className="flex flex-col">
                  <SlHeart className="m-auto"/>
                  <p className="m-auto">112</p>
                </div>
            </div>
            <div className="border rounded-xl my-4 py-4 px-8">
              <p className="comment text-lg mb-6">Lorem ipsum dolor sit, amet safa agg asgtasg a awe aegsdfgconsectetur adipisicing elit. Ad, mollitia vero quo corporise, error voluptatibus expedita iste odit!</p>
              <Image src="/mockupimg.jpg" alt="logo" width={0} height={0} sizes="100vw" priority={true}
                style={{ width: '60%', height: '100%' }} className='img max-w-sm mx-auto'/>
            </div>
          </div>
        </main>
    )
}