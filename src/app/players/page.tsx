'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useAllProfiles, useProfilePreview } from '../../hooks/userProfile'
import type { UserProfile } from '../../types/user'

export default function PlayersPage() {
    const { data: players, isLoading, isError, error } = useAllProfiles()
    const [search, setSearch] = useState('')

    const filtered = players?.filter((p) =>
        [p.displayName, p.userName, p.location]
            .filter(Boolean)
            .some((field) =>
                field!.toLowerCase().includes(search.toLowerCase())
            )
    )

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-cream">
                <p className="text-secondary-green">
                    {error?.message || 'Failed to load players'}
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cream">
            <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary-green mb-6">
                    Players
                </h1>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or location..."
                    className="w-full px-4 py-3 mb-6 border-2 border-neutral rounded-lg text-secondary-green focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal"
                />

                {!filtered?.length ? (
                    <p className="text-secondary-green text-center py-8">
                        No players found.
                    </p>
                ) : (
                    <div className="grid gap-4">
                        {filtered.map((player) => (
                            <PlayerCard
                                key={player.id ?? player.userName}
                                player={player}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function PlayerCard({ player }: { player: UserProfile }) {
    const [hovered, setHovered] = useState(false)
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleEnter = () => {
        hoverTimeout.current = setTimeout(() => setHovered(true), 300)
    }

    const handleLeave = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
        setHovered(false)
    }

    useEffect(() => {
        return () => {
            if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
        }
    }, [])

    return (
        <div
            ref={cardRef}
            className="relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <Link
                href={`/profile/${player.userName}`}
                className="flex items-center gap-4 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
                <div className="w-12 h-12 rounded-full bg-primary-green flex items-center justify-center shrink-0 border-2 border-pickleball-yellow">
                    <span className="text-lg font-bold text-cream">
                        {player.displayName?.charAt(0).toUpperCase() ?? '?'}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-primary-green truncate">
                        {player.displayName}
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary-green">
                        {player.location && <span>{player.location}</span>}
                        {player.skillLevel && (
                            <span className="capitalize">
                                {player.skillLevel.toLowerCase()}
                            </span>
                        )}
                        {player.dupr !== undefined && player.dupr > 0 && (
                            <span>DUPR {player.dupr}</span>
                        )}
                    </div>
                </div>

                <div className="hidden sm:flex gap-4 text-center shrink-0">
                    {player.matchesPlayed !== undefined && (
                        <div>
                            <p className="text-lg font-bold text-primary-green">
                                {player.matchesPlayed}
                            </p>
                            <p className="text-xs text-secondary-green uppercase">
                                Matches
                            </p>
                        </div>
                    )}
                    {player.winRate !== undefined && (
                        <div>
                            <p className="text-lg font-bold text-primary-green">
                                {player.winRate}%
                            </p>
                            <p className="text-xs text-secondary-green uppercase">
                                Win Rate
                            </p>
                        </div>
                    )}
                </div>
            </Link>

            {hovered && (
                <ProfilePreviewPopover userName={player.userName} />
            )}
        </div>
    )
}

function ProfilePreviewPopover({ userName }: { userName: string }) {
    const { data: preview, isLoading } = useProfilePreview(userName)

    return (
        <div className="absolute z-50 top-full left-4 mt-2 w-72 bg-white rounded-lg shadow-lg border border-neutral/30 p-4 animate-fade-in">
            <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-neutral/30 rotate-45" />

            {isLoading ? (
                <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal" />
                </div>
            ) : !preview ? (
                <p className="text-sm text-secondary-green text-center py-4">
                    Preview unavailable
                </p>
            ) : (
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center shrink-0 border-2 border-pickleball-yellow">
                            <span className="text-sm font-bold text-cream">
                                {preview.displayName?.charAt(0).toUpperCase() ?? preview.userName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-primary-green truncate">
                                {preview.displayName ?? preview.userName}
                            </p>
                        </div>
                    </div>

                    {preview.bio && (
                        <p className="text-xs text-secondary-green mb-3 line-clamp-2">
                            {preview.bio}
                        </p>
                    )}

                    {preview.dupr > 0 && (
                        <div className="bg-cream rounded p-2 text-center mb-3">
                            <p className="text-sm font-bold text-primary-green">
                                {preview.dupr}
                            </p>
                            <p className="text-[10px] text-secondary-green uppercase">
                                DUPR
                            </p>
                        </div>
                    )}

                    <div className="pt-3 border-t border-neutral/20 text-center">
                        <span className="text-xs text-teal font-semibold">
                            Click to view full profile
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
