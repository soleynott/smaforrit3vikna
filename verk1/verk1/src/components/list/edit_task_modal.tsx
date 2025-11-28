import { TouchableOpacity, View, Text, TextInput, ScrollView, Alert, FlatList } from "react-native";
import { Modal } from "../home/modal"
import { useState, useEffect } from "react";
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import { Entypo } from "@expo/vector-icons";
import styles from "../list/list_styles/edit_task_styles";

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
        <Modal title="Edit or Move Task" isOpen={props.isOpen} closeModal={props.closeModal}>
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
