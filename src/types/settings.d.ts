import type { PrivacyType } from './user'

export interface UserSettings {
    email: string
    username: string

    privacy: {
        profileVisibility: PrivacyType
        showLocation: PrivacyType
        showStats: PrivacyType
        showMatchHistory: PrivacyType
        allowMatchRequests: boolean
        showOnlineStatus: boolean
        allowFriendRequests: boolean
    }

    notifications: {
        email: {
            matchRequests: boolean
            friendRequests: boolean
            messages: boolean
            weeklyDigest: boolean
            productUpdates: boolean
        }
        push: {
            matchRequests: boolean
            friendRequests: boolean
            messages: boolean
            matchReminders: boolean
        }
    }

    preferences: {
        theme: 'light' | 'dark' | 'system'
        language: string
        distanceUnit: 'miles' | 'kilometers'
        defaultMatchType: 'singles' | 'doubles'
    }
}

export interface SettingsUpdatePayload {
    email?: string
    username?: string
    privacy?: Partial<UserSettings['privacy']>
    notifications?: {
        email?: Partial<UserSettings['notifications']['email']>
        push?: Partial<UserSettings['notifications']['push']>
    }
    preferences?: Partial<UserSettings['preferences']>
}
