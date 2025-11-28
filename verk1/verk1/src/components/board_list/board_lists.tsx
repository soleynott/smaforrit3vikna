//show all lists for certain board
import { TouchableOpacity, View } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { ListsThumbnail } from "../../types/lists_thumbnail";
import { ListItem } from "./lists_item";
import  { useRouter } from "expo-router"

type BoardListProps = {
  lists: ListsThumbnail[]; 
};
export function BoardList({ lists }: BoardListProps) {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <FlatList<ListsThumbnail>
        numColumns={1}
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/list',
              params: { id: item.id.toString()},
            })
          }
          accessibilityLabel={`Go to list ${item.name}`}
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
