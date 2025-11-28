import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView, Alert, FlatList } from "react-native";
import { Modal } from "../home/modal"
import { useState, useEffect } from "react";
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import { Entypo } from "@expo/vector-icons";

interface EditTaskModalProps {
    isOpen: boolean;
    closeModal: () => void;
    tasks: TasksThumbnail[];
    onTaskUpdate: (updatedTask: TasksThumbnail) => void;
    onTaskDelete: (taskId: number) => void;
}

export function EditTaskModal( props: EditTaskModalProps){
    const [selectedTask, setSelectedTask] = useState<TasksThumbnail | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEditingTask, setIsEditingTask] = useState(false);

    useEffect(() => {
        if (selectedTask && isEditingTask) {
            setName(selectedTask.name);
            setDescription(selectedTask.description);
        }
    }, [selectedTask, isEditingTask]);

    const handleSelectTask = (task: TasksThumbnail) => {
        setSelectedTask(task);
        setIsEditingTask(true);
    };

    const handleUpdateTask = () => {
        if (!name || !description) {
            alert("Please fill in name and description");
            return;
        }

        if (!selectedTask) return;

        const updatedTask: TasksThumbnail = {
            ...selectedTask,
            name: name,
            description: description,
        };

        props.onTaskUpdate(updatedTask);
        resetForm();
    };

    const handleDeleteTask = () => {
        if (!selectedTask) return;

        Alert.alert(
            "Delete Task",
            `Are you sure you want to delete "${selectedTask.name}"? This cannot be undone.`,
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        props.onTaskDelete(selectedTask.id);
                        resetForm();
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const resetForm = () => {
        setSelectedTask(null);
        setName("");
        setDescription("");
        setIsEditingTask(false);
    };

    // Editing task mode
    if (isEditingTask && selectedTask) {
        return(
            <Modal title="Edit Task" isOpen={props.isOpen} closeModal={props.closeModal}>
                <ScrollView style={styles.formContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="Task Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Task Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity 
                        style={styles.updateButton}
                        onPress={handleUpdateTask}
                    >
                        <Text style={styles.updateButtonText}>Update Task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={handleDeleteTask}
                    >
                        <Entypo name="trash" size={20} color={"white"} style={{ marginRight: 8 }} />
                        <Text style={styles.deleteButtonText}>Delete Task</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => setIsEditingTask(false)}
                    >
                        <Text style={styles.backButtonText}>Back to all Tasks</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        );
    }

    // task selection mode
    return(
        <Modal title="Edit or Delete Task" isOpen={props.isOpen} closeModal={props.closeModal}>
            <View style={styles.boardListContainer}>
                {props.tasks.length === 0 ? (
                    <View style={styles.emptyStateContainer}>
                        <Text style={styles.emptyStateText}>No tasks available to edit</Text>
                    </View>
                ) : (
                    <FlatList
                        data={props.tasks}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.boardSelectItem}
                                onPress={() => handleSelectTask(item)}
                            >
                                <View style={styles.boardSelectInfo}>
                                    <Text style={styles.boardSelectTitle}>{item.name}</Text>
                                    <Text style={styles.boardSelectDescription} numberOfLines={1}>{item.description}</Text>
                                </View>
                                <Entypo name="chevron-right" size={24} color={"#666"} />
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </Modal>
    );
}

export default EditTaskModal;


const styles = StyleSheet.create({
    formContainer: {
        gap: 15,
        paddingBottom: 20,
    },
    boardListContainer: {
        minHeight: 200,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
    },
    emptyStateText: {
        fontSize: 16,
        color: "#999",
        fontStyle: "italic",
    },
    boardSelectItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        gap: 12,
    },
    boardSelectInfo: {
        flex: 1,
        justifyContent: "center",
    },
    boardSelectTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    boardSelectDescription: {
        fontSize: 12,
        color: "#666",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "white",
        marginBottom: 10,
    },
    descriptionInput: {
        textAlignVertical: "top",
        minHeight: 100,
    },
    updateButton: {
        backgroundColor: "#27ae60",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    updateButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    deleteButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    backButton: {
        backgroundColor: "#95a5a6",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    backButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
});
