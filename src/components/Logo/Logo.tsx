'use client'

import Link from 'next/link'
import { LogoProps } from './Logo'
import { useIsMobile } from 'root/hooks/useIsMobileView'

const Logo = ({ imageUrl, alt = 'Logo', href = '/' }: LogoProps) => {
    const isMobile = useIsMobile()

    const logoContent = (
        <div className="flex items-center">
            {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageUrl}
                    alt={alt}
                    width={isMobile ? 120 : 150}
                    height={isMobile ? 80 : 100}
                />
            ) : null}
        </div>
    )

    if (href) {
        return (
            <Link href={href} className="">
                {logoContent}
            </Link>
        )
    }

    return logoContent
}

export { Logo }
