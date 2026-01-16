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
export interface UserProfile {
    id: string
    email: string

    // Basic Info
    displayName: string
    avatar?: string
    bio?: string
    location?: string // City/State only, not precise coords

    // Pickleball Specific
    skillLevel: SkillLevel
    playStyle?: PlayStyle
    yearsPlaying?: number
    preferredHand?: 'left' | 'right' | 'ambidextrous'

    // Stats (read-only, calculated from match history)
    matchesPlayed: number
    winRate?: number
    currentRating?: number

    // Privacy Controls
    privacy: {
        showLocation: 'public' | 'friends' | 'private'
        showStats: 'public' | 'friends' | 'private'
        showMatchHistory: 'public' | 'friends' | 'private'
        allowMatchRequests: boolean
    }

    // Timestamps
    createdAt: string
    updatedAt: string
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
