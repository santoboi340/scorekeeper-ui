'use client'

import Link from 'next/link'
import { Logo } from '../../Logo'
import { useAuth } from 'root/context/AuthContext'
import { getNavLinks } from 'root/config/navLinks'
import { UserAvatarPanel } from '../UserAvatarPanel'

const ctaStyle = 'bg-pickleball-yellow text-primary-green px-6 py-2 rounded-lg font-semibold hover:bg-gold transition-colors shadow-sm'

const DesktopMenu = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const links = getNavLinks(user)

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

                {isAuthenticated && user ? (
                    <UserAvatarPanel user={user} onLogout={logout} />
                ) : (
                    <Link href="/login" className={ctaStyle}>Login</Link>
                )}
            </div>
        </nav>
    )
}

export { DesktopMenu }
