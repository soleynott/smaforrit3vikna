import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
        />
        <Stack.Screen
        name="board/[id]"
        options={{
          title: "Board",
        }}
        />
        <Stack.Screen
        name="list/[id]"
        options={{
          title: "List",
        }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}