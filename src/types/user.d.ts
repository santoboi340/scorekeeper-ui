// types/user.ts

export type SkillLevel =
    | 'beginner'
    | 'intermediate'
    | 'advanced'
    | 'pro'
    | undefined
export type PlayStyle =
    | 'aggressive'
    | 'defensive'
    | 'balanced'
    | 'strategic'
    | undefined

export type Handedness = 'left' | 'right' | 'ambidextrous'
export type PrivacyType = 'public' | 'friends' | 'private'
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
    skillLevel: SkillLevel
    playStyle?: PlayStyle
    yearsPlaying?: number
    preferredHand?: Handedness

    // Stats
    matchesPlayed: number
    winRate?: number
    currentRating?: number

    // Privacy settings
    privacy: {
        allowMatchRequests: boolean
        showLocation: PrivacyType
        showStats: PrivacyType
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
    preferredHand?: Handedness
    privacy?: Partial<UserProfile['privacy']>
}
