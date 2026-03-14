// lib/mockData.ts (add to existing file)

import { UserSettings } from 'root/types/settings'

export const MOCK_SETTINGS: Record<string, UserSettings> = {
    'sarah-chen': {
        email: 'sarah.chen@example.com',
        username: 'sarah-chen',
        privacy: {
            profileVisibility: 'PUBLIC',
            showLocation: 'PUBLIC',
            showStats: 'PUBLIC',
            showMatchHistory: 'FRIENDS',
            allowMatchRequests: true,
            showOnlineStatus: true,
            allowFriendRequests: true,
        },
        notifications: {
            email: {
                matchRequests: true,
                friendRequests: true,
                messages: false,
                weeklyDigest: false,
                productUpdates: false, // Respect the inbox!
            },
            push: {
                matchRequests: true,
                friendRequests: true,
                messages: true,
                matchReminders: false,
            },
        },
        preferences: {
            theme: 'system',
            language: 'en',
            distanceUnit: 'miles',
            defaultMatchType: 'doubles',
        },
    },

    // Add more mock users as needed
    'mike-rodriguez': {
        email: 'mike.r@example.com',
        username: 'mike-rodriguez',
        privacy: {
            profileVisibility: 'PUBLIC',
            showLocation: 'PUBLIC',
            showStats: 'PUBLIC',
            showMatchHistory: 'PUBLIC',
            allowMatchRequests: true,
            showOnlineStatus: false, // Privacy-conscious
            allowFriendRequests: true,
        },
        notifications: {
            email: {
                matchRequests: false, // Email minimalist
                friendRequests: false,
                messages: false,
                weeklyDigest: false,
                productUpdates: false,
            },
            push: {
                matchRequests: true,
                friendRequests: false,
                messages: true,
                matchReminders: true,
            },
        },
        preferences: {
            theme: 'dark',
            language: 'en',
            distanceUnit: 'miles',
            defaultMatchType: 'singles',
        },
    },
}

export function getMockSettings(username: string): UserSettings | null {
    return MOCK_SETTINGS[username] || null
}
