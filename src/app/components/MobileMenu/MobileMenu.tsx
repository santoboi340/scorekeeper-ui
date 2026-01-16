'use client'

import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'
import { type MobileMenuLink, MobileMenuProps } from './MobileMenu.d'

import Link from 'next/link'
const defaultLinks: MobileMenuLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/' },
    { label: 'About', href: '/' },
    { label: 'Contact', href: '/' },
    { label: 'Login', href: '/login' },
]

const MobileMenu = ({
    user,
    links = defaultLinks,
    className = '',
    iconClassName = '',
}: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const handleLinkClick = (link: MobileMenuLink) => {
        if (link.onClick) {
            link.onClick()
        }
        setIsOpen(false)
    }

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={toggleMenu}
                className={`text-secondary-green ${iconClassName}`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <IoMdClose className="text-3xl" />
                ) : (
                    <RxHamburgerMenu className="text-3xl" />
                )}
            </button>
            <div className={isOpen ? styles.openMenu : styles.closeMenu}>
                <nav className={styles.menuContent}>
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={() => handleLinkClick(link)}
                            className={styles.menuLink}
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

const styles = {
    menuLink: `block text-cream hover:text-pickleball-yellow hover:bg-secondary-green px-4 py-3 rounded-md text-lg font-medium transition-colors`,
    menuContent: `flex flex-col space-y-1 p-4 items-center justify-center`,
    openMenu: `fixed right-0 bottom-0 transform-gpu translate-y ease-out duration-400 w-full h-50vh  bg-primary-green/95 backdrop-blur-sm shadow-lg `,
    closeMenu: `fixed right-0 -bottom-2000 transform-gpu translate-y ease-in duration-500  w-full h-50vh  bg-primary-green/95 backdrop-blur-sm shadow-lg `,
}
