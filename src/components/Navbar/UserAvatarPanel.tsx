'use client'

import Link from 'next/link'
import type { User } from 'root/context/AuthContext.d'
import { useMyProfile } from 'root/hooks/userProfile'

interface UserAvatarPanelProps {
    user: User
    onLogout: () => void
    compact?: boolean
}

const UserAvatarPanel = ({ user, onLogout, compact = false }: UserAvatarPanelProps) => {
    const { data: profile } = useMyProfile()
    const initial = (user.firstname ?? user.email).charAt(0).toUpperCase()
    const profileHref = profile?.userName ? `/profile/${profile.userName}` : '#'
    const settingsHref = profile?.userName ? `/profile/${profile.userName}/settings` : '#'

    return (
        <div className={`flex ${compact ? 'flex-row items-center gap-3' : 'flex-col items-center gap-1'}`}>
            <Link href={profileHref} className="group">
                <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center border-2 border-pickleball-yellow group-hover:border-gold transition-colors">
                    <span className="text-sm font-bold text-cream">{initial}</span>
                </div>
            </Link>

            <span className={`text-secondary-green ${compact ? 'text-sm' : 'text-xs'} truncate max-w-[140px]`}>
                {user.email}
            </span>

            <div className={`flex ${compact ? 'flex-row' : 'flex-row'} gap-2`}>
                <Link href={settingsHref} className="text-xs text-secondary-green hover:text-teal transition-colors font-medium">
                    Settings
                </Link>
                <button onClick={onLogout} className="text-xs text-secondary-green hover:text-red-500 transition-colors font-medium">
                    Logout
                </button>
            </div>
        </div>
    )
}

export { UserAvatarPanel }
