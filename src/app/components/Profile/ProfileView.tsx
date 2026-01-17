// components/profile/ProfileView.tsx

import { UserProfile } from '../../types/user'

interface ProfileViewProps {
    profile: UserProfile
    onEdit: () => void
}

export default function ProfileView({ profile, onEdit }: ProfileViewProps) {
    const token = sessionStorage.getItem('access_token')
    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log(payload)
    console.log('The Above Console log is located in ProfileView.tsx')
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-primary-green p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cream flex items-center justify-center overflow-hidden shrink-0 border-4 border-pickleball-yellow">
                        {profile.avatar ? (
                            <img
                                src={profile.avatar}
                                alt={profile.displayName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-3xl sm:text-4xl text-primary-green font-bold">
                                {profile.displayName.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-cream mb-1">
                            {profile.displayName}
                        </h1>
                        {profile.location &&
                            profile.privacy.showLocation !== 'private' && (
                                <p className="text-cream/80 text-sm sm:text-base">
                                    {profile.location}
                                </p>
                            )}
                    </div>
                    <button
                        onClick={onEdit}
                        className="w-full sm:w-auto px-6 py-2 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold transition-colors font-semibold shadow-md"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-4 sm:p-6 md:p-8">
                {/* Bio */}
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

                {/* Pickleball Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-cream p-4 rounded-lg">
                        <h3 className="text-xs sm:text-sm font-semibold text-secondary-green mb-1 uppercase tracking-wide">
                            Skill Level
                        </h3>
                        <p className="text-lg sm:text-xl font-bold text-primary-green capitalize">
                            {profile.skillLevel}
                        </p>
                    </div>

                    {profile.playStyle && (
                        <div className="bg-cream p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-semibold text-secondary-green mb-1 uppercase tracking-wide">
                                Play Style
                            </h3>
                            <p className="text-lg sm:text-xl font-bold text-primary-green capitalize">
                                {profile.playStyle}
                            </p>
                        </div>
                    )}

                    {profile.yearsPlaying !== undefined && (
                        <div className="bg-cream p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-semibold text-secondary-green mb-1 uppercase tracking-wide">
                                Years Playing
                            </h3>
                            <p className="text-lg sm:text-xl font-bold text-primary-green">
                                {profile.yearsPlaying}{' '}
                                {profile.yearsPlaying === 1 ? 'year' : 'years'}
                            </p>
                        </div>
                    )}

                    {profile.preferredHand && (
                        <div className="bg-cream p-4 rounded-lg">
                            <h3 className="text-xs sm:text-sm font-semibold text-secondary-green mb-1 uppercase tracking-wide">
                                Preferred Hand
                            </h3>
                            <p className="text-lg sm:text-xl font-bold text-primary-green capitalize">
                                {profile.preferredHand}
                            </p>
                        </div>
                    )}
                </div>

                {/* Stats (if visible) */}
                {profile.privacy.showStats !== 'private' && (
                    <div className="border-t-2 border-cream pt-6">
                        <h2 className="text-lg sm:text-xl font-bold text-primary-green mb-4">
                            Stats
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-teal/10 rounded-lg">
                                <p className="text-3xl sm:text-4xl font-bold text-teal mb-1">
                                    {profile.matchesPlayed}
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green font-semibold uppercase tracking-wide">
                                    Matches Played
                                </p>
                            </div>

                            {profile.winRate !== undefined && (
                                <div className="text-center p-4 bg-gold/10 rounded-lg">
                                    <p className="text-3xl sm:text-4xl font-bold text-gold mb-1">
                                        {(profile.winRate * 100).toFixed(1)}%
                                    </p>
                                    <p className="text-xs sm:text-sm text-secondary-green font-semibold uppercase tracking-wide">
                                        Win Rate
                                    </p>
                                </div>
                            )}

                            {profile.currentRating !== undefined && (
                                <div className="text-center p-4 bg-burnt-orange/10 rounded-lg">
                                    <p className="text-3xl sm:text-4xl font-bold text-burnt-orange mb-1">
                                        {profile.currentRating}
                                    </p>
                                    <p className="text-xs sm:text-sm text-secondary-green font-semibold uppercase tracking-wide">
                                        Rating
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
