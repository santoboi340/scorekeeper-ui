import { Button, Input, Label, View, YStack, getTokenValue } from '@my/ui'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { GameState } from 'app/store'
import { Dispatch, SetStateAction, useState } from 'react'

const GameCreator = ({ Games, id }: { Games: GameState; id: string }) => {
  const [page, setPage] = useState(0)
  const [teamAName, setTeamAName] = useState(Games.games[id].teamA.name)
  const [p1A, setP1A] = useState(Games.games[id].teamA.name)
  const [p2A, setP2A] = useState(Games.games[id].teamA.name)
  // const game = Games.games[id]

  return (
    <YStack my="$5" gap="$5">
      {page === 0 && (
        <YStack>
          {/* Team A Name */}
          <Label htmlFor="team name">Team Name</Label>
          <Input
            id="team-name"
            defaultValue="Team A"
            value={teamAName}
            onChangeText={setTeamAName}
          />

          {/* Player A Name */}
          <Label htmlFor="player a name">Player A</Label>
          <Input id="player-a-name" defaultValue="Player A" value={p1A} onChangeText={setP1A} />
          {/* Player B(?) Name */}
          <Label htmlFor="player a name">Player B</Label>
          <Input id="player-b-name" defaultValue="Player b" value={p2A} onChangeText={setP2A} />
        </YStack>
      )}

      {page === 1 && (
        <YStack>
          {/* Team B Name */}
          {/* Player A Name */}
          {/* Player B(?) Name */}
        </YStack>
      )}

      {page === 2 && (
        <YStack>
          {/* Pick Server */}
          {/* Flip Coin or Select */}
        </YStack>
      )}
      <PaginationControl bounded numPages={5} page={page} setPage={setPage} />
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
    <View flex={1} flexDirection="row" alignItems="center" justifyContent="center" gap="$3">
      <Button
        display={hideControls ? 'none' : 'block'}
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
        display={hideControls ? 'none' : 'block'}
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
