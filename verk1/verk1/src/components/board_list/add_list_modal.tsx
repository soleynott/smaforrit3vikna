import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from "react-native";
import { Modal } from "../home/modal";
import { useState } from "react";
import { ListsThumbnail } from "@/src/types/lists_thumbnail";
import ColorPicker from "react-native-wheel-color-picker";   // ✅ Correct modern color picker

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
            name,
            color,
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

                <Text style={{ fontSize: 16, marginBottom: 10 }}>Pick a Color:</Text>

                <ColorPicker
                    color={color}
                    onColorChangeComplete={(c) => setColor(c)}  
                    thumbSize={30}
                    sliderSize={30}
                    noSnap={true}
                    row={false}
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
