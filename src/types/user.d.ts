// types/user.ts

export type SkillLevel =
    | 'BEGINNER'
    | 'INTERMEDIATE'
    | 'ADVANCED'
    | 'PRO'
    | undefined
export type PlayStyle =
    | 'AGGRESSIVE'
    | 'DEFENSIVE'
    | 'BALANCED'
    | 'STRATEGIC'
    | undefined

export type Handedness = 'LEFT' | 'RIGHT' | 'AMBIDEXTROUS'
export type PrivacyType = 'PUBLIC' | 'FRIENDS' | 'PRIVATE'
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
    dupr?: number

    // Privacy settings
    privacy: {
        allowMatchRequests: boolean
        showLocation: PrivacyType
        showStats: PrivacyType
    } | null

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
    matchesPlayed?: number
    winRate?: number
    currentRating?: number
    dupr?: number
    privacy?: Partial<UserProfile['privacy']>
}
