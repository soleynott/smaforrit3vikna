import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, Alert, FlatList } from "react-native";
import { Modal } from "../home/modal"
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ListsThumbnail } from "@/src/types/lists_thumbnail";

interface EditListProps{
    isOpen: boolean;
    closeModal: () => void;
    lists: ListsThumbnail[];
    onListUpdate: (updatedList: ListsThumbnail) => void;
    onListDelete: (listId: number) => void;
}

export function EditListModal(props: EditListProps){
    const [selectedList, setSelectedList] = useState<ListsThumbnail | null>(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [isEditingList, setIsEditingList] = useState(false);

    useEffect(() => {
        if (selectedList && isEditingList) {
            setName(selectedList.name);
            setColor(selectedList.color);
        }
    }, [selectedList, isEditingList]);

    const handleSelectList = (list: ListsThumbnail) => {
        setSelectedList(list);
        setIsEditingList(true);
    };

    const handleUpdateList = () => {
        if (!name || !color) {
            alert("Please fill in name and select a color");
            return;
        }

        if (!selectedList) return;

        const updatedList: ListsThumbnail = {
            ...selectedList,
            name: name,
            color: color,
        };


        props.onListUpdate(updatedList);
        resetForm();
    };

    const handleDeleteList = () => {
        if (!selectedList) return;

        Alert.alert(
            "Delete List",
            `Are you sure you want to delete "${selectedList.name}"? This cannot be undone.`,
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        props.onListDelete(selectedList.id);
                        resetForm();
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const resetForm = () => {
        setSelectedList(null);
        setName("");
        setColor("");
        setIsEditingList(false);
    };

    // Editing list mode
    if (isEditingList && selectedList) {
        return(
            <Modal title="Edit List" isOpen={props.isOpen} closeModal={props.closeModal}>
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
                        style={styles.updateButton}
                        onPress={handleUpdateList}
                    >
                        <Text style={styles.updateButtonText}>Update List</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={handleDeleteList}
                    >
                        <Entypo name="trash" size={20} color={"white"} style={{ marginRight: 8 }} />
                        <Text style={styles.deleteButtonText}>Delete List</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => setIsEditingList(false)}
                    >
                        <Text style={styles.backButtonText}>Back to all Lists</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        );
    }

    // List selection mode
    return(
        <Modal title="Edit or Delete List" isOpen={props.isOpen} closeModal={props.closeModal}>
            <View style={styles.boardListContainer}>
                {props.lists.length === 0 ? (
                    <View style={styles.emptyStateContainer}>
                        <Text style={styles.emptyStateText}>No lists available to edit</Text>
                    </View>
                ) : (
                    <FlatList
                        data={props.lists}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        style={{ maxHeight: 300 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.boardSelectItem}
                                onPress={() => handleSelectList(item)}
                            >

                                <View style={styles.boardSelectInfo}>
                                    <Text style={styles.boardSelectTitle}>{item.name}</Text>
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

export default EditListModal;


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
    boardSelectThumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#ddd",
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
    optionsContainer: {
        gap: 15,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 12,
    },
    icon: {
        marginRight: 20
    },
    optionText: {
        fontSize: 18,
        color: "lightblue",
        fontWeight: 500,
    },
    imagePreviewContainer: {
        marginBottom: 15,
        alignItems: "center",
    },
    imagePreview: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 10,
    },
    removeImageButton: {
        padding: 8,
        backgroundColor: "#ff6b6b",
        borderRadius: 8,
    },
    removeImageText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
    imagePickerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#4a90e2",
        borderRadius: 12,
        gap: 10,
    },
    imagePickerButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
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
