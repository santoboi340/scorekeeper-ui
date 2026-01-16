// contexts/AuthContext.tsx
'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

interface User {
    id: string
    email: string
    firstname: string
    lastname: string
    role: string
}

interface JWTPayload {
    sub?: string // Standard JWT "subject" claim (usually user ID)
    userId?: string // Some APIs use this instead
    email: string
    firstname: string
    lastname: string
    role: string
    exp: number // Expiration timestamp
    iat: number // Issued at timestamp
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function getStoredToken(): string | null {
    if (typeof window === 'undefined') return null
    return (
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token')
    )
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const verifyAuth = () => {
            const token = getStoredToken()

            if (!token) {
                setIsLoading(false)
                return
            }

            try {
                const decoded = jwtDecode<JWTPayload>(token)

                // Check if token is expired
                const now = Date.now() / 1000 // Convert to seconds
                if (decoded.exp && decoded.exp < now) {
                    console.warn(
                        '⏰ Token expired at',
                        new Date(decoded.exp * 1000)
                    )
                    localStorage.removeItem('access_token')
                    sessionStorage.removeItem('access_token')
                    setIsLoading(false)
                    return
                }

                // Extract user from token
                const userData: User = {
                    id: decoded.sub || decoded.userId || 'unknown',
                    email: decoded.email,
                    firstname: decoded.firstname,
                    lastname: decoded.lastname,
                    role: decoded.role,
                }

                console.log('✅ User authenticated from token:', userData)
                setUser(userData)
            } catch (error) {
                console.error('❌ Invalid token:', error)
                localStorage.removeItem('access_token')
                sessionStorage.removeItem('access_token')
            } finally {
                setIsLoading(false)
            }
        }

        verifyAuth()
    }, [])

    const login = (token: string) => {
        try {
            const decoded = jwtDecode<JWTPayload>(token)

            const userData: User = {
                id: decoded.sub || decoded.userId || 'unknown',
                email: decoded.email,
                firstname: decoded.firstname,
                lastname: decoded.lastname,
                role: decoded.role,
            }

            console.log('✅ User loaded from token:', userData)
            setUser(userData)
        } catch (error) {
            console.error('❌ Failed to decode token:', error)
        }
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('access_token')
        localStorage.removeItem('remembered_email')
        setUser(null)
        router.push('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
