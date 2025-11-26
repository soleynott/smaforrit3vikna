import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { BoardList } from "@/src/components/board_list/board_lists"

export function Board() {
    return (
        <View style={{flex:1}}>
            {/*"Render toolbar"*/}
            <BoardList/>
        </View>
    )
}

