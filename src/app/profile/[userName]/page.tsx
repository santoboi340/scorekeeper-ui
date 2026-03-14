'use client'

import {
    useProfileByUsername,
    useMyProfile,
    useUpdateProfile,
} from '../../../hooks/userProfile'
import ProfileView from 'root/components/Profile/ProfileView'
import ProfileEdit from 'root/components/Profile/ProfileEdit'
import Link from 'next/link'
import { ProtectedRoute } from 'root/components/ProtectedRoute/ProtectedRoute'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function ProfilePage() {
    const { userName } = useParams<{ userName: string }>()
    const [isEditing, setIsEditing] = useState(false)

    const { data: me } = useMyProfile()
    const { data, isLoading, isError, error } = useProfileByUsername(userName)
    const { mutateAsync: updateProfile } = useUpdateProfile()

    const isOwnProfile = me?.userName === data?.userName

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
                    {isEditing && isOwnProfile ? (
                        <ProfileEdit
                            profile={data}
                            onSave={async (updates) => {
                                await updateProfile(updates)
                                setIsEditing(false)
                            }}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <ProfileView
                            profile={data}
                            onEdit={
                                isOwnProfile
                                    ? () => setIsEditing(true)
                                    : undefined
                            }
                        />
                    )}
                </div>
            </div>
        </ProtectedRoute>
    )
}
