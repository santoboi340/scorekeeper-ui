// components/settings/PrivacySettings.tsx

import { useState } from 'react'
import { UserSettings } from '../../types/settings'

interface PrivacySettingsProps {
    settings: UserSettings
    onSave: (updates: any) => Promise<void>
    isSaving: boolean
}

export default function PrivacySettings({
    settings,
    onSave,
    isSaving,
}: PrivacySettingsProps) {
    const [privacy, setPrivacy] = useState(settings.privacy)
    const [hasChanges, setHasChanges] = useState(false)

    const handleChange = (field: keyof typeof privacy, value: any) => {
        setPrivacy({ ...privacy, [field]: value })
        setHasChanges(true)
    }

    const handleSave = async () => {
        await onSave({ privacy })
        setHasChanges(false)
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">
                Privacy Settings
            </h2>

            <div className="space-y-4 sm:space-y-6">
                {/* Profile Visibility */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Profile Visibility
                    </label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">
                        Control who can see your profile page
                    </p>
                    <select
                        value={privacy.profileVisibility}
                        onChange={(e) =>
                            handleChange('profileVisibility', e.target.value)
                        }
                        className="w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base"
                    >
                        <option value="public">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Only Me</option>
                    </select>
                </div>

                {/* Location */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Location
                    </label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">
                        Who can see your city/state
                    </p>
                    <select
                        value={privacy.showLocation}
                        onChange={(e) =>
                            handleChange('showLocation', e.target.value)
                        }
                        className="w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base"
                    >
                        <option value="public">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Only Me</option>
                    </select>
                </div>

                {/* Stats */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Stats & Ratings
                    </label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">
                        Who can see your win rate, rating, and match count
                    </p>
                    <select
                        value={privacy.showStats}
                        onChange={(e) =>
                            handleChange('showStats', e.target.value)
                        }
                        className="w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base"
                    >
                        <option value="public">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Only Me</option>
                    </select>
                </div>

                {/* Match History */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Match History
                    </label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">
                        Who can see your past matches and opponents
                    </p>
                    <select
                        value={privacy.showMatchHistory}
                        onChange={(e) =>
                            handleChange('showMatchHistory', e.target.value)
                        }
                        className="w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base"
                    >
                        <option value="public">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Only Me</option>
                    </select>
                </div>

                {/* Toggles */}
                <div className="border-t-2 border-cream pt-4 sm:pt-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-neutral/30">
                        <div>
                            <p className="font-semibold text-sm sm:text-base text-primary-green">
                                Allow Match Requests
                            </p>
                            <p className="text-xs sm:text-sm text-secondary-green mt-1">
                                Let others invite you to play
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                            <input
                                type="checkbox"
                                checked={privacy.allowMatchRequests}
                                onChange={(e) =>
                                    handleChange(
                                        'allowMatchRequests',
                                        e.target.checked
                                    )
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-neutral/30">
                        <div>
                            <p className="font-semibold text-sm sm:text-base text-primary-green">
                                Show Online Status
                            </p>
                            <p className="text-xs sm:text-sm text-secondary-green mt-1">
                                Let others see when you&apos;re active
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                            <input
                                type="checkbox"
                                checked={privacy.showOnlineStatus}
                                onChange={(e) =>
                                    handleChange(
                                        'showOnlineStatus',
                                        e.target.checked
                                    )
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-neutral/30">
                        <div>
                            <p className="font-semibold text-sm sm:text-base text-primary-green">
                                Allow Friend Requests
                            </p>
                            <p className="text-xs sm:text-sm text-secondary-green mt-1">
                                Let others send you friend requests
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                            <input
                                type="checkbox"
                                checked={privacy.allowFriendRequests}
                                onChange={(e) =>
                                    handleChange(
                                        'allowFriendRequests',
                                        e.target.checked
                                    )
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            {hasChanges && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-cream">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full sm:w-auto px-6 py-3 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base shadow-md"
                    >
                        {isSaving ? 'Saving...' : 'Save Privacy Settings'}
                    </button>
                </div>
            )}
        </div>
    )
}
