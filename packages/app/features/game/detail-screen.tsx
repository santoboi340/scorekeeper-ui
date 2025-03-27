import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useGames } from 'app/store'
import { format } from 'date-fns'
import { useRouter } from 'solito/navigation'
import GameCreator from './components/game-creator'

export function GameDetailScreen({ id }: { id: string }) {
  const router = useRouter()
  const Games = useGames()
  const game = Games['games'][id]!

  if (!id) {
    return (
      <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
        <Paragraph ta="center" fow="700" col="$blue10">
          Game Not Found
        </Paragraph>
        <Button icon={ChevronLeft} onPress={() => router.back()}>
          Go Back
        </Button>
      </YStack>
    )
  } else
    return (
      <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
        <YStack my="$4" gap="$5">
          <Paragraph ta="center" mx="auto" fow="700" col="$blue10">
            {format(game.createdAt, 'PP')}
          </Paragraph>

          {game.status === 'NEW' && <GameCreator Games={Games} id={game.id} />}

          {game.status === 'ACTIVE' && (
            <Paragraph ta="center" mx="auto" fow="700" col="$blue10">
              {format(game.createdAt, 'PP')}
            </Paragraph>
          )}

          {game.status === 'COMPLETE' && (
            <Paragraph ta="center" mx="auto" fow="700" col="$blue10">
              {format(game.createdAt, 'PP')}
            </Paragraph>
          )}
        </YStack>
        <Button icon={ChevronLeft} onPress={() => router.back()}>
          Go Back
        </Button>
      </YStack>
    )
}
