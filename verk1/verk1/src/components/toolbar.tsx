import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native";

export function Toolbar() {
    return(
        <View style={styles.toolbar}>
            <TouchableHighlight style={styles.toolbarAction}>
                <Text style={styles.toolbarActionText}>Add New Board</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.toolbarAction}>
                <Text style={styles.toolbarActionText}>Edit Board</Text>
            </TouchableHighlight>
        </View>
    );
}



const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "#a9d9e5",
  },
  toolbarAction: {
    flex: 1,
    alignItems: "center",
  },
  toolbarActionText: { 
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  }
});