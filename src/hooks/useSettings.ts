// hooks/useSettings.ts

import { useState, useEffect } from 'react'
import { UserSettings, SettingsUpdatePayload } from '../types/settings'
import { getMockSettings } from '../lib/mockSettings'
import { simulateApiDelay } from '../lib/mockUserData'
interface UseSettingsResult {
    settings: UserSettings | null
    isLoading: boolean
    isSaving: boolean
    error: string | null
    updateSettings: (updates: SettingsUpdatePayload) => Promise<void>
}

export function useSettings(username: string): UseSettingsResult {
    const [settings, setSettings] = useState<UserSettings | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchSettings() {
            try {
                setIsLoading(true)
                setError(null)

                await simulateApiDelay(400)

                const userSettings = getMockSettings(username)

                if (!userSettings) {
                    setError('Settings not found')
                    setSettings(null)
                } else {
                    setSettings(userSettings)
                }
            } catch (err) {
                setError('Failed to load settings')
                setSettings(null)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSettings()
    }, [username])

    const updateSettings = async (updates: SettingsUpdatePayload) => {
        if (!settings) return

        try {
            setIsSaving(true)
            setError(null)

            await simulateApiDelay(600)

            // Merge updates
            const updatedSettings: UserSettings = {
                ...settings,
                privacy: updates.privacy
                    ? { ...settings.privacy, ...updates.privacy }
                    : settings.privacy,
                notifications: {
                    email: updates.notifications?.email
                        ? {
                              ...settings.notifications.email,
                              ...updates.notifications.email,
                          }
                        : settings.notifications.email,
                    push: updates.notifications?.push
                        ? {
                              ...settings.notifications.push,
                              ...updates.notifications.push,
                          }
                        : settings.notifications.push,
                },
                preferences: updates.preferences
                    ? { ...settings.preferences, ...updates.preferences }
                    : settings.preferences,
            }

            setSettings(updatedSettings)
        } catch (err) {
            setError('Failed to save settings')
            throw err
        } finally {
            setIsSaving(false)
        }
    }

    return { settings, isLoading, isSaving, error, updateSettings }
}
