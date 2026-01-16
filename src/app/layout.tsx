import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Providers } from './providers'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'ScorePal - Your Ultimate Scorekeeping Companion',
    description:
        'Your Sports, Your Community - Connect with fellow athletes, track your games, and build lasting friendships through the sports you love.',
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
