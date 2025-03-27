import { Button, H3, H5, Paragraph, XStack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useGames } from 'app/store'
import { useRouter } from 'solito/navigation'

export function GameScreen() {
  const router = useRouter()
  const Games = useGames()

  return (
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
      <H3 mx="auto" my="$5" fow="700" col="$blue10">
        Match History
      </H3>

      <YStack width="80%" $md={{ width: '50%' }} $lg={{ width: '35%' }} mx="auto">
        {Games.games.length > 0 ? (
          Games.games.map((game, idx) => (
            <XStack key={game.id} mx="auto" gap="$5">
              <H5 size="$7" my="auto">
                #{idx}
              </H5>
              <YStack>
                <XStack gap="$5">
                  <H5>Team A</H5>
                  {game.teamA.playerB ? (
                    <Paragraph>
                      {game.teamA.playerA.points! + game.teamA.playerB.points! + ' Points'}
                    </Paragraph>
                  ) : (
                    <Paragraph>{game.teamA.playerA.points! + ' Points'}</Paragraph>
                  )}
                </XStack>

                <XStack gap="$5">
                  <H5>Team B</H5>
                  {game.teamB.playerB ? (
                    <Paragraph>
                      {game.teamB.playerA.points! + game.teamB.playerB.points! + ' Points'}
                    </Paragraph>
                  ) : (
                    <Paragraph>{game.teamB.playerA.points! + ' Points'}</Paragraph>
                  )}
                </XStack>
              </YStack>
            </XStack>
          ))
        ) : (
          <></>
        )}
      </YStack>
      <Button icon={ChevronLeft} onPress={() => router.back()}>
        Go Home
      </Button>
    </YStack>
  )
}
