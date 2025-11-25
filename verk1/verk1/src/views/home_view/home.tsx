import { View } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "./styles_home";

/*test function*/
export function Main() {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Boards" }} />
        </Stack>
      </GestureHandlerRootView>
    </View>
  );
}
