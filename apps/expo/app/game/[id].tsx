import { GameDetailScreen } from 'app/features/game/detail-screen'
import { Stack } from 'expo-router'
import { useParams } from 'solito/navigation'

export default function Screen() {
  const { id } = useParams()
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Game',
          presentation: 'modal',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <GameDetailScreen id={id as string} />
    </>
  )
}
