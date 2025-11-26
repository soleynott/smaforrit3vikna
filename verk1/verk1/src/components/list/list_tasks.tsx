import { View } from "react-native";
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";
import { TaskItem } from "./task_item";

//displays all tasks in one list
type TaskListProps = {
    listId: number;
};

export function ListTasks ({listId}: TaskListProps){
    //local state for rerendering after checking a box
    const [tasks, setTasks] = useState(
        //filter tasks for what list they belong to
        data.tasks.filter(t => t.listId === listId)
    );
    // toggle finished state
    function toggleTask( id: number) {
        setTasks( prev => //current value of tasks before updating
            prev.map( t => //check every task t and find the one with mathing id
                t.id === id ? { ...t, isFinished: !t.isFinished } : t // if correct id, change ; otherwise ignore
            )
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TaskItem
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    isFinished={item.isFinished}
                    listId={item.listId}
                    onToggle = { () => toggleTask(item.id)}
                />
                )}
            />
            </View>
    );
}