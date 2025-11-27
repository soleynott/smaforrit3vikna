import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { BoardList } from "@/src/components/board_list/board_lists"
import { Toolbar } from "@/src/components/toolbar";

export function Board() {
  const params = useLocalSearchParams();
  const boardId = Number(params.id); 

  return (
    <View style={{ flex: 1 }}>
      <BoardList boardId={boardId} />
      <Toolbar name="List"/>
    </View>
  );
}

