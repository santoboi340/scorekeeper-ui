import { useState } from 'react'
import { UserProfile, UserProfileUpdate } from '../../types/user'
import { useMyProfile } from 'root/hooks/userProfile'
interface ProfileEditProps {
    profile: UserProfile
    onSave: (updates: UserProfileUpdate) => Promise<void>
    onCancel: () => void
}

const inputCx =
    'w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg text-secondary-green focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base'
const labelCx =
    'block text-sm sm:text-base font-semibold text-primary-green mb-2'

const visibilityOpts = [
    { value: 'PUBLIC', label: 'Everyone' },
    { value: 'FRIENDS', label: 'Friends Only' },
    { value: 'PRIVATE', label: 'Only Me' },
]

const selectFields: {
    key: string
    label: string
    required?: boolean
    options: { value: string; label: string }[]
}[] = [
    {
        key: 'skillLevel',
        label: 'Skill Level',
        required: true,
        options: [
            { value: 'BEGINNER', label: 'Beginner' },
            { value: 'INTERMEDIATE', label: 'Intermediate' },
            { value: 'ADVANCED', label: 'Advanced' },
            { value: 'PRO', label: 'Pro' },
        ],
    },
    {
        key: 'playStyle',
        label: 'Play Style',
        options: [
            { value: '', label: 'Not specified' },
            { value: 'AGGRESSIVE', label: 'Aggressive' },
            { value: 'DEFENSIVE', label: 'Defensive' },
            { value: 'BALANCED', label: 'Balanced' },
            { value: 'STRATEGIC', label: 'Strategic' },
        ],
    },
    {
        key: 'preferredHand',
        label: 'Preferred Hand',
        options: [
            { value: '', label: 'Not specified' },
            { value: 'RIGHT', label: 'Right' },
            { value: 'LEFT', label: 'Left' },
            { value: 'AMBIDEXTROUS', label: 'Ambidextrous' },
        ],
    },
]

const privacySelects: { key: 'showLocation' | 'showStats'; label: string }[] = [
    { key: 'showLocation', label: 'Who can see your location?' },
    { key: 'showStats', label: 'Who can see your stats?' },
]

