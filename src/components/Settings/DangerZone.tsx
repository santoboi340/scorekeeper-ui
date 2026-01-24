// components/settings/DangerZone.tsx

import { useState } from 'react'
import { UserSettings } from '../../types/settings'

interface DangerZoneProps {
    settings: UserSettings
}

export default function DangerZone({ settings }: DangerZoneProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState('')
    const [isExporting, setIsExporting] = useState(false)

    const handleExportData = async () => {
        setIsExporting(true)

        // Simulate data export
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // In reality, this would hit your API and download a JSON/ZIP file
        const mockData = {
            profile: settings,
            exportedAt: new Date().toISOString(),
            note: 'This is your complete data export',
        }

        const blob = new Blob([JSON.stringify(mockData, null, 2)], {
            type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `scorekeeper-data-${settings.username}-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)

        setIsExporting(false)
    }

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== 'DELETE') {
            alert('Please type DELETE to confirm')
            return
        }

        // TODO: Call actual delete API
        console.log('Account deletion requested')
        alert(
            'Account deletion would happen here. This is currently disabled in the demo.'
        )
        setShowDeleteConfirm(false)
        setDeleteConfirmText('')
    }

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary-green mb-4 sm:mb-6">
                Data & Security
            </h2>

            <div className="space-y-6 sm:space-y-8">
                {/* Export Data */}
                <div className="bg-teal/10 border-2 border-teal/30 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-2 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">📦</span>
                        Export Your Data
                    </h3>
                    <p className="text-sm sm:text-base text-secondary-green mb-4 leading-relaxed">
                        Download a copy of all your data including profile,
                        matches, and activity. We believe your data belongs to
                        you.
                    </p>
                    <button
                        onClick={handleExportData}
                        disabled={isExporting}
                        className="w-full sm:w-auto px-6 py-2.5 bg-teal text-cream rounded-lg hover:bg-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base"
                    >
                        {isExporting
                            ? 'Preparing Export...'
                            : 'Download My Data'}
                    </button>
                </div>

                {/* Session Management */}
                <div className="border-t-2 border-cream pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-bold text-primary-green mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">🔐</span>
                        Active Sessions
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary-green mb-3 sm:mb-4">
                        Devices where you&apos;re currently logged in
                    </p>

                    <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border-2 border-neutral/30 rounded-lg bg-cream">
                            <div className="flex-1">
                                <p className="font-semibold text-sm sm:text-base text-primary-green flex items-center gap-2">
                                    <span>💻</span>
                                    Windows PC - Chrome
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-1">
                                    Current session • Portland, OR
                                </p>
                                <p className="text-xs text-secondary-green/70 mt-0.5">
                                    Last active: Just now
                                </p>
                            </div>
                            <span className="text-gold text-xs sm:text-sm font-semibold self-start sm:self-auto">
                                Active
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border-2 border-neutral/30 rounded-lg bg-cream">
                            <div className="flex-1">
                                <p className="font-semibold text-sm sm:text-base text-primary-green flex items-center gap-2">
                                    <span>📱</span>
                                    iPhone - Safari
                                </p>
                                <p className="text-xs sm:text-sm text-secondary-green mt-1">
                                    Portland, OR
                                </p>
                                <p className="text-xs text-secondary-green/70 mt-0.5">
                                    Last active: 2 hours ago
                                </p>
                            </div>
                            <button className="text-xs sm:text-sm text-burnt-orange hover:text-burnt-orange/80 font-semibold self-start sm:self-auto">
                                Revoke
                            </button>
                        </div>
                    </div>

                    <button className="mt-4 text-xs sm:text-sm text-burnt-orange hover:text-burnt-orange/80 font-semibold">
                        Log Out All Other Sessions
                    </button>
                </div>

                {/* Delete Account - THE DANGER ZONE */}
                <div className="border-t-2 border-burnt-orange/30 pt-4 sm:pt-6">
                    <div className="bg-burnt-orange/10 border-2 border-burnt-orange/40 rounded-lg p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-burnt-orange mb-2 flex items-center gap-2">
                            <span className="text-xl sm:text-2xl">⚠️</span>
                            Delete Account
                        </h3>
                        <p className="text-sm sm:text-base text-secondary-green mb-4 leading-relaxed">
                            Permanently delete your account and all associated
                            data. This action cannot be undone.
                        </p>

                        {!showDeleteConfirm ? (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="w-full sm:w-auto px-6 py-2.5 bg-burnt-orange text-cream rounded-lg hover:bg-burnt-orange/90 transition-colors font-semibold text-sm sm:text-base"
                            >
                                Delete My Account
                            </button>
                        ) : (
                            <div className="space-y-4 bg-white p-4 sm:p-5 rounded-lg border-2 border-burnt-orange">
                                <p className="font-bold text-sm sm:text-base text-burnt-orange">
                                    Are you absolutely sure?
                                </p>

                                <div className="bg-pickleball-yellow/20 border-2 border-pickleball-yellow/50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                                    <p className="font-semibold text-primary-green mb-2">
                                        This will permanently delete:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-secondary-green">
                                        <li>
                                            Your profile and all personal
                                            information
                                        </li>
                                        <li>
                                            All match history and statistics
                                        </li>
                                        <li>Friend connections and messages</li>
                                        <li>
                                            Any saved preferences and settings
                                        </li>
                                    </ul>
                                </div>

                                <p className="text-xs sm:text-sm text-secondary-green">
                                    Type{' '}
                                    <span className="font-mono font-bold bg-cream px-2 py-1 rounded text-primary-green">
                                        DELETE
                                    </span>{' '}
                                    to confirm:
                                </p>

                                <input
                                    type="text"
                                    value={deleteConfirmText}
                                    onChange={(e) =>
                                        setDeleteConfirmText(e.target.value)
                                    }
                                    placeholder="Type DELETE here"
                                    className="w-full px-3 py-2 sm:py-2.5 border-2 border-burnt-orange/50 rounded-lg focus:border-burnt-orange focus:outline-none focus:ring-2 focus:ring-burnt-orange/30 text-sm sm:text-base"
                                />

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={
                                            deleteConfirmText !== 'DELETE'
                                        }
                                        className="w-full sm:w-auto px-6 py-2.5 bg-burnt-orange text-cream rounded-lg hover:bg-burnt-orange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base"
                                    >
                                        Yes, Delete Forever
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDeleteConfirm(false)
                                            setDeleteConfirmText('')
                                        }}
                                        className="w-full sm:w-auto px-6 py-2.5 bg-white text-secondary-green border-2 border-neutral rounded-lg hover:bg-neutral/10 transition-colors font-semibold text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
