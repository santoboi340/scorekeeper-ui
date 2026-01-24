// app/settings/page.tsx

'use client'

import { useState } from 'react'
import { useSettings } from '@/hooks/useSettings'
import PrivacySettings from '../../../components/Settings/PrivacySettings'
import NotificationSettings from '../../../components/Settings/NotificationSettings'
import PreferencesSettings from '../../../components/Settings/PreferencesSettings'
import AccountSettings from '../../../components/Settings/AccountSettings'
import DangerZone from '../../../components/Settings/DangerZone'
import Link from 'next/link'

type SettingsTab =
    | 'account'
    | 'privacy'
    | 'notifications'
    | 'preferences'
    | 'data'

export default function SettingsPage() {
    // TODO: Get actual logged-in username from auth context
    const currentUsername = 'sarah-chen'

    const { settings, isLoading, isSaving, error, updateSettings } =
        useSettings(currentUsername)
    const [activeTab, setActiveTab] = useState<SettingsTab>('account')
    const [saveMessage, setSaveMessage] = useState<string | null>(null)

    const handleSave = async (updates: any) => {
        try {
            await updateSettings(updates)
            setSaveMessage('Settings saved successfully')
            setTimeout(() => setSaveMessage(null), 3000)
        } catch (err) {
            setSaveMessage('Failed to save settings')
            setTimeout(() => setSaveMessage(null), 3000)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        )
    }

    if (error || !settings) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">
                        {error || 'Failed to load settings'}
                    </p>
                    <Link href="/" className="text-blue-600 hover:underline">
                        Back to home
                    </Link>
                </div>
            </div>
        )
    }

    const tabs: { id: SettingsTab; label: string; icon: string }[] = [
        { id: 'account', label: 'Account', icon: '👤' },
        { id: 'privacy', label: 'Privacy', icon: '🔒' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️' },
        { id: 'data', label: 'Data & Security', icon: '🛡️' },
    ]

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            {/* Save Message Toast */}
            {saveMessage && (
                <div
                    className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
                        saveMessage.includes('success')
                            ? 'bg-green-500'
                            : 'bg-red-500'
                    } text-white animate-fade-in`}
                >
                    {saveMessage}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <nav className="md:w-64 flex-shrink-0">
                    <ul className="space-y-1">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                                        activeTab === tab.id
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span className="font-medium">
                                        {tab.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Content Area */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                    {activeTab === 'account' && (
                        <AccountSettings
                            settings={settings}
                            onSave={handleSave}
                            isSaving={isSaving}
                        />
                    )}

                    {activeTab === 'privacy' && (
                        <PrivacySettings
                            settings={settings}
                            onSave={handleSave}
                            isSaving={isSaving}
                        />
                    )}

                    {activeTab === 'notifications' && (
                        <NotificationSettings
                            settings={settings}
                            onSave={handleSave}
                            isSaving={isSaving}
                        />
                    )}

                    {activeTab === 'preferences' && (
                        <PreferencesSettings
                            settings={settings}
                            onSave={handleSave}
                            isSaving={isSaving}
                        />
                    )}

                    {activeTab === 'data' && <DangerZone settings={settings} />}
                </div>
            </div>
        </div>
    )
}