export default function ProfileEdit({
    profile,
    onSave,
    onCancel,
}: ProfileEditProps) {
    const { data } = useMyProfile()
    const [formData, setFormData] = useState<UserProfileUpdate>({
        displayName: data?.displayName ?? profile.displayName,
        avatar: data?.avatar ?? profile.avatar,
        bio: data?.bio ?? profile.bio,
        location: data?.location ?? profile.location,
        skillLevel: data?.skillLevel ?? profile.skillLevel,
        playStyle: data?.playStyle ?? profile.playStyle,
        yearsPlaying: data?.yearsPlaying ?? profile.yearsPlaying,
        preferredHand: data?.preferredHand ?? profile.preferredHand,
        matchesPlayed: data?.matchesPlayed ?? profile.matchesPlayed,
        winRate: data?.winRate ?? profile.winRate,
        currentRating: data?.currentRating ?? profile.currentRating,
        dupr: data?.dupr ?? profile.dupr,
        privacy: data?.privacy ?? profile.privacy ?? undefined,
    })
    const [isSaving, setIsSaving] = useState(false)

    const update = (field: string, value: string | number | undefined) =>
        setFormData((prev) => ({ ...prev, [field]: value }))
    const updatePrivacy = (field: string, value: string | boolean) =>
        setFormData((prev) => ({
            ...prev,
            privacy: { ...prev.privacy!, [field]: value },
        }))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            await onSave(formData)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8"
        >
            <h1 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">
                Edit Profile
            </h1>

            {/* Display Name */}
            <div className="mb-4">
                <label className={labelCx}>Display Name *</label>
                <input
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={(e) => update('displayName', e.target.value)}
                    className={inputCx}
                />
            </div>

            {/* Avatar */}
            <div className="mb-4">
                <label className={labelCx}>Avatar URL</label>
                <input
                    type="url"
                    value={formData.avatar || ''}
                    onChange={(e) => update('avatar', e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className={inputCx}
                />
            </div>

            {/* Bio */}
            <div className="mb-4">
                <label className={labelCx}>Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => update('bio', e.target.value)}
                    rows={4}
                    maxLength={500}
                    placeholder="Tell others about yourself..."
                    className={inputCx}
                />
                <p className="text-xs sm:text-sm text-secondary-green mt-1.5">
                    {formData.bio?.length || 0}/500 characters
                </p>
            </div>

            {/* Location */}
            <div className="mb-4">
                <label className={labelCx}>Location</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => update('location', e.target.value)}
                    placeholder="City, State"
                    className={inputCx}
                />
                <p className="text-xs sm:text-sm text-secondary-green mt-1.5">
                    Keep it general (no street addresses)
                </p>
            </div>

            {/* Select Fields */}
            {selectFields.map(({ key, label, required, options }) => (
                <div key={key} className="mb-4">
                    <label className={labelCx}>
                        {label}
                        {required && ' *'}
                    </label>
                    <select
                        required={required}
                        value={
                            ((formData as Record<string, unknown>)[
                                key
                            ] as string) || ''
                        }
                        onChange={(e) =>
                            update(key, e.target.value || undefined)
                        }
                        className={inputCx}
                    >
                        {options.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* Years Playing */}
            <div className="mb-4">
                <label className={labelCx}>Years Playing</label>
                <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.yearsPlaying || ''}
                    onChange={(e) =>
                        update(
                            'yearsPlaying',
                            e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                        )
                    }
                    className={inputCx}
                />
            </div>

            {/* Matches Played */}
            <div className="mb-4">
                <label className={labelCx}>Matches Played</label>
                <input
                    type="number"
                    min="0"
                    value={formData.matchesPlayed || ''}
                    onChange={(e) =>
                        update(
                            'matchesPlayed',
                            e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                        )
                    }
                    className={inputCx}
                />
            </div>

            {/* Win Rate */}
            <div className="mb-4">
                <label className={labelCx}>Win Rate (%)</label>
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.winRate ?? ''}
                    onChange={(e) =>
                        update(
                            'winRate',
                            e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                        )
                    }
                    className={inputCx}
                />
            </div>

            {/* Current Rating */}
            <div className="mb-4">
                <label className={labelCx}>Current Rating</label>
                <input
                    type="number"
                    min="0"
                    step="1"
                    value={formData.currentRating ?? ''}
                    onChange={(e) =>
                        update(
                            'currentRating',
                            e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                        )
                    }
                    className={inputCx}
                />
            </div>

            {/* DUPR */}
            <div className="mb-6">
                <label className={labelCx}>DUPR Rating</label>
                <input
                    type="number"
                    min="0"
                    max="8"
                    step="0.01"
                    value={formData.dupr ?? 0}
                    onChange={(e) =>
                        update(
                            'dupr',
                            e.target.value ? parseFloat(e.target.value) : 0
                        )
                    }
                    className={inputCx}
                />
            </div>

            {/* Privacy */}
            <div className="border-t pt-6 mb-6">
                <h2 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4">
                    Privacy Settings
                </h2>
                <div className="space-y-4">
                    {privacySelects.map(({ key, label }) => (
                        <div key={key}>
                            <label className={labelCx}>{label}</label>
                            <select
                                value={
                                    (formData.privacy?.[key] as string) ||
                                    ((
                                        profile.privacy as Record<
                                            string,
                                            unknown
                                        > | null
                                    )?.[key] as string) ||
                                    'public'
                                }
                                onChange={(e) =>
                                    updatePrivacy(key, e.target.value)
                                }
                                className={inputCx}
                            >
                                {visibilityOpts.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="allowMatchRequests"
                            checked={
                                formData.privacy?.allowMatchRequests ??
                                profile.privacy?.allowMatchRequests ??
                                true
                            }
                            onChange={(e) =>
                                updatePrivacy(
                                    'allowMatchRequests',
                                    e.target.checked
                                )
                            }
                            className="w-4 h-4 mr-2 text-teal rounded focus:ring-teal"
                        />
                        <label
                            htmlFor="allowMatchRequests"
                            className="text-sm sm:text-base text-secondary-green"
                        >
                            Allow others to send me match requests
                        </label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-3 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base shadow-md"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSaving}
                    className="flex-1 px-4 py-3 bg-white text-secondary-green border-2 border-neutral rounded-lg hover:bg-neutral/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
