'use client'

import { useState } from 'react'
import { useSettings } from 'root/hooks/useSettings'
import PrivacySettings from 'root/components/Settings/PrivacySettings'
import NotificationSettings from 'root/components/Settings/NotificationSettings'
import PreferencesSettings from 'root/components/Settings/PreferencesSettings'
import AccountSettings from 'root/components/Settings/AccountSettings'
import DangerZone from 'root/components/Settings/DangerZone'
import Link from 'next/link'

const tabs = [
    { id: 'account', label: 'Account', icon: '👤', component: AccountSettings },
    { id: 'privacy', label: 'Privacy', icon: '🔒', component: PrivacySettings },
    { id: 'notifications', label: 'Notifications', icon: '🔔', component: NotificationSettings },
    { id: 'preferences', label: 'Preferences', icon: '⚙️', component: PreferencesSettings },
    { id: 'data', label: 'Data & Security', icon: '🛡️', component: DangerZone },
]

export default function SettingsPage() {
    // TODO: Get actual logged-in username from auth context
    const currentUsername = 'sarah-chen'

    const { settings, isLoading, isSaving, error, updateSettings } = useSettings(currentUsername)
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [saveMessage, setSaveMessage] = useState<string | null>(null)

    const flash = (msg: string) => {
        setSaveMessage(msg)
        setTimeout(() => setSaveMessage(null), 3000)
    }

    const handleSave = async (updates: any) => {
        try {
            await updateSettings(updates)
            flash('Settings saved successfully')
        } catch {
            flash('Failed to save settings')
        }
    }

    if (isLoading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4" />
                    <p className="text-secondary-green">Loading settings...</p>
                </div>
            </div>
        )

    if (error || !settings)
        return (
            <div className="flex items-center justify-center min-h-screen text-center">
                <div>
                    <p className="text-red-600 mb-4">{error || 'Failed to load settings'}</p>
                    <Link href="/" className="text-teal hover:text-primary-green underline">Back to home</Link>
                </div>
            </div>
        )

    const ActiveComponent: React.FC<{
        settings: typeof settings
        onSave: typeof handleSave
        isSaving: boolean
    }> = tabs.find((t) => t.id === activeTab)!.component

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-pickleball-yellow mb-8">Settings</h1>

            {saveMessage && (
                <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white animate-fade-in ${saveMessage.includes('success') ? 'bg-primary-green' : 'bg-red-500'}`}>
                    {saveMessage}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                <nav className="md:w-64 flex-shrink-0">
                    <ul className="space-y-1">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeTab === tab.id ? 'bg-pickleball-yellow text-primary-green font-semibold' : 'text-cream hover:bg-secondary-green hover:text-pickleball-yellow'}`}
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex-1 bg-cream rounded-lg shadow-md p-6 border border-gold">
                    <ActiveComponent settings={settings} onSave={handleSave} isSaving={isSaving} />
                </div>
            </div>
        </div>
    )
}
