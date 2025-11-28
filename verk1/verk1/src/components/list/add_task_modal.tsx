import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from "react-native";
import { Modal } from "../home/modal";
import { useState } from "react";
import { TasksThumbnail } from "@/src/types/tasks_thumbnail";


interface AddTaskModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onTaskCreate: (Task: TasksThumbnail) => void;
    listId: number;
    nextId: number;
}

export function AddTaskModal(props: AddTaskModalProps) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isFinished, setIsFinished] = useState(false);


    const resetForm = () => {
        setName("");
        setDescription("");
        setIsFinished(false);
    };

    const handleCreateTask = () => {
        if (!name || !description) {
            alert("Please enter a name and description");
            return;
        }

        const newTask: TasksThumbnail = {
            id: props.nextId,
            name: name,
            description: description,
            isFinished: false,
            listId: props.listId,
        };

        props.onTaskCreate(newTask);
        resetForm();
        props.closeModal();
    };

    return (
        <Modal title="Add New Task" isOpen={props.isOpen} closeModal={props.closeModal}>
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
                    placeholder="Board Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    placeholderTextColor="#999"
                />

                <TouchableOpacity 
                    style={styles.createButton}
                    onPress={handleCreateTask}
                >
                    <Text style={styles.createButtonText}>Create Task</Text>
                </TouchableOpacity>

            </ScrollView>
        </Modal>
    );
}

export default AddTaskModal;

const styles = StyleSheet.create({
    formContainer: {
        gap: 15,
        paddingBottom: 20,
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
    createButton: {
        backgroundColor: "#27ae60",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    createButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },

    descriptionInput: {
        textAlignVertical: "top",
        minHeight: 100,
    },
});
