'use client'

import { useAuth } from 'root/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            setTimeout(() => {
                router.push('/login')
            }, 3000)
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <div> You are not Authorized to be here FN </div>
    }

    return <>{children}</>
}
