import { Button, View, YStack, getTokenValue } from '@my/ui'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { GameState } from 'app/store'
import { Dispatch, SetStateAction, useState } from 'react'

const GameCreator = ({ Games }: { Games: GameState }) => {
  const [page, setPage] = useState(0)

  return (
    <YStack>
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
