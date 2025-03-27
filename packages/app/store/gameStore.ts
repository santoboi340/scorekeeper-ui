import { create } from 'zustand'

export type GameState = {
  games: Game[]
  addGame: (id: string) => void
}

type Game = {
  id: string
  teamA: { playerA: { name: string; points?: number }; playerB?: { name: string; points?: number } }
  teamB: { playerA: { name: string; points?: number }; playerB?: { name: string; points?: number } }
  score: number
  status: 'ACTIVE' | 'COMPLETE'
}

export const useGames = create<GameState>((set) => ({
  games: [],
  addGame: (id: string) => set((state) => ({ games: [...state.games, createGame(id)] })),
}))

const createGame = (id: string): Game => {
  return {
    id,
    teamA: {
      playerA: {
        name: 'Player A',
        points: 0,
      },
    },
    teamB: {
      playerA: {
        name: 'Player A',
        points: 0,
      },
    },
    status: 'ACTIVE',
    score: 0,
  }
}
