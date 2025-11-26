
import { View } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { BoardThumbnail } from "../../types/board_thumbnail";
import { BoardItem } from "./board_item";

export function HomeBoards() {
    const images = data.boards as unknown as BoardThumbnail[];
    return (
        <View style={{flex:1}}>
            <FlatList<BoardThumbnail>
                numColumns={1}
                data={images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <BoardItem
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.thumbnailPhoto}/>}
            />
        </View>
    )
}



/*  "boards": [
    {
      "id": 1,
      "name": "Trip to the Netherlands!",
      "description": "A trip to the Netherlands for a summer holiday.",
      "thumbnailPhoto": "https://images.prismic.io/indiecampers-demo/9f34856d-05da-4afb-832f-d3a36de83b7f_Hero---Kinderdijk.jpg"
    },
  ],*/