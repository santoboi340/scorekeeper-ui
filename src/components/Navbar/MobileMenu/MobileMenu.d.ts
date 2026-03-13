import type { User } from '../../types/user.d'

type MobileMenuLink = {
    label: string
    href: string
    onClick?: () => void
}

type MobileMenuProps = {
    user?: User
    brandName?: string
    brandHref?: string
    links?: MobileMenuLink[]
    className?: string
    iconClassName?: string
    menuClassName?: string
}
export { MobileMenuProps, MobileMenuLink }
