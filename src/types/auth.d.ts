export type UserRole = 'USER' | 'ADMIN'

// src/types/auth.ts
export interface RegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'USER' | 'ADMIN'
}

export interface RegisterResponse {
    access_token: string
    message: string
    code: number
    user?: {
        id: string
        email: string
        firstName: string
        lastName: string
    }
}

export interface AuthError {
    message: string
    code?: number
    errors?: Partial<Record<keyof RegisterRequest, string>>
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
