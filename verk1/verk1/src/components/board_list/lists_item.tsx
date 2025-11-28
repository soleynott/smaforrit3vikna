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
    width: "94%",
    marginVertical: 6,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingLeft: 20,   // better alignment with notch
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    
    // Softer iOS-like shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  notch: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 12,                // slimmer + cleaner
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },

  name: {
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "600",
    color: "#272727",
  },
});
