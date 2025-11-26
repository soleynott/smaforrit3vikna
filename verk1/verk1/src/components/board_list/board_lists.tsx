//show all lists for certain board
import { View } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { ListsThumbnail } from "../../types/boards_thumbnail";
import { ListItem } from "./lists_item";

type BoardListProps = {
  boardId: number; 
};
export function BoardList({ boardId }: BoardListProps) {
  const lists = data.lists as unknown as ListsThumbnail[];
  //filter lists by what board they belong to
  const filteredLists = lists.filter(list => list.boardId === boardId);

  return (
    <View style={{ flex: 1 }}>
      <FlatList<ListsThumbnail>
        numColumns={1}
        data={filteredLists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            id={item.id}
            name={item.name}
            color={item.color}
            boardId={item.boardId}
          />
        )}
      />
    </View>
  );
}
