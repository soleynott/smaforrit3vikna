import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, Alert, FlatList } from "react-native";
import { Modal } from "./modal"
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { BoardThumbnail } from "../../types/board_thumbnail";


interface EditModalProps{
    isOpen: boolean;
    closeModal: () => void;
    boards: BoardThumbnail[];
    onBoardUpdate: (updatedBoard: BoardThumbnail) => void;
    onBoardDelete: (boardId: number) => void;
}

export function EditModal(props: EditModalProps) {
    const [selectedBoard, setSelectedBoard] = useState<BoardThumbnail | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selectedPhotoMode, setSelectedPhotoMode] = useState<"camera" | "gallery" | null>(null);
    const [isEditingBoard, setIsEditingBoard] = useState(false);

    useEffect(() => {
        if (selectedBoard && isEditingBoard) {
            setTitle(selectedBoard.name);
            setDescription(selectedBoard.description);
            setImageUri(selectedBoard.thumbnailPhoto);
        }
    }, [selectedBoard, isEditingBoard]);

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setSelectedPhotoMode(null);
        }
    };

    const selectFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setSelectedPhotoMode(null);
        }
    };

    const handleSelectBoard = (board: BoardThumbnail) => {
        setSelectedBoard(board);
        setIsEditingBoard(true);
    };

    const handleUpdateBoard = () => {
        if (!title || !description || !imageUri) {
            alert("Please fill in all fields and select an image");
            return;
        }

        if (!selectedBoard) return;

        const updatedBoard: BoardThumbnail = {
            ...selectedBoard,
            name: title,
            description: description,
            thumbnailPhoto: imageUri,
        };

        props.onBoardUpdate(updatedBoard);
        resetForm();
    };

    const handleDeleteBoard = () => {
        if (!selectedBoard) return;

        Alert.alert(
            "Delete Board",
            `Are you sure you want to delete "${selectedBoard.name}"? This cannot be undone.`,
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {
                        props.onBoardDelete(selectedBoard.id);
                        resetForm();
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const resetForm = () => {
        setSelectedBoard(null);
        setTitle("");
        setDescription("");
        setImageUri(null);
        setSelectedPhotoMode(null);
        setIsEditingBoard(false);
    };

    // Photo selection mode
    if (selectedPhotoMode) {
        return (
            <Modal title="Change Image" isOpen={props.isOpen} closeModal={props.closeModal}>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.option} onPress={takePhoto} >
                        <Entypo name="camera" size={48} color={"blue"} style={styles.icon}></Entypo>
                        <Text style={styles.optionText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={selectFromGallery} >
                        <Entypo name="image" size={48} color={"blue"} style={styles.icon}></Entypo>
                        <Text style={styles.optionText}>Choose Image</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    // Editing board mode
    if (isEditingBoard && selectedBoard) {
        return(
            <Modal title="Edit Board" isOpen={props.isOpen} closeModal={props.closeModal}>
                <ScrollView style={styles.formContainer}>
                    {imageUri && (
                        <View style={styles.imagePreviewContainer}>
                            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                            <TouchableOpacity 
                                style={styles.removeImageButton}
                                onPress={() => setImageUri(null)}
                            >
                                <Text style={styles.removeImageText}>Remove Image</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    <TouchableOpacity 
                        style={styles.imagePickerButton}
                        onPress={() => setSelectedPhotoMode("camera")}
                    >
                        <Entypo name="image" size={24} color={"white"} />
                        <Text style={styles.imagePickerButtonText}>Change Image</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Board Title"
                        value={title}
                        onChangeText={setTitle}
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
                        style={styles.updateButton}
                        onPress={handleUpdateBoard}
                    >
                        <Text style={styles.updateButtonText}>Update Board</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={handleDeleteBoard}
                    >
                        <Entypo name="trash" size={20} color={"white"} style={{ marginRight: 8 }} />
                        <Text style={styles.deleteButtonText}>Delete Board</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => setIsEditingBoard(false)}
                    >
                        <Text style={styles.backButtonText}>Back to Board List</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        );
    }

    // Board selection mode
    return(
        <Modal title="Edit or Delete Board" isOpen={props.isOpen} closeModal={props.closeModal}>
            <View style={styles.boardListContainer}>
                {props.boards.length === 0 ? (
                    <View style={styles.emptyStateContainer}>
                        <Text style={styles.emptyStateText}>No boards available to edit</Text>
                    </View>
                ) : (
                    <FlatList
                        data={props.boards}
                        keyExtractor={(item) => item.id.toString()}
                        scrollEnabled={true}
                        style={{ maxHeight: 300 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.boardSelectItem}
                                onPress={() => handleSelectBoard(item)}
                            >
                                <Image 
                                    source={{ uri: item.thumbnailPhoto }} 
                                    style={styles.boardSelectThumbnail}
                                />
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

export default EditModal;


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
