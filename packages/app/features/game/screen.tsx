import { Button, Card, H3, H5, Paragraph, ScrollView, XStack, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { GameState, useGames } from 'app/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'solito/navigation'

export function GameScreen() {
  const router = useRouter()
  const state = useGames()
  const [games, setGames] = useState<GameState['games'][string][]>()

  useEffect(() => {
    const sorted = Object.values(state.games).sort((a, b) => {
      return a.createdAt.toISOString().localeCompare(b.createdAt.toISOString())
    })
    setGames(sorted)
  }, [state.games])

  return (
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
      <H3 mx="auto" my="$5" fow="700" col="$blue10">
        Match History
      </H3>

      <ScrollView maxH="80%" width="80%" $md={{ width: '50%' }} $lg={{ width: '35%' }} mx="auto">
        <YStack gap="$5">
          {games && games.length > 0 ? (
            games.map((game, idx) => <GameCard key={idx} index={idx} game={game} router={router} />)
          ) : (
            <></>
          )}
        </YStack>
      </ScrollView>
      <Button icon={ChevronLeft} onPress={() => router.back()}>
        Go Home
      </Button>
    </YStack>
  )
}

const GameCard = ({
  game,
  index,
  router,
}: {
  game: GameState['games'][string]
  index: number
  router: { push: (path: string) => void }
}) => {
  return (
    <Card onPress={() => router.push('/game/' + game.id)}>
      <Card.Header>
        <YStack>
          <XStack key={game.id} mx="auto" gap="$5">
            <H5 size="$7" my="auto">
              #{index}
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
          <Paragraph mx="auto">{game.createdAt.toISOString()}</Paragraph>
        </YStack>
      </Card.Header>
    </Card>
  )
}
