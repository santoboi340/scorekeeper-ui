import Image from 'next/image'
import { UserProfile } from '../../types/user'

interface ProfileViewProps {
    profile: UserProfile
    onEdit?: () => void
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-cream p-4 rounded-lg">
        <h3 className="text-xs sm:text-sm font-semibold text-secondary-green mb-1 uppercase tracking-wide">
            {label}
        </h3>
        <p className="text-lg sm:text-xl font-bold text-primary-green capitalize">
            {value}
        </p>
    </div>
)

export default function ProfileView({ profile, onEdit }: ProfileViewProps) {
    const stats = [
        { label: 'Skill Level', value: profile.skillLevel },
        profile.playStyle && { label: 'Play Style', value: profile.playStyle },
        profile.yearsPlaying !== undefined && {
            label: 'Years Playing',
            value: `${profile.yearsPlaying} ${profile.yearsPlaying === 1 ? 'year' : 'years'}`,
        },
        profile.preferredHand && { label: 'Preferred Hand', value: profile.preferredHand },
        profile.matchesPlayed !== undefined && { label: 'Matches Played', value: `${profile.matchesPlayed}` },
        profile.winRate !== undefined && { label: 'Win Rate', value: `${profile.winRate}%` },
        profile.currentRating !== undefined && { label: 'Current Rating', value: `${profile.currentRating}` },
        profile.dupr !== undefined && { label: 'DUPR', value: `${profile.dupr}` },
    ].filter(Boolean) as { label: string; value: string }[]

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-primary-green p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cream flex items-center justify-center overflow-hidden shrink-0 border-4 border-pickleball-yellow">
                        {profile.avatar ? (
                            <Image
                                src={profile.avatar}
                                alt={profile.displayName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span className="text-3xl sm:text-4xl text-primary-green font-bold">
                                {profile.displayName?.charAt(0).toUpperCase() ??
                                    '?'}
                            </span>
                        )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-cream mb-1">
                            {profile.displayName}
                        </h1>
                        {profile.location && (
                            <p className="text-cream/80 text-sm sm:text-base">{profile.location}</p>
                        )}
                    </div>
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="w-full sm:w-auto px-6 py-2 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold transition-colors font-semibold shadow-md"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
                {profile.bio && (
                    <div className="mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-primary-green mb-2">
                            About
                        </h2>
                        <p className="text-secondary-green leading-relaxed">
                            {profile.bio}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </div>
    )
}
