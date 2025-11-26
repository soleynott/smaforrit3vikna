
import { View } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { ListsThumbnail } from "../../types/boards_thumbnail";
import { ListItem } from "./lists_item";

export function BoardList () {
  const lists = data.lists as unknown as ListsThumbnail[];
  return ( 
        <View style={{flex:1}}>
            <FlatList<ListsThumbnail>
                numColumns={1}
                data={lists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <ListItem
                    id={item.id}
                    name={item.name}
                    color={item.color}
                    boardId={item.boardId}/>}
            />
        </View>
  )
};
