import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BoardItemProps } from "@/src/components/home/board_item";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen
        name="index"
        options={{
          title: "Boards",
        }}
        />
        <Stack.Screen
        name="board"
        options={{
          title: "Board", //breyta í nafnið á boardinu
        }}
        />
        <Stack.Screen
        name="list"
        options={{
          title: "List",
        }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}