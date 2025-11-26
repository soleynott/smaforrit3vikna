import { useLocalSearchParams  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { BoardList } from "@/src/components/board_list/board_lists"

export default function Board() {
  const { boardId } = useLocalSearchParams();  

  const id = Number(boardId);

  const lists = BoardList(id);

  return (
    <View>
      {lists.map(list => (
        <TouchableOpacity key={list.id} accessibilityRole="button">
            <Text> {list.name} </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
