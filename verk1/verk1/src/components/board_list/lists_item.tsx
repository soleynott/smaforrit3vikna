import { View, Text } from "react-native";
import styles from "../board_list/board_list_styles/list_item_styles";

interface ListItemProps {
  id: number;
  name: string;
  color: string;
  boardId: number;
}

export function ListItem(props: ListItemProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.notch, { backgroundColor: props.color }]} />
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
}
