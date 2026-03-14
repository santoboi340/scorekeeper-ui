import { useState } from 'react'
import type { UserSettings, SettingsUpdatePayload } from '../../types/settings'

interface AccountSettingsProps {
    settings: UserSettings
    onSave: (updates: SettingsUpdatePayload) => Promise<void>
    isSaving: boolean
}

const inputCx = 'w-full px-3 py-2 sm:py-2.5 border-2 border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal text-sm sm:text-base'

const passwordFields: { key: 'current' | 'new' | 'confirm'; label: string; hint?: string }[] = [
    { key: 'current', label: 'Current Password' },
    { key: 'new', label: 'New Password', hint: 'Minimum 8 characters' },
    { key: 'confirm', label: 'Confirm New Password' },
]

const connectedAccounts = [
    { name: 'Google', letter: 'G', gradient: 'from-blue-500 to-blue-600' },
    { name: 'Apple', letter: 'A', gradient: 'from-gray-800 to-black' },
]

const emptyPassword = { current: '', new: '', confirm: '' }

export default function AccountSettings({ settings, onSave, isSaving }: AccountSettingsProps) {
    const [email, setEmail] = useState(settings.email)
    const [username, setUsername] = useState(settings.username)
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [passwordData, setPasswordData] = useState(emptyPassword)
    const [hasChanges, setHasChanges] = useState(false)

    const updatePassword = (key: string, value: string) =>
        setPasswordData((prev) => ({ ...prev, [key]: value }))

    const handleUsernameChange = (val: string) => {
        setUsername(val.toLowerCase().replace(/[^a-z0-9-]/g, ''))
        setHasChanges(true)
    }

    const handleSaveAccount = async () => {
        await onSave({ email, username })
        setHasChanges(false)
    }

    const handlePasswordChange = async () => {
        if (passwordData.new !== passwordData.confirm) return alert('New passwords do not match')
        if (passwordData.new.length < 8) return alert('Password must be at least 8 characters')
        setPasswordData(emptyPassword)
        setShowPasswordChange(false)
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">Account Settings</h2>

            <div className="space-y-4 sm:space-y-6">
                {/* Email */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">Email Address</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setHasChanges(true) }} className={inputCx} />
                    <p className="text-xs sm:text-sm text-secondary-green mt-1.5">Used for login and notifications</p>
                </div>

                {/* Username */}
                <div className="bg-cream p-4 sm:p-5 rounded-lg">
                    <label className="block text-sm sm:text-base font-semibold text-primary-green mb-2">Username</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <span className="text-xs sm:text-sm text-secondary-green whitespace-nowrap">scorekeeper.app/profile/</span>
                        <input type="text" value={username} onChange={(e) => handleUsernameChange(e.target.value)}
                            pattern="[a-z0-9-]+" className={`flex-1 w-full sm:w-auto ${inputCx}`} />
                    </div>
                    <p className="text-xs sm:text-sm text-secondary-green mt-1.5">Lowercase letters, numbers, and hyphens only</p>
                </div>

                {/* Save Account Changes */}
                {hasChanges && (
                    <div className="pt-2">
                        <button onClick={handleSaveAccount} disabled={isSaving}
                            className="w-full sm:w-auto px-6 py-3 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base shadow-md">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}

                {/* Password Section */}
                <div className="border-t-2 border-cream pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4">Password</h3>

                    {!showPasswordChange ? (
                        <button onClick={() => setShowPasswordChange(true)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-secondary-green text-cream rounded-lg hover:bg-primary-green transition-colors font-semibold text-sm sm:text-base">
                            Change Password
                        </button>
                    ) : (
                        <div className="space-y-4 bg-cream p-4 sm:p-5 rounded-lg">
                            {passwordFields.map(({ key, label, hint }) => (
                                <div key={key}>
                                    <label className="block text-sm font-semibold text-primary-green mb-2">{label}</label>
                                    <input type="password" value={passwordData[key]} onChange={(e) => updatePassword(key, e.target.value)} className={inputCx} />
                                    {hint && <p className="text-xs sm:text-sm text-secondary-green mt-1.5">{hint}</p>}
                                </div>
                            ))}

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button onClick={handlePasswordChange}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold transition-colors font-semibold text-sm sm:text-base">
                                    Update Password
                                </button>
                                <button onClick={() => { setShowPasswordChange(false); setPasswordData(emptyPassword) }}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-white text-secondary-green border-2 border-neutral rounded-lg hover:bg-neutral/10 transition-colors font-semibold text-sm sm:text-base">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Two-Factor Authentication */}
                <div className="border-t-2 border-cream pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-2">Two-Factor Authentication</h3>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3 sm:mb-4">Add an extra layer of security to your account</p>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-neutral/20 text-secondary-green rounded-lg hover:bg-neutral/30 transition-colors font-semibold text-sm sm:text-base cursor-not-allowed">
                        Enable 2FA (Coming Soon)
                    </button>
                </div>

                {/* Connected Accounts */}
                <div className="border-t-2 border-cream pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4">Connected Accounts</h3>
                    <div className="space-y-3">
                        {connectedAccounts.map(({ name, letter, gradient }) => (
                            <div key={name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border-2 border-neutral/30 rounded-lg bg-cream">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shrink-0`}>
                                        {letter}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm sm:text-base text-primary-green">{name}</p>
                                        <p className="text-xs sm:text-sm text-secondary-green">Not connected</p>
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto text-sm sm:text-base text-teal hover:text-burnt-orange font-semibold transition-colors">Connect</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
