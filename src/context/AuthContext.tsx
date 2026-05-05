'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    type ReactNode,
} from 'react'
import type { User, JWTPayload, AuthContextType } from './AuthContext.d'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { tokenStorage } from 'root/lib/tokenStorage'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const extractUser = (decoded: JWTPayload): User => ({
    id: decoded.sub || decoded.userId || 'unknown',
    uuid: decoded.uuid,
    email: decoded.email,
    firstname: decoded.firstname,
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    console.log('current user is', user)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = tokenStorage.get()
        if (!token) {
            setIsLoading(false)
            return
        }

        try {
            const decoded = jwtDecode<JWTPayload>(token)
            if (decoded.exp && decoded.exp < Date.now() / 1000) {
                tokenStorage.clear()
            } else {
                setUser(extractUser(decoded))
            }
        } catch {
            tokenStorage.clear()
        } finally {
            setIsLoading(false)
        }
    }, [])

    const login = useCallback((token: string, remember = false) => {
        try {
            const decoded = jwtDecode<JWTPayload>(token)
            tokenStorage.set(token, remember)
            setUser(extractUser(decoded))
        } catch (error) {
            console.error('Failed to decode token:', error)
        }
    }, [])

    const logout = useCallback(() => {
        tokenStorage.clear()
        setUser(null)
        router.push('/')
    }, [router])

    return (
        <AuthContext.Provider
            value={{ user, isLoading, isAuthenticated: !!user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
