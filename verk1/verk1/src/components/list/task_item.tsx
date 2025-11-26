import { View, Text, Image, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox"
//display one task, use in list_tasks to show all tasks in one list

interface TaskItemProps {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
    onToggle: () => void; //callback from parent
}

export function TaskItem(props: TaskItemProps){
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 12,
        gap: 10,
    },
    text: {
        fontSize: 16,
    },
    finished: {
        textDecorationLine: "line-through",
        opacity: 0.6,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold"
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
});