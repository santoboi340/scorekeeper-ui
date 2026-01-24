// types/settings.ts

export interface UserSettings {
    // Account
    email: string
    username: string

    // Privacy
    privacy: {
        profileVisibility: 'public' | 'friends' | 'private'
        showLocation: 'public' | 'friends' | 'private'
        showStats: 'public' | 'friends' | 'private'
        showMatchHistory: 'public' | 'friends' | 'private'
        allowMatchRequests: boolean
        showOnlineStatus: boolean
        allowFriendRequests: boolean
    }

    // Notifications (all default to FALSE - opt-in only!)
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

    // Preferences
    preferences: {
        theme: 'light' | 'dark' | 'system'
        language: string
        distanceUnit: 'miles' | 'kilometers'
        defaultMatchType: 'singles' | 'doubles'
    }
}

export interface SettingsUpdatePayload {
    privacy?: Partial<UserSettings['privacy']>
    notifications?: {
        email?: Partial<UserSettings['notifications']['email']>
        push?: Partial<UserSettings['notifications']['push']>
    }
    preferences?: Partial<UserSettings['preferences']>
}
