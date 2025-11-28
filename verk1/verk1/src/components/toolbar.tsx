import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native";

interface ToolbarProps {
    name: string;
    onAdd: () => void;
    onEdit: () => void;
}

export function Toolbar(props: ToolbarProps) {
    return(
        <View style={styles.toolbar}>
            <TouchableHighlight style={styles.toolbarAction} onPress={props.onAdd}>
                <Text style={styles.toolbarActionText}>Add New {props.name}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.toolbarAction} onPress={props.onEdit}>
                <Text style={styles.toolbarActionText}>Edit {props.name}</Text>
            </TouchableHighlight>
        </View>
    );
}



const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    backgroundColor: "#c6e6ef",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  toolbarAction: {
    padding: 6,
  },

  toolbarActionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#002f40"
  },
});
