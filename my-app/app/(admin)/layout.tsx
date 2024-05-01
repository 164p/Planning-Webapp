import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
  });

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MantineProvider theme={theme}>
            <div className='flex flex-col min-h-screen'>
            <div className='flex-none z-50'>
                <Navbar />
            </div>
            <div className='main grow bg-first-color text-[#674F04] z-20 relative'>
                {children}
            </div>
            <div className='flex-none'>
                <Footer />
            </div>
        </div>
        </MantineProvider>

    )
}