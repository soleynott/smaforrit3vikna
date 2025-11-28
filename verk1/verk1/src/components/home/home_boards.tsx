
import { View, TouchableOpacity, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BoardThumbnail } from "../../types/board_thumbnail";
import { BoardItem } from "./board_item";
import  { useRouter } from "expo-router"

interface HomeBoardsProps {
    boards: BoardThumbnail[];
}

export function HomeBoards({ boards }: HomeBoardsProps) {
    const router = useRouter();
    return (
        <View style={{flex:1}}>
            <FlatList<BoardThumbnail>
            numColumns={1}
            data={boards}
            keyExtractor={(item) => item.id.toString()}
            //make each board a clickable card, routes to /board?id=x
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