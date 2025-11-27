import { useLocalSearchParams, useRouter  } from "expo-router"
import { Image, Text, TouchableOpacity, View} from "react-native"
import { ListTasks } from "@/src/components/list/list_tasks";

export function List(){
    const params = useLocalSearchParams();
    const listId = Number(params.id);

    return (
        <View style ={{ flex: 1 }}>
            <ListTasks listId={listId}/>
            {/** render toolbar for task CRUD */}
        </View>
    );
}