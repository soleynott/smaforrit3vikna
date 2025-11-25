import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/board" style ={styles.button}>
      go to board screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
  }
});