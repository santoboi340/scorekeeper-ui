import { useState } from 'react'
import { UserSettings } from '../../types/settings'

interface NotificationSettingsProps {
    settings: UserSettings
    onSave: (updates: any) => Promise<void>
    isSaving: boolean
}

type EmailKey = keyof UserSettings['notifications']['email']
type PushKey = keyof UserSettings['notifications']['push']

const emailItems: { key: EmailKey; label: string; desc: string }[] = [
    { key: 'matchRequests', label: 'Match Requests', desc: 'When someone invites you to play' },
    { key: 'friendRequests', label: 'Friend Requests', desc: 'When someone wants to connect' },
    { key: 'messages', label: 'Direct Messages', desc: 'When you receive a message' },
    { key: 'weeklyDigest', label: 'Weekly Digest', desc: "Summary of your week's activity" },
    { key: 'productUpdates', label: 'Product Updates', desc: 'New features and improvements (rare, we promise)' },
]

const pushItems: { key: PushKey; label: string; desc: string }[] = [
    { key: 'matchRequests', label: 'Match Requests', desc: 'Instant notification for game invites' },
    { key: 'friendRequests', label: 'Friend Requests', desc: 'Instant notification for connections' },
    { key: 'messages', label: 'Messages', desc: 'Instant notification for new messages' },
    { key: 'matchReminders', label: 'Match Reminders', desc: '15 min before scheduled matches' },
]

const checkboxCx = 'w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0'

export default function NotificationSettings({ settings, onSave, isSaving }: NotificationSettingsProps) {
    const [notifications, setNotifications] = useState(settings.notifications)
    const [hasChanges, setHasChanges] = useState(false)

    const toggle = (channel: 'email' | 'push', field: string, value: boolean) => {
        setNotifications((prev) => ({ ...prev, [channel]: { ...prev[channel], [field]: value } }))
        setHasChanges(true)
    }

    const handleSave = async () => { await onSave({ notifications }); setHasChanges(false) }

    const renderRow = (key: string, label: string, desc: string, checked: boolean, onChange: (v: boolean) => void) => (
        <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
            <div>
                <p className="font-semibold text-sm sm:text-base text-primary-green">{label}</p>
                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">{desc}</p>
            </div>
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className={checkboxCx} />
        </div>
    )

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-3 sm:mb-6">Notification Preferences</h2>
            <p className="text-sm sm:text-base text-secondary-green mb-4 sm:mb-6">
                Choose how you want to be notified. We respect your inbox and will never spam you.
            </p>

            <div className="space-y-6 sm:space-y-8">
                {/* Email Notifications */}
                <div className="bg-cream p-4 sm:p-6 rounded-lg">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">📧</span> Email Notifications
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        {emailItems.map(({ key, label, desc }) =>
                            renderRow(key, label, desc, notifications.email[key], (v) => toggle('email', key, v))
                        )}
                    </div>
                </div>

                {/* Push Notifications */}
                <div className="bg-cream p-4 sm:p-6 rounded-lg">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">🔔</span> Push Notifications
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        {pushItems.map(({ key, label, desc }) =>
                            renderRow(key, label, desc, notifications.push[key], (v) => toggle('push', key, v))
                        )}
                    </div>
                </div>
            </div>

            {hasChanges && (
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-cream">
                    <button onClick={handleSave} disabled={isSaving}
                        className="w-full sm:w-auto px-6 py-3 bg-pickleball-yellow text-primary-green rounded-lg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base shadow-md">
                        {isSaving ? 'Saving...' : 'Save Notification Settings'}
                    </button>
                </div>
            )}
        </div>
    )
}
