//show all lists for certain board
import { TouchableOpacity, View } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { ListsThumbnail } from "../../types/boards_thumbnail";
import { ListItem } from "./lists_item";
import  { useRouter } from "expo-router"

type BoardListProps = {
  boardId: number; 
};
export function BoardList({ boardId }: BoardListProps) {
  const lists = data.lists as unknown as ListsThumbnail[];
  //filter lists by what board they belong to
  const filteredLists = lists.filter(list => list.boardId === boardId);
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <FlatList<ListsThumbnail>
        numColumns={1}
        data={filteredLists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/list',
              params: { id: item.id.toString()},
            })
          }
          accessibilityLabel={`Go to board ${item.name}`}
          accessibilityRole="button"
          >
          <ListItem
            id={item.id}
            name={item.name}
            color={item.color}
            boardId={item.boardId}
          />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
