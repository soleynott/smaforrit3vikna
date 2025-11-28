import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TaskProvider } from "@/src/context/TaskContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <TaskProvider>
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
            title: "Lists",
          }}
          />
          <Stack.Screen
          name="list"
          options={{
            title: "Tasks",
          }}
          />
        </Stack>
      </TaskProvider>
    </GestureHandlerRootView>
  );
}
