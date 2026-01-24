// components/profile/ProfileEdit.tsx

import { useState } from 'react'
import {
    UserProfile,
    UserProfileUpdate,
    SkillLevel,
    PlayStyle,
} from '../../types/user'

interface ProfileEditProps {
    profile: UserProfile
    onSave: (updates: UserProfileUpdate) => Promise<void>
    onCancel: () => void
}

export default function ProfileEdit({
    profile,
    onSave,
    onCancel,
}: ProfileEditProps) {
    const [formData, setFormData] = useState<UserProfileUpdate>({
        displayName: profile.displayName,
        bio: profile.bio || '',
        location: profile.location || '',
        skillLevel: profile.skillLevel,
        playStyle: profile.playStyle,
        yearsPlaying: profile.yearsPlaying,
        preferredHand: profile.preferredHand,
        privacy: profile.privacy,
    })

    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            await onSave(formData)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-6"
        >
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

            {/* Display Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Display Name *
                </label>
                <input
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            displayName: e.target.value,
                        })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            {/* Bio */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    maxLength={500}
                    placeholder="Tell others about yourself..."
                    className="w-full px-3 py-2 border rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                    {formData.bio?.length || 0}/500 characters
                </p>
            </div>

            {/* Location */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Location
                </label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="City, State"
                    className="w-full px-3 py-2 border rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Keep it general (no street addresses)
                </p>
            </div>

            {/* Skill Level */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Skill Level *
                </label>
                <select
                    required
                    value={formData.skillLevel}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            skillLevel: e.target.value as SkillLevel,
                        })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="pro">Pro</option>
                </select>
            </div>

            {/* Play Style */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Play Style
                </label>
                <select
                    value={formData.playStyle || ''}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            playStyle:
                                (e.target.value as PlayStyle) || undefined,
                        })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="">Not specified</option>
                    <option value="aggressive">Aggressive</option>
                    <option value="defensive">Defensive</option>
                    <option value="balanced">Balanced</option>
                    <option value="strategic">Strategic</option>
                </select>
            </div>

            {/* Years Playing */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Years Playing
                </label>
                <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.yearsPlaying || ''}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            yearsPlaying: e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                        })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>

            {/* Preferred Hand */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                    Preferred Hand
                </label>
                <select
                    value={formData.preferredHand || ''}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            preferredHand: (e.target.value as any) || undefined,
                        })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="">Not specified</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                    <option value="ambidextrous">Ambidextrous</option>
                </select>
            </div>

            {/* Privacy Section */}
            <div className="border-t pt-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Who can see your location?
                        </label>
                        <select
                            value={
                                formData.privacy?.showLocation ||
                                profile.privacy.showLocation
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    privacy: {
                                        ...formData.privacy!,
                                        showLocation: e.target.value as any,
                                    },
                                })
                            }
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="public">Everyone</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Only Me</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Who can see your stats?
                        </label>
                        <select
                            value={
                                formData.privacy?.showStats ||
                                profile.privacy.showStats
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    privacy: {
                                        ...formData.privacy!,
                                        showStats: e.target.value as any,
                                    },
                                })
                            }
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="public">Everyone</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Only Me</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="allowMatchRequests"
                            checked={
                                formData.privacy?.allowMatchRequests ??
                                profile.privacy.allowMatchRequests
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    privacy: {
                                        ...formData.privacy!,
                                        allowMatchRequests: e.target.checked,
                                    },
                                })
                            }
                            className="mr-2"
                        />
                        <label htmlFor="allowMatchRequests" className="text-sm">
                            Allow others to send me match requests
                        </label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSaving}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 transition"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
