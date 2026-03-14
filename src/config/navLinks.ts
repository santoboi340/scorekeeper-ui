import type { User } from '../context/AuthContext.d'

export type NavLink = {
    label: string
    href: string
    protected?: boolean
    onClick?: () => void
}

export const getNavLinks = (user: User | null): NavLink[] => [
    { label: 'Home', href: '/' },
    { label: 'Players', href: '/players' },
    ...(user
        ? [
              // Place Protected Links Here
              /** {
                  label: 'Api Dashboard',
                  href: '/api-dashboard',
                  protected: true,
              },*/
          ]
        : []),
]
