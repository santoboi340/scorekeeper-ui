import { useState } from 'react'
import type { UserSettings, SettingsUpdatePayload } from '../../types/settings'

interface PreferencesSettingsProps {
    settings: UserSettings
    onSave: (updates: SettingsUpdatePayload) => Promise<void>
    isSaving: boolean
}

const themes = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'system', icon: '💻', label: 'System' },
]

const languages = [
    { value: 'en', label: 'English' }, { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' }, { value: 'de', label: 'Deutsch' }, { value: 'pt', label: 'Português' },
]

const accessibilityItems = [
    { label: 'Reduce Motion', desc: 'Minimize animations and transitions' },
    { label: 'High Contrast', desc: 'Increase text and UI contrast' },
]

const toggleCx = (active: boolean) =>
    `border-2 rounded-lg transition ${active ? 'border-teal bg-teal/10 font-semibold text-primary-green' : 'border-neutral/30 hover:border-neutral text-secondary-green'}`

const switchCx = "w-11 h-6 bg-neutral/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-neutral after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"

export default function PreferencesSettings({ settings, onSave, isSaving }: PreferencesSettingsProps) {
    const [preferences, setPreferences] = useState(settings.preferences)
    const [hasChanges, setHasChanges] = useState(false)

    const handleChange = (field: keyof typeof preferences, value: string) => {
        setPreferences((prev) => ({ ...prev, [field]: value }))
        setHasChanges(true)
    }

    const handleSave = async () => { await onSave({ preferences }); setHasChanges(false) }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">App Preferences</h2>

            <div className="space-y-4 sm:space-y-6">
                {/* Theme */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">Theme</label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">Choose your visual preference</p>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {themes.map(({ value, icon, label }) => (
                            <button key={value} onClick={() => handleChange('theme', value)}
                                className={`p-3 sm:p-4 ${toggleCx(preferences.theme === value)}`}>
                                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{icon}</div>
                                <div className="text-xs sm:text-sm font-medium text-primary-green">{label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Language */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">Language</label>
                    <select value={preferences.language} onChange={(e) => handleChange('language', e.target.value)}
                        className="w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base">
                        {languages.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                    </select>
                </div>

                {/* Distance Unit */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">Distance Unit</label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">For showing court distances and travel</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {(['miles', 'kilometers'] as const).map((unit) => (
                            <button key={unit} onClick={() => handleChange('distanceUnit', unit)}
                                className={`flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base ${toggleCx(preferences.distanceUnit === unit)}`}>
                                {unit === 'miles' ? 'Miles' : 'Kilometers'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Default Match Type */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">Default Match Type</label>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3">Your preferred format when creating matches</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {([{ value: 'singles', label: 'Singles (1v1)' }, { value: 'doubles', label: 'Doubles (2v2)' }] as const).map(({ value, label }) => (
                            <button key={value} onClick={() => handleChange('defaultMatchType', value)}
                                className={`flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base ${toggleCx(preferences.defaultMatchType === value)}`}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accessibility */}
                <div className="border-t-2 border-cream pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4">Accessibility</h3>
                    <div className="space-y-3 sm:space-y-4">
                        {accessibilityItems.map(({ label, desc }) => (
                            <div key={label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-neutral/30">
                                <div>
                                    <p className="font-semibold text-sm sm:text-base text-primary-green">{label}</p>
                                    <p className="text-xs sm:text-sm text-secondary-green mt-1">{desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className={switchCx}></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {hasChanges && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-cream">
                    <button onClick={handleSave} disabled={isSaving}
                        className="w-full sm:w-auto px-6 py-3 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base shadow-md">
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                </div>
            )}
        </div>
    )
}
