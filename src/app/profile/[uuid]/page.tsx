// app/profile/[username]/page.tsx

'use client'

import { useProfile } from '../../../hooks/userProfile'
import ProfileView from '../../components/Profile/ProfileView'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/ProtectedRoute.tsx/ProtectedRoute'
import { useParams } from 'next/navigation'

export default function ProfilePage() {
    // Unwrap the params Promise
    const { uuid } = useParams()
    console.log(uuid)
    const { data, isLoading, isError, error } = useProfile(uuid)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-cream px-4">
                <div className="text-center">
                    {/* Spinner */}
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
                    <p className="text-secondary-green">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-cream px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary-green mb-2">
                        404
                    </h1>
                    <p className="text-secondary-green mb-4">
                        {(error && error.message) || 'Profile not found'}
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
                    <h1 className="text-3xl font-bold">{data.displayName}</h1>
                    <p>{data.bio}</p>
                    <ProfileView
                        profile={data}
                        onEdit={() =>
                            console.log('Edit clicked - we will add this next!')
                        }
                    />
                </div>
            </div>
        </ProtectedRoute>
    )
}
