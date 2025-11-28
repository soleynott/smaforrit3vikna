import { View, Text, TouchableHighlight } from "react-native";
import styles from "./toolbar_styles";

interface ToolbarProps {
  name: string;
  onAdd: () => void;
  onEdit: () => void;
}

export function Toolbar(props: ToolbarProps) {
  return (
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
