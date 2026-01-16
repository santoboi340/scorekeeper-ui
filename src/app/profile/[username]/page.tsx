// app/profile/[username]/page.tsx

'use client'

import { use } from 'react'
import { useProfile } from '../../../hooks/userProfile'
import ProfileView from '../../components/Profile/ProfileView'
import Link from 'next/link'
import { ProtectedRoute } from '@/app/components/ProtectedRoute.tsx/ProtectedRoute'
export default function ProfilePage({
    params,
}: {
    params: Promise<{ username: string }>
}) {
    // Unwrap the params Promise
    const { username } = use(params)

    const { profile, isLoading, error } = useProfile(username)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-cream px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
                    <p className="text-secondary-green">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-cream px-4">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-green mb-2">
                        404
                    </h1>
                    <p className="text-secondary-green mb-4">
                        {error || 'Profile not found'}
                    </p>
                    <Link
                        href="/"
                        className="text-teal hover:text-burnt-orange transition-colors font-semibold"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-cream">
                <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
                    <ProfileView
                        profile={profile}
                        onEdit={() =>
                            console.log(
                                'Edit clicked - TODO: implement edit mode'
                            )
                        }
                    />
                </div>
            </div>
        </ProtectedRoute>
    )
}
