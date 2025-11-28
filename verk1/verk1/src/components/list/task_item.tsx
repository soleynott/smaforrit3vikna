import { View, Text, TouchableOpacity, Alert } from "react-native";
import Checkbox from "expo-checkbox"
import { Entypo } from "@expo/vector-icons";
import styles from "../list/list_styles/task_item_styles";

//display one task, use in list_tasks to show all tasks in one list

interface TaskItemProps {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
    onToggle: () => void; //callback from parent
    onDelete: () => void; //callback for delete
}

export function TaskItem(props: TaskItemProps){
    const handleDelete = () => {
        Alert.alert(
            "Delete Task",
            `Are you sure you want to delete "${props.name}"?`,
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => props.onDelete(),
                    style: "destructive",
                },
            ]
        );
    };

    return(
        <View style={styles.container}>
            <Checkbox
                value={props.isFinished}
                onValueChange={props.onToggle}
            />
            <View style={styles.textContainer}>
                <Text
                    style={[
                        styles.name,
                        props.isFinished && styles.finished,
                    ]}
                >
                    {props.name}
                </Text>
                <Text style={styles.description}>{props.description}</Text>
            </View>
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Entypo name="trash" size={20} color={"#e74c3c"} />
            </TouchableOpacity>
        </View>
    );
}