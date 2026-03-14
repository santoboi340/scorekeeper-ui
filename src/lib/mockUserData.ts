import { UserProfile } from '../types/user'

export const MOCK_USERS: Record<string, UserProfile> = {
    'sarah-chen': {
        id: '1',
        userName: 'sarah-chen',
        email: 'sarah.chen@example.com',
        displayName: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?img=5',
        bio: 'Pickleball enthusiast and weekend warrior. Love playing doubles and meeting new people on the court. Always down for a friendly match!',
        location: 'Portland, OR',
        skillLevel: 'INTERMEDIATE',
        playStyle: 'BALANCED',
        yearsPlaying: 2,
        preferredHand: 'RIGHT',
        matchesPlayed: 47,
        winRate: 0.62,
        currentRating: 3.75,
        privacy: {
            showLocation: 'PUBLIC',
            showStats: 'PUBLIC',
            showMatchHistory: 'FRIENDS',
            allowMatchRequests: true,
        },
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2025-01-08T14:22:00Z',
    },

    'mike-rodriguez': {
        id: '2',
        userName: 'mike-rodriguez',
        email: 'mike.r@example.com',
        displayName: 'Mike Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=12',
        bio: 'Former tennis player making the switch to pickleball. Aggressive net play is my jam.',
        location: 'Austin, TX',
        skillLevel: 'ADVANCED',
        playStyle: 'AGGRESSIVE',
        yearsPlaying: 4,
        preferredHand: 'LEFT',
        matchesPlayed: 156,
        winRate: 0.71,
        currentRating: 4.25,
        privacy: {
            showLocation: 'PUBLIC',
            showStats: 'PUBLIC',
            showMatchHistory: 'PUBLIC',
            allowMatchRequests: true,
        },
        createdAt: '2023-06-10T08:15:00Z',
        updatedAt: '2025-01-09T16:45:00Z',
    },

    'alex-kim': {
        id: '3',
        userName: 'alex-kim',
        email: 'alex.kim@example.com',
        displayName: 'Alex Kim',
        avatar: 'https://i.pravatar.cc/150?img=33',
        bio: 'Just started playing last year but hooked already. Looking for patient partners to practice with!',
        location: 'Seattle, WA',
        skillLevel: 'BEGINNER',
        playStyle: 'DEFENSIVE',
        yearsPlaying: 1,
        preferredHand: 'RIGHT',
        matchesPlayed: 18,
        winRate: 0.44,
        currentRating: 2.5,
        privacy: {
            showLocation: 'FRIENDS',
            showStats: 'FRIENDS',
            showMatchHistory: 'PRIVATE',
            allowMatchRequests: true,
        },
        createdAt: '2024-09-20T12:00:00Z',
        updatedAt: '2025-01-07T11:30:00Z',
    },

    'jessica-taylor': {
        id: '4',
        userName: 'jessica-taylor',
        email: 'jtaylor@example.com',
        displayName: 'Jessica Taylor',
        bio: 'Competitive player. Tournament regular. Looking for serious practice partners only.',
        location: 'Denver, CO',
        skillLevel: 'PRO',
        playStyle: 'STRATEGIC',
        yearsPlaying: 6,
        preferredHand: 'RIGHT',
        matchesPlayed: 312,
        winRate: 0.78,
        currentRating: 4.85,
        privacy: {
            showLocation: 'PUBLIC',
            showStats: 'PUBLIC',
            showMatchHistory: 'PUBLIC',
            allowMatchRequests: false,
        },
        createdAt: '2022-03-05T09:20:00Z',
        updatedAt: '2025-01-10T07:15:00Z',
    },

    'chris-patel': {
        id: '5',
        userName: 'chris-patel',
        email: 'chrispatel@example.com',
        displayName: 'Chris Patel',
        avatar: 'https://i.pravatar.cc/150?img=68',
        location: 'Phoenix, AZ',
        skillLevel: 'INTERMEDIATE',
        yearsPlaying: 3,
        matchesPlayed: 89,
        privacy: {
            showLocation: 'PUBLIC',
            showStats: 'PRIVATE',
            showMatchHistory: 'PRIVATE',
            allowMatchRequests: true,
        },
        createdAt: '2023-11-12T14:40:00Z',
        updatedAt: '2025-01-05T19:00:00Z',
    },
}

export function getMockUserByUsername(username: string): UserProfile | null {
    return MOCK_USERS[username] || null
}

export async function simulateApiDelay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
