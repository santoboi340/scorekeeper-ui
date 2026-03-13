'use client'

import { DesktopMenu } from './DesktopMenu/DesktopMenu'
import { MobileMenu } from './MobileMenu/MobileMenu'
import { Logo } from '../Logo'

const Navbar = () => (
    <>
        {/* Desktop */}
        <div className="hidden md:block">
            <DesktopMenu />
        </div>

        {/* Mobile */}
        <nav className="sticky top-0 z-50 bg-white md:hidden">
            <div className="flex justify-between items-center px-3 pt-3 pb-6">
                <Logo href="/" imageUrl="/Logos/Scorepal1.png" />
                <MobileMenu />
            </div>
        </nav>
    </>
)

export default Navbar
