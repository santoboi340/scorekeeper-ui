export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (token: string, remember?: boolean) => void
    logout: () => void
}

export interface User {
    id: string
    uuid?: string
    email: string
}

export interface JWTPayload {
    sub?: string // Standard JWT "subject" claim (usually user ID)
    userId?: string // Some APIs use this instead
    email: string
    firstname: string
    lastname: string
    role: string
    exp: number // Expiration timestamp
    iat: number // Issued at timestamp,
    uuid: string
}
