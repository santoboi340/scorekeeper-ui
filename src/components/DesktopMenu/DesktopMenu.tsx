'use client'

import Link from 'next/link'
import {
    type DesktopMenuLink,
    DesktopMenuProps,
} from 'root/components/DesktopMenu/DesktopMenu.d'
import { Logo } from '../Logo'
import { useAuth } from 'root/context/AuthContext'
import { useRouter } from 'next/navigation'

const DesktopMenu = ({
    className = '',
    linkClassName = '',
}: DesktopMenuProps) => {
    const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const defaultLinks: DesktopMenuLink[] = [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/' },
        { label: 'About', href: '/' },
        { label: 'Contact', href: '/' },
        { label: 'Api Dashboard', href: '/api-dashboard', protected: true },
        {
            label: 'Profile',
            href: `/profile/${user && user.uuid}`,
            protected: true,
        },
    ]

    const handleLinkClick = (link: DesktopMenuLink) => {
        if (link.href) {
            router.push(link.href)
        }
    }

    return (
        <nav className={`${styles.container} ${className}`}>
            <div className={styles.innerContainer}>
                {/* Brand */}
                <Logo href="/" imageUrl="/Logos/Scorepal1.png" />

                {/* Navigation Links */}
                <div className={styles.linksContainer}>
                    {defaultLinks.map((link, index) =>
                        !link.protected || isAuthenticated ? (
                            <Link
                                key={index}
                                href={link.href}
                                className={`${styles.navLink} ${linkClassName}`}
                                onClick={() => handleLinkClick(link)}
                            >
                                {link.label}
                            </Link>
                        ) : null
                    )}
                </div>

                {/* Login / Logout Button */}
                {!isAuthenticated ? (
                    <Link href="/login" className={styles.ctaButton}>
                        Login
                    </Link>
                ) : (
                    <div className={styles.logoutContainer}>
                        <span> Hello {user?.id} </span>
                        <button className={styles.ctaButton} onClick={logout}>
                            Logout
                        </button>{' '}
                    </div>
                )}
            </div>
        </nav>
    )
}

export { DesktopMenu }

const styles = {
    container:
        'sticky top-0 z-50 bg-cream border-b border-neutral shadow-sm h-full px-4 pt-4 pb-6',
    innerContainer:
        ' max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16',
    logoutContainer: 'flex flex-col items-center space-x-4 text-black',
    brand: 'text-2xl font-bold text-primary-green hover:text-teal transition-colors',
    linksContainer: 'hidden md:flex items-center space-x-8',
    navLink:
        'text-secondary-green hover:text-teal font-medium transition-colors duration-200',
    ctaButton:
        'bg-pickleball-yellow text-primary-green px-6 py-2 rounded-lg font-semibold hover:bg-gold transition-colors shadow-sm',
}
