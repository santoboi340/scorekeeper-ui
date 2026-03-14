import type { User } from '../types/user'

export type { User }

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (token: string, remember?: boolean) => void
    logout: () => void
}

export interface JWTPayload {
    sub?: string
    userId?: string
    email: string
    firstname: string
    lastname: string
    role: string
    exp: number
    iat: number
    uuid: string
}
