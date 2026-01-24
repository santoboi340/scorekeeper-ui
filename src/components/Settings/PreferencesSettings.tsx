// components/settings/PreferencesSettings.tsx

import { useState } from 'react'
import { UserSettings } from '../../types/settings'

interface PreferencesSettingsProps {
    settings: UserSettings
    onSave: (updates: any) => Promise<void>
    isSaving: boolean
}

export default function PreferencesSettings({
    settings,
    onSave,
    isSaving,
}: PreferencesSettingsProps) {
    const [preferences, setPreferences] = useState(settings.preferences)
    const [hasChanges, setHasChanges] = useState(false)

    const handleChange = (field: keyof typeof preferences, value: any) => {
        setPreferences({ ...preferences, [field]: value })
        setHasChanges(true)
    }

    const handleSave = async () => {
        await onSave({ preferences })
        setHasChanges(false)
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">
                App Preferences
            </h2>

            <div className="space-y-4 sm:space-y-6">
                {/* Theme */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Theme
                    </label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">
                        Choose your visual preference
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        <button
                            onClick={() => handleChange('theme', 'light')}
                            className={`p-3 sm:p-4 border-2 rounded-lg transition ${
                                preferences.theme === 'light'
                                    ? 'border-teal bg-teal/10'
                                    : 'border-neutral/30 hover:border-neutral'
                            }`}
                        >
                            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                                ☀️
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-primary-green">
                                Light
                            </div>
                        </button>

                        <button
                            onClick={() => handleChange('theme', 'dark')}
                            className={`p-3 sm:p-4 border-2 rounded-lg transition ${
                                preferences.theme === 'dark'
                                    ? 'border-teal bg-teal/10'
                                    : 'border-neutral/30 hover:border-neutral'
                            }`}
                        >
                            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                                🌙
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-primary-green">
                                Dark
                            </div>
                        </button>

                        <button
                            onClick={() => handleChange('theme', 'system')}
                            className={`p-3 sm:p-4 border-2 rounded-lg transition ${
                                preferences.theme === 'system'
                                    ? 'border-teal bg-teal/10'
                                    : 'border-neutral/30 hover:border-neutral'
                            }`}
                        >
                            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                                💻
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-primary-green">
                                System
                            </div>
                        </button>
                    </div>
                </div>

                {/* Language */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Language
                    </label>
                    <select
                        value={preferences.language}
                        onChange={(e) =>
                            handleChange('language', e.target.value)
                        }
                        className="w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base"
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="pt">Português</option>
                    </select>
                </div>

                {/* Distance Unit */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Distance Unit
                    </label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">
                        For showing court distances and travel
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                            onClick={() =>
                                handleChange('distanceUnit', 'miles')
                            }
                            className={`flex-1 px-4 py-2.5 sm:py-2 border-2 rounded-lg transition text-sm sm:text-base ${
                                preferences.distanceUnit === 'miles'
                                    ? 'border-teal bg-teal/10 font-semibold text-primary-green'
                                    : 'border-neutral/30 hover:border-neutral text-secondary-green'
                            }`}
                        >
                            Miles
                        </button>
                        <button
                            onClick={() =>
                                handleChange('distanceUnit', 'kilometers')
                            }
                            className={`flex-1 px-4 py-2.5 sm:py-2 border-2 rounded-lg transition text-sm sm:text-base ${
                                preferences.distanceUnit === 'kilometers'
                                    ? 'border-teal bg-teal/10 font-semibold text-primary-green'
                                    : 'border-neutral/30 hover:border-neutral text-secondary-green'
                            }`}
                        >
                            Kilometers
                        </button>
                    </div>
                </div>

                {/* Default Match Type */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">
                        Default Match Type
                    </label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">
                        Your preferred format when creating matches
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                            onClick={() =>
                                handleChange('defaultMatchType', 'singles')
                            }
                            className={`flex-1 px-4 py-2.5 sm:py-2 border-2 rounded-lg transition text-sm sm:text-base ${
                                preferences.defaultMatchType === 'singles'
                                    ? 'border-teal bg-teal/10 font-semibold text-primary-green'
                                    : 'border-neutral/30 hover:border-neutral text-secondary-green'
                            }`}
                        >
                            Singles (1v1)
                        </button>
                        <button
                            onClick={() =>
                                handleChange('defaultMatchType', 'doubles')
                            }
                            className={`flex-1 px-4 py-2.5 sm:py-2 border-2 rounded-lg transition text-sm sm:text-base ${
                                preferences.defaultMatchType === 'doubles'
                                    ? 'border-teal bg-teal/10 font-semibold text-primary-green'
                                    : 'border-neutral/30 hover:border-neutral text-secondary-green'
                            }`}
                        >
                            Doubles (2v2)
                        </button>
                    </div>
                </div>

                {/* Accessibility */}
                <div className="border-t-2 border-cream pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4">
                        Accessibility
                    </h3>

                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Reduce Motion
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-1">
                                    Minimize animations and transitions
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-neutral/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                            </label>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    High Contrast
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-1">
                                    Increase text and UI contrast
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-neutral/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                            </label>
                        </div>
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
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                </div>
            )}
        </div>
    )
}
