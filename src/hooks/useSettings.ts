import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserSettings, SettingsUpdatePayload } from '../types/settings'
import { getMockSettings } from '../lib/mockSettings'
import { simulateApiDelay } from '../lib/mockUserData'

export function useSettings(username: string) {
    const queryClient = useQueryClient()

    const query = useQuery<UserSettings | null>({
        queryKey: ['settings', username],
        queryFn: async () => {
            await simulateApiDelay(400)
            return getMockSettings(username)
        },
    })

    const mutation = useMutation<UserSettings, Error, SettingsUpdatePayload>({
        mutationFn: async (updates) => {
            const current = query.data
            if (!current) throw new Error('No settings loaded')
            await simulateApiDelay(600)
            return {
                ...current,
                privacy: updates.privacy ? { ...current.privacy, ...updates.privacy } : current.privacy,
                notifications: {
                    email: updates.notifications?.email ? { ...current.notifications.email, ...updates.notifications.email } : current.notifications.email,
                    push: updates.notifications?.push ? { ...current.notifications.push, ...updates.notifications.push } : current.notifications.push,
                },
                preferences: updates.preferences ? { ...current.preferences, ...updates.preferences } : current.preferences,
            }
        },
        onSuccess: (data) => queryClient.setQueryData(['settings', username], data),
    })

    return {
        settings: query.data ?? null,
        isLoading: query.isLoading,
        isSaving: mutation.isPending,
        error: query.error?.message ?? mutation.error?.message ?? null,
        updateSettings: mutation.mutateAsync,
    }
}
