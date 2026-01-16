'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { MobileView } from './Views/MobileView'
import { DesktopView } from './Views/DesktopView'

const Navbar = () => {
    const isMobile = useIsMobile()
    return isMobile ? <MobileView /> : <DesktopView />
}

export default Navbar
