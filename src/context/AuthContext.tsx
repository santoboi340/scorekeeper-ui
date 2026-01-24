/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'
import type { User, JWTPayload, AuthContextType } from './AuthContext.d'
import { jwtDecode } from 'jwt-decode'

/**
 * Create the Initial Context.
 * It should take the shape of the AuthContextType
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Helper Function in order to grab
 * whatever token the user has stored in
 * either local/session storage
 * @returns string | null
 */
const getStoredToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return (
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('access_token')
    )
}

/**
 * Create the Auth Provider.
 * This is the Container that wraps
 * the entire application.
 * This will enable the Context Functions
 * to be used anywhere within the app.
 * @param ReactNode
 * @returns <AuthContextProvider />
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyAuth = () => {
            const token = getStoredToken()

            if (!token) {
                setIsLoading(false)
                console.log('No Token Available in Session or Local Storage')
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
                    uuid: decoded.uuid,
                    email: decoded.email,
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
                uuid: decoded.uuid,
                email: decoded.email,
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
        window.location.href = '/'
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
