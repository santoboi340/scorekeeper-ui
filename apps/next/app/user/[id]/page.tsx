'use client'

import { GameDetailScreen } from 'app/features/game/detail-screen'
import { useParams } from 'solito/navigation'

export default function Page() {
  const { id } = useParams()
  return <GameDetailScreen id={id as string} />
}
