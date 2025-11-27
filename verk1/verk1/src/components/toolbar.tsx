import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native";

interface ToolbarProps {
    hasSelectedImage: boolean;
    onAdd: () => void;
}

export function Toolbar(props: ToolbarProps) {
    return(
        <View style={styles.toolbar}>
            <TouchableHighlight style={styles.toolbarAction} onPress={props.onAdd}>
                <Text style={styles.toolbarActionText}>Add New Board</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.toolbarAction} onPress={onEdit} >
                <Text style={styles.toolbarActionText}>Edit {name}</Text>
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