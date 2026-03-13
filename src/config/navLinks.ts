import type { User } from '../context/AuthContext.d'

export type NavLink = {
    label: string
    href: string
    protected?: boolean
    onClick?: () => void
}

export const getNavLinks = (user: User | null): NavLink[] => [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/' },
    { label: 'About', href: '/' },
    { label: 'Contact', href: '/' },
    ...(user
        ? [
              { label: 'Api Dashboard', href: '/api-dashboard', protected: true },
              { label: 'Profile', href: `/profile/${user.uuid}`, protected: true },
          ]
        : []),
]