import { useState } from 'react'
import { UserProfile, UserProfileUpdate } from '../../types/user'

interface ProfileEditProps {
    profile: UserProfile
    onSave: (updates: UserProfileUpdate) => Promise<void>
    onCancel: () => void
}

const inputCx = 'w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg text-secondary-green focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base'
const labelCx = 'block text-sm sm:text-base font-semibold text-primary-green mb-2'

const visibilityOpts = [
    { value: 'public', label: 'Everyone' }, { value: 'friends', label: 'Friends Only' }, { value: 'private', label: 'Only Me' },
]

const selectFields: { key: string; label: string; required?: boolean; options: { value: string; label: string }[] }[] = [
    { key: 'skillLevel', label: 'Skill Level', required: true, options: [
        { value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }, { value: 'pro', label: 'Pro' },
    ]},
    { key: 'playStyle', label: 'Play Style', options: [
        { value: '', label: 'Not specified' }, { value: 'aggressive', label: 'Aggressive' },
        { value: 'defensive', label: 'Defensive' }, { value: 'balanced', label: 'Balanced' }, { value: 'strategic', label: 'Strategic' },
    ]},
    { key: 'preferredHand', label: 'Preferred Hand', options: [
        { value: '', label: 'Not specified' }, { value: 'right', label: 'Right' },
        { value: 'left', label: 'Left' }, { value: 'ambidextrous', label: 'Ambidextrous' },
    ]},
]

const privacySelects: { key: keyof UserProfile['privacy']; label: string }[] = [
    { key: 'showLocation', label: 'Who can see your location?' },
    { key: 'showStats', label: 'Who can see your stats?' },
]

export default function ProfileEdit({ profile, onSave, onCancel }: ProfileEditProps) {
    const [formData, setFormData] = useState<UserProfileUpdate>({
        displayName: profile.displayName, bio: profile.bio || '', location: profile.location || '',
        skillLevel: profile.skillLevel || 'advanced', playStyle: profile.playStyle || 'aggressive',
        yearsPlaying: profile.yearsPlaying, preferredHand: profile.preferredHand,
        privacy: profile.privacy ?? { showLocation: 'public', showStats: 'public', showMatchHistory: 'public', allowMatchRequests: true },
    })
    const [isSaving, setIsSaving] = useState(false)

    const update = (field: string, value: string | number | undefined) => setFormData((prev) => ({ ...prev, [field]: value }))
    const updatePrivacy = (field: string, value: string | boolean) =>
        setFormData((prev) => ({ ...prev, privacy: { ...prev.privacy!, [field]: value } }))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try { await onSave(formData) } finally { setIsSaving(false) }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">Edit Profile</h1>

            {/* Display Name */}
            <div className="mb-4">
                <label className={labelCx}>Display Name *</label>
                <input type="text" required value={formData.displayName} onChange={(e) => update('displayName', e.target.value)} className={inputCx} />
            </div>

            {/* Bio */}
            <div className="mb-4">
                <label className={labelCx}>Bio</label>
                <textarea value={formData.bio} onChange={(e) => update('bio', e.target.value)}
                    rows={4} maxLength={500} placeholder="Tell others about yourself..." className={inputCx} />
                <p className="text-xs sm:text-sm text-secondary-green mt-1.5">{formData.bio?.length || 0}/500 characters</p>
            </div>

            {/* Location */}
            <div className="mb-4">
                <label className={labelCx}>Location</label>
                <input type="text" value={formData.location} onChange={(e) => update('location', e.target.value)} placeholder="City, State" className={inputCx} />
                <p className="text-xs sm:text-sm text-secondary-green mt-1.5">Keep it general (no street addresses)</p>
            </div>

            {/* Select Fields */}
            {selectFields.map(({ key, label, required, options }) => (
                <div key={key} className="mb-4">
                    <label className={labelCx}>{label}{required && ' *'}</label>
                    <select required={required} value={(formData as Record<string, unknown>)[key] as string || ''} onChange={(e) => update(key, e.target.value || undefined)} className={inputCx}>
                        {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                    </select>
                </div>
            ))}

            {/* Years Playing */}
            <div className="mb-6">
                <label className={labelCx}>Years Playing</label>
                <input type="number" min="0" max="50" value={formData.yearsPlaying || ''}
                    onChange={(e) => update('yearsPlaying', e.target.value ? parseInt(e.target.value) : undefined)} className={inputCx} />
            </div>

            {/* Privacy */}
            <div className="border-t pt-6 mb-6">
                <h2 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4">Privacy Settings</h2>
                <div className="space-y-4">
                    {privacySelects.map(({ key, label }) => (
                        <div key={key}>
                            <label className={labelCx}>{label}</label>
                            <select value={formData.privacy?.[key] as string || profile.privacy?.[key] as string || 'public'}
                                onChange={(e) => updatePrivacy(key, e.target.value)} className={inputCx}>
                                {visibilityOpts.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                            </select>
                        </div>
                    ))}

                    <div className="flex items-center">
                        <input type="checkbox" id="allowMatchRequests"
                            checked={formData.privacy?.allowMatchRequests ?? profile.privacy?.allowMatchRequests ?? true}
                            onChange={(e) => updatePrivacy('allowMatchRequests', e.target.checked)}
                            className="w-4 h-4 mr-2 text-teal rounded focus:ring-teal" />
                        <label htmlFor="allowMatchRequests" className="text-sm sm:text-base text-secondary-green">Allow others to send me match requests</label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button type="submit" disabled={isSaving}
                    className="flex-1 px-4 py-3 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base shadow-md">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={onCancel} disabled={isSaving}
                    className="flex-1 px-4 py-3 bg-white text-secondary-green border-2 border-neutral rounded-lg hover:bg-neutral/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base">
                    Cancel
                </button>
            </div>
        </form>
    )
}
