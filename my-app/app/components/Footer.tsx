import Link from "next/link"
export default function Footer(){
    return (
        <footer>
            <div className="bg-[#D3BD9A] w-full p-3">
                <div className="p-3 flex justify-between items-center h-full w-full px-10 mx-auto sm:items-center sm:justify-between">
                    <p className="text-[#674F04] font-bold text-3xl pb-3">PLANTIEW</p>
                    <ul className='flex flex-wrap items-center'>
                        <li className="text-[#674F04] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>Home</Link>
                        </li>
                        <li className="text-[#674F04] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>About us</Link>
                        </li>
                        <li className="text-[#674F04] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>Contact us</Link>
                        </li>
                        <li className="text-[#674F04] text-md pb-2 font-semibold hover:text-white cursor-pointer">
                            <Link href='/' className='mx-10'>Help</Link>
                        </li>
                    </ul>
                </div> 

            </div>
        </footer>
    )
}