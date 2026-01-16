export type UserRole = 'USER' | 'ADMIN'

export interface RegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
    role: UserRole
}

export interface RegisterResponse {
    success: boolean
    user?: {
        id: string
        email: string
        firstName: string
        lastName: string
        role: UserRole
    }
    token?: string
    message: string
    code: number
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    access_token: string
    message: string
    code: number
}

export interface AuthError {
    message: string
    code?: number
    errors?: Record<string, string>
}
