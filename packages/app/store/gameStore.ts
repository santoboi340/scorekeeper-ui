import { create } from 'zustand'

export type GameState = {
  games: Record<string, Game>
  addGame: (id: string) => void
  startGame: (game: Game) => void
  getGame: (id: string) => Game
}

type Game = {
  id: string
  teamA: {
    name?: string
    playerA: { name: string; points?: number }
    playerB?: { name: string; points?: number }
  }
  teamB: {
    name?: string
    playerA: { name: string; points?: number }
    playerB?: { name: string; points?: number }
  }
  score: number
  createdAt: Date
  status: 'NEW' | 'ACTIVE' | 'COMPLETE'
}

export const useGames = create<GameState>((set, get) => ({
  games: {},
  addGame: (id: string) =>
    set((state) => {
      state.games[id] = createGame(id)
      return state
    }),
  startGame: (game: Game) =>
    set((state) => {
      game.status = 'ACTIVE'
      state.games[game.id] = game
      console.log('game id=%s | status=%s', game.id, game.status)
      return state
    }),
  getGame: (id: string) => get().games[id],
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
    createdAt: new Date(),
    status: 'NEW',
    score: 0,
  }
}

export const createPlayer = (isPlayer2?: boolean) => {
  return {
    name: isPlayer2 ? 'Player B' : 'Player A',
    points: 0,
  }
}
