import type { User } from '../../../context/AuthContext.d'

type DesktopMenuLink = {
    label: string
    href: string
    onClick?: () => void
    protected?: boolean
}

type DesktopMenuProps = {
    user?: User
    brandName?: string
    brandHref?: string
    links?: DesktopMenuLink[]
    className?: string
    linkClassName?: string
    ctaButton?: {
        label: string
        href: string
        onClick?: () => void
    }
}

export { DesktopMenuProps, DesktopMenuLink }
