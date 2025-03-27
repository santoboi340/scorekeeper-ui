import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useGames } from 'app/store'
import { useRouter } from 'solito/navigation'

export function GameDetailScreen({ id }: { id: string }) {
  const router = useRouter()
  const Game = useGames()

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
        <Paragraph ta="center" fow="700" col="$blue10">{`Game ID: ${id}`}</Paragraph>
        <Button icon={ChevronLeft} onPress={() => router.back()}>
          Go Back
        </Button>
      </YStack>
    )
}
