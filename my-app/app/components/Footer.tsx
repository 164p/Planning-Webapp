import Link from "next/link"
export default function Footer(){
    return (
        <footer>
            <div className="bg-[#4E3C05] h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-3 bottom-0  hidden sm:flex">
                <div className="p-3 flex flex justify-between items-center h-full w-full px-10 2xl:px-16">
                    <p className="text-[#D3BD9A] font-bold text-3xl pb-3">PLANTIEW</p>
                    <ul className='flex'>
                        <li className="text-[#D3BD9A] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>Home</Link>
                        </li>
                        <li className="text-[#D3BD9A] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>About us</Link>
                        </li>
                        <li className="text-[#D3BD9A] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>Contact us</Link>
                        </li>
                        <li className="text-[#D3BD9A] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>Help</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}