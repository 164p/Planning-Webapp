import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './assets/css/globals.css'

const myFont = localFont({
  src: './lib/font/Mitr/Mitr-Light.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <div className='flex flex-col min-h-screen'>
          <div className='main grow bg-first-color'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
