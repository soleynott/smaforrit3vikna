/*in list view, each task in one list*/
import { View } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
//displays all tasks in one list
type TaskListProps = {
    listId: number;
};

export function ListTasks ({listId}: TaskListProps){
    //const tasks = 
    //filter tasks by what list they belong to
    const filteredtasks = data.tasks.filter( t => t.listId === listId);

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