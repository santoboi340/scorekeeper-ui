// types/user.ts

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'pro'
export type PlayStyle = 'aggressive' | 'defensive' | 'balanced' | 'strategic'

export interface User {
    id: string
    email: string
    firstname?: string
    lastname?: string
    role?: 'user' | 'admin'
}

// src/types/user.ts
export interface UserProfile {
    // Basic info
    id: string
    username: string
    displayName: string
    email: string
    avatar?: string
    bio?: string
    location?: string

    // Pickleball info
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    playStyle?: string
    yearsPlaying?: number
    preferredHand?: 'left' | 'right'

    // Stats
    matchesPlayed: number
    winRate?: number
    currentRating?: number

    // Privacy settings
    privacy: {
        showLocation: 'public' | 'friends' | 'private'
        showStats: 'public' | 'friends' | 'private'
    }

    createdAt: string
}

export interface UserProfileUpdate {
    displayName?: string
    avatar?: string
    bio?: string
    location?: string
    skillLevel?: SkillLevel
    playStyle?: PlayStyle
    yearsPlaying?: number
    preferredHand?: 'left' | 'right' | 'ambidextrous'
    privacy?: Partial<UserProfile['privacy']>
}
