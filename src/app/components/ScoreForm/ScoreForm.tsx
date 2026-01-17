// src/app/components/ScoreForm.tsx
'use client'

import { useState } from 'react'
import { useCreateScore } from 'root/hooks/useDashboardApis'

export default function ScoreForm() {
    const [game, setGame] = useState('')
    const [score, setScore] = useState(0)

    const createScore = useCreateScore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        createScore.mutate(
            { game, score },
            {
                onSuccess: () => {
                    // Reset form
                    setGame('')
                    setScore(0)
                    alert('Score created!')
                },
                onError: (error) => {
                    alert(`Failed: ${error.message}`)
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={game}
                onChange={(e) => setGame(e.target.value)}
                placeholder="Game name"
            />
            <input
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                placeholder="Score"
            />
            <button type="submit" disabled={createScore.isPending}>
                {createScore.isPending ? 'Creating...' : 'Create Score'}
            </button>
            {createScore.error && <p>Error: {createScore.error.message}</p>}
        </form>
    )
}
