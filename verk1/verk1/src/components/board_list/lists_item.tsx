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
          <View style={[styles.notch, { backgroundColor: props.color }]} />
          <Text style={styles.name}>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 5,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    elevation: 1,
  },
  notch: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 22, // notch width
    borderTopLeftRadius: 12,   // only left corners rounded
    borderBottomLeftRadius: 12,
  },
  name: {
    marginLeft: 18, // push text away from notch
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});