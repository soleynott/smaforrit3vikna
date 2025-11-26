import { View, Text, Image, StyleSheet } from "react-native";

interface ListItemProps {
    id: number;
    name: string;
    color: string;
    boardId: number;
}

export function ListItem(props: ListItemProps) {
    return ( 
        <View style={styles.container}>
            <Text>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 5,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#a9d9e5",
    borderRadius: 16,
    paddingBottom: 12,
  }
});