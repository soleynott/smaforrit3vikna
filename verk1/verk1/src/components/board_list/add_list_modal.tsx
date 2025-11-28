import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from "react-native";
import { Modal } from "../home/modal";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { ListsThumbnail } from "@/src/types/lists_thumbnail";


interface AddListModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onListCreate: (list: ListsThumbnail) => void;
    boardId: number;
}

export function AddListModal(props: AddListModalProps) {

    const [name, setName] = useState("");
    const [color, setColor] = useState("#ffffff");

    const resetForm = () => {
        setName("");
        setColor("#ffffff");
    };

    const handleCreateList = () => {
        if (!name || !color) {
            alert("Please enter a name and pick a color");
            return;
        }

        const newList: ListsThumbnail = {
            id: Date.now(),
            name: name,
            color: color,
            boardId: props.boardId,
        };

        props.onListCreate(newList);
        resetForm();
        props.closeModal();
    };

    return (
        <Modal title="Add New List" isOpen={props.isOpen} closeModal={props.closeModal}>
            <ScrollView style={styles.formContainer}>

                <TextInput
                    style={styles.input}
                    placeholder="List Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#999"
                />

                <TextInput
                    style={styles.input}
                    placeholder="color hexcode"
                    value={color}
                    onChangeText={setColor}
                    placeholderTextColor="#999"
                />


                <TouchableOpacity 
                    style={styles.createButton}
                    onPress={handleCreateList}
                >
                    <Text style={styles.createButtonText}>Create List</Text>
                </TouchableOpacity>

            </ScrollView>
        </Modal>
    );
}

export default AddListModal;

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
});
