import { Main } from "@/src/views/home_view/home";

export default Main;
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Home'}}></Stack.Screen>
      <Stack.Screen name="board" options={{ title: 'Boards'}}></Stack.Screen>
    </Stack>
  );
}
