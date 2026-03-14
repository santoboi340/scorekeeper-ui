'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAllProfiles } from '../../hooks/userProfile'
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
    return (
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
    )
}
