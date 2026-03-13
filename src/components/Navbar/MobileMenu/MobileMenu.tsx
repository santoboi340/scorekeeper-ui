'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'
import Link from 'next/link'
import { useAuth } from 'root/context/AuthContext'
import { getNavLinks, getAuthLink, type NavLink } from 'root/config/navLinks'

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [prevPathname, setPrevPathname] = useState<string | null>(null)
    const pathname = usePathname()
    const { user, isAuthenticated, logout } = useAuth()

    const links = [...getNavLinks(user), getAuthLink(isAuthenticated, logout)]

    // Close on route change (setState-during-render pattern)
    if (pathname !== prevPathname) {
        setPrevPathname(pathname)
        if (isOpen) setIsOpen(false)
    }

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    const handleClick = (link: NavLink) => {
        link.onClick?.()
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-secondary-green"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                {isOpen ? <IoMdClose className="text-3xl" /> : <RxHamburgerMenu className="text-3xl" />}
            </button>

            <div className={`fixed inset-x-0 bottom-0 h-[50vh] bg-primary-green/95 backdrop-blur-sm shadow-lg transition-transform duration-400 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <nav className="flex flex-col space-y-1 p-4 items-center justify-center">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => handleClick(link)}
                            className="block text-cream hover:text-pickleball-yellow hover:bg-secondary-green px-4 py-3 rounded-md text-lg font-medium transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export { MobileMenu }
