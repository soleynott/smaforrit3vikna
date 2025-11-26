import { View, Text, Image, StyleSheet } from "react-native";
//display one list, used in board_lists to show all lists for certain board
interface ListItemProps {
    id: number;
    name: string;
    color: string;
    boardId: number;
}
//need to add nav to list view, which displays all tasks for certain list onclick
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