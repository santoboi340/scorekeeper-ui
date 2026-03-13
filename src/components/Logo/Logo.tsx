'use client'

import Link from 'next/link'
import type { LogoProps } from './Logo.d'

const Logo = ({ imageUrl, alt = 'Logo', href = '/', className = '' }: LogoProps) => {
    const img = imageUrl
        ? <img src={imageUrl} alt={alt} className={`w-30 md:w-37.5 h-auto ${className}`} />
        : null

    return href ? <Link href={href}>{img}</Link> : img
}

export { Logo }
