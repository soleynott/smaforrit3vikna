
import { View, TouchableOpacity, Text } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { BoardThumbnail } from "../../types/board_thumbnail";
import { BoardItem } from "./board_item";
import  { useRouter } from "expo-router"

export function HomeBoards() {
    const images = data.boards as unknown as BoardThumbnail[];
 const router = useRouter();
    return (
        <View style={{flex:1}}>
             <FlatList<BoardThumbnail>
            numColumns={1}
            data={images}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() =>
                    router.push({
                    pathname: '/board',
                    params: { id: item.id.toString() }, 
                    })
                }
                accessibilityLabel={`Go to board ${item.name}`}
                accessibilityRole="button"
                >
                <BoardItem
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.thumbnailPhoto}
                />
                </TouchableOpacity>
            )}
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