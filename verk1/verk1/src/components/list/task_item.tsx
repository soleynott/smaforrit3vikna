import { View, Text, Image, StyleSheet } from "react-native";
//display one task, use in list_tasks to show all tasks in one list

interface TaskItemProps {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
}

export function TaskItem(props: TaskItemProps){
    return(
        <View style={styles.container}>
            <Text>{props.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }
});