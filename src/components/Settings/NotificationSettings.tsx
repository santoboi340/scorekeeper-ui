// components/settings/NotificationSettings.tsx

import { useState } from 'react'
import { UserSettings } from '../../types/settings'

interface NotificationSettingsProps {
    settings: UserSettings
    onSave: (updates: any) => Promise<void>
    isSaving: boolean
}

export default function NotificationSettings({
    settings,
    onSave,
    isSaving,
}: NotificationSettingsProps) {
    const [notifications, setNotifications] = useState(settings.notifications)
    const [hasChanges, setHasChanges] = useState(false)

    const handleEmailChange = (
        field: keyof typeof notifications.email,
        value: boolean
    ) => {
        setNotifications({
            ...notifications,
            email: { ...notifications.email, [field]: value },
        })
        setHasChanges(true)
    }

    const handlePushChange = (
        field: keyof typeof notifications.push,
        value: boolean
    ) => {
        setNotifications({
            ...notifications,
            push: { ...notifications.push, [field]: value },
        })
        setHasChanges(true)
    }

    const handleSave = async () => {
        await onSave({ notifications })
        setHasChanges(false)
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-3 sm:mb-6">
                Notification Preferences
            </h2>

            <p className="text-sm sm:text-base text-secondary-green mb-4 sm:mb-6">
                Choose how you want to be notified. We respect your inbox and
                will never spam you.
            </p>

            <div className="space-y-6 sm:space-y-8">
                {/* Email Notifications */}
                <div className="bg-cream p-4 sm:p-6 rounded-lg">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">📧</span>
                        Email Notifications
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Match Requests
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    When someone invites you to play
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.email.matchRequests}
                                onChange={(e) =>
                                    handleEmailChange(
                                        'matchRequests',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Friend Requests
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    When someone wants to connect
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.email.friendRequests}
                                onChange={(e) =>
                                    handleEmailChange(
                                        'friendRequests',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Direct Messages
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    When you receive a message
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.email.messages}
                                onChange={(e) =>
                                    handleEmailChange(
                                        'messages',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Weekly Digest
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    Summary of your week's activity
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.email.weeklyDigest}
                                onChange={(e) =>
                                    handleEmailChange(
                                        'weeklyDigest',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Product Updates
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    New features and improvements (rare, we
                                    promise)
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.email.productUpdates}
                                onChange={(e) =>
                                    handleEmailChange(
                                        'productUpdates',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Push Notifications */}
                <div className="bg-cream p-4 sm:p-6 rounded-lg">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">🔔</span>
                        Push Notifications
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Match Requests
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    Instant notification for game invites
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.push.matchRequests}
                                onChange={(e) =>
                                    handlePushChange(
                                        'matchRequests',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Friend Requests
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    Instant notification for connections
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.push.friendRequests}
                                onChange={(e) =>
                                    handlePushChange(
                                        'friendRequests',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Messages
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    Instant notification for new messages
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.push.messages}
                                onChange={(e) =>
                                    handlePushChange(
                                        'messages',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg border border-neutral/30">
                            <div>
                                <p className="font-semibold text-sm sm:text-base text-primary-green">
                                    Match Reminders
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-0.5 sm:mt-1">
                                    15 min before scheduled matches
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifications.push.matchReminders}
                                onChange={(e) =>
                                    handlePushChange(
                                        'matchReminders',
                                        e.target.checked
                                    )
                                }
                                className="w-5 h-5 text-teal rounded focus:ring-2 focus:ring-teal self-start sm:self-auto shrink-0"
                            />
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
                        {isSaving ? 'Saving...' : 'Save Notification Settings'}
                    </button>
                </div>
            )}
        </div>
    )
}
