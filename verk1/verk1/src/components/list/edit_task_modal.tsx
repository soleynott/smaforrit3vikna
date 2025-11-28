import { TouchableOpacity, View, Text, TextInput, ScrollView, Alert, FlatList, Alert } from "react-native";
import { Modal } from "../home/modal"
import { useState, useEffect } from "react";
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";
import { Entypo } from "@expo/vector-icons";
import styles from "../list/list_styles/edit_task_styles";

interface EditTaskModalProps {
    isOpen: boolean;
    closeModal: () => void;
    tasks: TasksThumbnail[];
    lists: { id: number; name: string; boardId: number }[];
    onTaskUpdate: (updatedTask: TasksThumbnail) => void;
    onTaskMove: (taskId: number, targetListId: number) => void;
}

export function EditTaskModal( props: EditTaskModalProps){
    const [selectedTask, setSelectedTask] = useState<TasksThumbnail | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [isSelectingMove, setIsSelectingMove] = useState(false);

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

    const handleMoveTask = (targetListId: number) => {
        if (!selectedTask) return;
        props.onTaskMove(selectedTask.id, targetListId);
        resetForm();
    };

    const confirmMove = (targetList: { id: number; name: string; boardId: number }) => {
        if (!selectedTask) return;
        Alert.alert(
            "Move Task",
            `Are you sure you want to move "${selectedTask.name}" to "${targetList.name}"?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Move", onPress: () => handleMoveTask(targetList.id) },
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
                        onPress={() => setIsSelectingMove(prev => !prev)}
                    >
                        <Entypo name="warning" size={18} color={"white"} style={{ marginRight: 8 }} />
                        <Text style={styles.deleteButtonText}>Move Task</Text>
                    </TouchableOpacity>

                    {isSelectingMove && (
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: "600" }}>Move to list</Text>
                            {props.lists
                                .filter(l => {
                                    // Only show lists in the same board as the selected task.
                                    const taskBoardId = (selectedTask as any)?.boardId;
                                    return taskBoardId ? l.boardId === taskBoardId : true;
                                })
                                .map(item => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.boardSelectItem}
                                        onPress={() => confirmMove(item)}
                                    >
                                        <View style={styles.boardSelectInfo}>
                                            <Text style={styles.boardSelectTitle}>{item.name}</Text>
                                        </View>
                                        <Entypo name="chevron-right" size={24} color={"#666"} />
                                    </TouchableOpacity>
                                ))}
                        </View>
                    )}

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
