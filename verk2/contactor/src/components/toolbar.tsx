import { View, Text, TouchableHighlight } from "react-native";
import styles from "./toolbar_styles";

interface ToolbarProps {
  onAdd: () => void;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <View style={styles.toolbar}>
      <TouchableHighlight  style={styles.toolbarAction} onPress={props.onAdd}>
        <Text style={styles.toolbarActionText}>+</Text>
      </TouchableHighlight>
    </View>
  );
}
