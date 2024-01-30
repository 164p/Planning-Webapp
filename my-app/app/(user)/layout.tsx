import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex-none'>
                <Navbar />
            </div>
            <div className='main grow bg-first-color text-[#674F04]'>
                {children}
            </div>
            <div className='flex-none'>
                <Footer />
            </div>
        </div>
    )
}