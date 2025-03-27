import { GameScreen } from 'app/features/game/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Match History',
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <GameScreen />
    </>
  )
}
