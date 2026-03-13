'use client'

import Link from 'next/link'
import { Logo } from '../../Logo'
import { useAuth } from 'root/context/AuthContext'
import { getNavLinks, getAuthLink } from 'root/config/navLinks'

const DesktopMenu = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const links = getNavLinks(user)
    const authLink = getAuthLink(isAuthenticated, logout)

    return (
        <nav className="sticky top-0 z-50 bg-cream border-b border-neutral shadow-sm px-4 pt-4 pb-6">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <Logo href="/" imageUrl="/Logos/Scorepal1.png" />

                <div className="hidden md:flex items-center space-x-8">
                    {links.map((link) => (
                        <Link key={link.label} href={link.href} className="text-secondary-green hover:text-teal font-medium transition-colors duration-200">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {authLink.onClick ? (
                    <div className="flex flex-col items-center space-x-4 text-black">
                        <span>Hello {user?.email}</span>
                        <button className={ctaStyle} onClick={authLink.onClick}>{authLink.label}</button>
                    </div>
                ) : (
                    <Link href={authLink.href} className={ctaStyle}>{authLink.label}</Link>
                )}
            </div>
        </nav>
    )
}

const ctaStyle = 'bg-pickleball-yellow text-primary-green px-6 py-2 rounded-lg font-semibold hover:bg-gold transition-colors shadow-sm'

export { DesktopMenu }
