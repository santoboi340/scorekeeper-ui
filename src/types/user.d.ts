export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PRO'
export type PlayStyle = 'AGGRESSIVE' | 'DEFENSIVE' | 'BALANCED' | 'STRATEGIC'
export type Handedness = 'LEFT' | 'RIGHT' | 'AMBIDEXTROUS'
export type PrivacyType = 'PUBLIC' | 'FRIENDS' | 'PRIVATE'

export interface User {
    id: string
    uuid?: string
    email: string
    firstname?: string
    lastname?: string
    role?: 'user' | 'admin'
}

export interface UserProfile {
    id: string
    userName: string
    displayName: string
    email: string
    avatar?: string
    bio?: string
    location?: string

    skillLevel?: SkillLevel
    playStyle?: PlayStyle
    yearsPlaying?: number
    preferredHand?: Handedness

    matchesPlayed: number
    winRate?: number
    currentRating?: number
    dupr?: number

    privacy: {
        allowMatchRequests: boolean
        showLocation: PrivacyType
        showStats: PrivacyType
        showMatchHistory: PrivacyType
    } | null

    createdAt: string
    updatedAt?: string
}

export interface UserProfilePreview {
    userName: string
    displayName: string | null
    bio: string | null
    dupr: number
    avatar: string | null
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
    privacy?: Partial<NonNullable<UserProfile['privacy']>>
}
