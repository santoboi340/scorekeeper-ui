import { useState } from 'react'
import type { UserSettings, SettingsUpdatePayload } from '../../types/settings'

interface PrivacySettingsProps {
    settings: UserSettings
    onSave: (updates: SettingsUpdatePayload) => Promise<void>
    isSaving: boolean
}

type PrivacyKey = keyof UserSettings['privacy']

const visibilityOptions = [
    { value: 'PUBLIC', label: 'Everyone' },
    { value: 'FRIENDS', label: 'Friends Only' },
    { value: 'PRIVATE', label: 'Only Me' },
]

const selectFields: { key: PrivacyKey; label: string; desc: string }[] = [
    { key: 'profileVisibility', label: 'Profile Visibility', desc: 'Control who can see your profile page' },
    { key: 'showLocation', label: 'Location', desc: 'Who can see your city/state' },
    { key: 'showStats', label: 'Stats & Ratings', desc: 'Who can see your win rate, rating, and match count' },
    { key: 'showMatchHistory', label: 'Match History', desc: 'Who can see your past matches and opponents' },
]

const toggleFields: { key: PrivacyKey; label: string; desc: string }[] = [
    { key: 'allowMatchRequests', label: 'Allow Match Requests', desc: 'Let others invite you to play' },
    { key: 'showOnlineStatus', label: 'Show Online Status', desc: "Let others see when you're active" },
    { key: 'allowFriendRequests', label: 'Allow Friend Requests', desc: 'Let others send you friend requests' },
]

const selectCx = 'w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base'
const switchCx = "w-11 h-6 bg-neutral/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"

export default function PrivacySettings({ settings, onSave, isSaving }: PrivacySettingsProps) {
    const [privacy, setPrivacy] = useState(settings.privacy)
    const [hasChanges, setHasChanges] = useState(false)

    const handleChange = (field: PrivacyKey, value: string | boolean) => {
        setPrivacy((prev) => ({ ...prev, [field]: value }))
        setHasChanges(true)
    }

    const handleSave = async () => { await onSave({ privacy }); setHasChanges(false) }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">Privacy Settings</h2>

            <div className="space-y-4 sm:space-y-6">
                {selectFields.map(({ key, label, desc }) => (
                    <div key={key} className="bg-cream p-4 sm:p-5 rounded-lg">
                        <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">{label}</label>
                        <p className="text-xs sm:text-sm text-secondary-green mb-3">{desc}</p>
                        <select value={privacy[key] as string} onChange={(e) => handleChange(key, e.target.value)} className={selectCx}>
                            {visibilityOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                        </select>
                    </div>
                ))}

                <div className="border-t-2 border-cream pt-4 sm:pt-6 space-y-4">
                    {toggleFields.map(({ key, label, desc }) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">{label}</p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-1">{desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                                <input type="checkbox" checked={privacy[key] as boolean} onChange={(e) => handleChange(key, e.target.checked)} className="sr-only peer" />
                                <div className={switchCx}></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {hasChanges && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-cream">
                    <button onClick={handleSave} disabled={isSaving}
                        className="w-full sm:w-auto px-6 py-3 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base shadow-md">
                        {isSaving ? 'Saving...' : 'Save Privacy Settings'}
                    </button>
                </div>
            )}
        </div>
    )
}
