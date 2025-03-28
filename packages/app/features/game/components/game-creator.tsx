import { Button, Checkbox, getTokenValue, Input, Label, View, YStack } from '@my/ui'
import { ArrowLeft, ArrowRight, Check } from '@tamagui/lucide-icons'
import { createPlayer, GameState } from 'app/store'
import { Dispatch, SetStateAction, useState } from 'react'

const GameCreator = ({ Games, id }: { Games: GameState; id: string }) => {
  const [page, setPage] = useState(0)
  const [singles, setSingles] = useState(false)
  const [teamAName, setTeamAName] = useState(Games.games[id].teamA.name)
  const [p1A, setP1A] = useState(Games.games[id].teamA.playerA.name)
  const [p2A, setP2A] = useState(Games.games[id].teamA.playerB?.name)
  // team B
  const [teamBName, setTeamBName] = useState(Games.games[id].teamB.name)
  const [p1B, setP1B] = useState(Games.games[id].teamB.playerA.name)
  const [p2B, setP2B] = useState(Games.games[id].teamB.playerB?.name)

  const startGame = () => {
    console.debug('Starting game')
    let currentGame = { ...Games.games[id] }
    currentGame.teamA.name = teamAName
    currentGame.teamB.name = teamBName
    currentGame.teamA.playerA.name = p1A
    currentGame.teamB.playerA.name = p1B
    if (!singles) {
      currentGame.teamA.playerB = createPlayer(true)
      currentGame.teamB.playerB = createPlayer(true)
      currentGame.teamA.playerB!.name! = p2A!
      currentGame.teamB.playerB!.name! = p2B!
    }
    Games.startGame(currentGame)
  }

  return (
    <YStack my="$5" gap="$5" width="90%" mx="auto">
      {page === 0 && (
        <YStack>
          <YStack>
            <Label htmlFor="player a name">Is this a 1v1?</Label>
            <Checkbox
              id="is2Player"
              checked={singles}
              onCheckedChange={(e) => {
                console.log(e)
                setSingles(e)
              }}
            >
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>
          </YStack>
          {/* Team A Name */}
          <YStack>
            <Label htmlFor="team-a-name">Team Name</Label>
            <Input
              id="team-a-name"
              defaultValue="Team A"
              value={teamAName}
              onChangeText={setTeamAName}
            />
          </YStack>

          {/* Player A Name */}
          <YStack>
            <Label htmlFor="team-a-player-a-name">Player A</Label>
            <Input
              id="team-a-player-a-name"
              defaultValue="Player A"
              value={p1A}
              onChangeText={setP1A}
            />
          </YStack>
          {/* Player B(?) Name */}
          {!singles && (
            <YStack>
              <Label htmlFor="team-a-player-b-name">Player B</Label>
              <Input
                disabled={singles}
                id="team-a-player-b-name"
                defaultValue={singles ? '' : 'Player B'}
                value={p2A}
                onChangeText={setP2A}
              />
            </YStack>
          )}
        </YStack>
      )}

      {page === 1 && (
        <YStack>
          {/* Team B Name */}
          <YStack>
            <Label htmlFor="team-b-name">Team Name</Label>
            <Input
              id="team-b-name"
              defaultValue="Team B"
              value={teamBName}
              onChangeText={setTeamBName}
            />
          </YStack>

          {/* Player A Name */}
          <YStack>
            <Label htmlFor="team-b-player-a-name">Player A</Label>
            <Input
              id="team-b-player-a-name"
              defaultValue="Player A"
              value={p1B}
              onChangeText={setP1B}
            />
          </YStack>

          {/* Player B(?) Name */}
          {!singles && (
            <YStack>
              <Label htmlFor="team-b-player-b-name">Player B</Label>
              <Input
                id="team-b-player-b-name"
                defaultValue="Player B"
                value={p2B}
                onChangeText={setP2B}
              />
            </YStack>
          )}
        </YStack>
      )}

      {page === 2 && (
        <YStack>
          {/* Pick Server */}
          {/* Flip Coin or Select */}
          <Button theme="green" onPress={startGame}>
            Start Game
          </Button>
        </YStack>
      )}
      <PaginationControl bounded numPages={3} page={page} setPage={setPage} />
    </YStack>
  )
}

export default GameCreator

export const PaginationControl = ({
  page,
  numPages,
  hideControls,
  bounded,
  setPage,
}: {
  page: number
  numPages: number
  setPage: Dispatch<SetStateAction<number>>
  hideControls?: boolean
  bounded?: boolean
}) => {
  const handlePrevClick = () => {
    setPage((prevIndex) => (bounded && prevIndex <= 1 ? 0 : (prevIndex - 1 + numPages) % numPages))
  }
  const handleNextClick = () => {
    setPage((prevIndex) =>
      bounded && prevIndex >= numPages - 1 ? numPages - 1 : (prevIndex + 1) % numPages
    )
  }

  const paginationWidth = (2 * getTokenValue('$2') + (numPages - 1) * getTokenValue('$0.75')) * 10

  return (
    <View flex={1} flexDirection="row" alignItems="center" justifyContent="center" mt="$5" gap="$3">
      <Button
        display={hideControls || page == 0 ? 'none' : 'block'}
        size="$4"
        circular
        icon={ArrowLeft}
        scaleIcon={1.5}
        onPress={handlePrevClick}
        disabled={bounded && page === 0}
      />
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="$3"
        backgroundColor="$color5"
        width={paginationWidth}
        height="$4"
        paddingHorizontal="$4"
        borderRadius="$8"
      >
        {Array.from({ length: numPages }).map((_, index) => (
          <View
            key={index}
            width={page === index ? '$2' : '$0.75'}
            height="$0.75"
            borderRadius="$5"
            backgroundColor={page === index ? '$color12' : '$color10'}
            animation="200ms"
          />
        ))}
      </View>
      <Button
        display={hideControls || page == numPages - 1 ? 'none' : 'block'}
        size="$4"
        circular
        icon={ArrowRight}
        scaleIcon={1.5}
        onPress={handleNextClick}
        disabled={bounded && page === numPages - 1}
      />
    </View>
  )
}
