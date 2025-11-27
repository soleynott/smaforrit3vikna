import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView } from "react-native";
import { Modal } from "./modal"
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { BoardThumbnail } from "../../types/board_thumbnail";


interface AddModalProps{
    isOpen: boolean;
    closeModal: () => void;
    onBoardCreate: (board: BoardThumbnail) => void;
}

export function AddModal(props: AddModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selectedPhotoMode, setSelectedPhotoMode] = useState<"camera" | "gallery" | null>(null);

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

    const handleCreateBoard = () => {
        if (!title || !description || !imageUri) {
            alert("Please fill in all fields and select an image");
            return;
        }

        const newBoard: BoardThumbnail = {
            id: Date.now(),
            name: title,
            description: description,
            thumbnailPhoto: imageUri,
        };

        props.onBoardCreate(newBoard);
        resetForm();
        props.closeModal();
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setImageUri(null);
        setSelectedPhotoMode(null);
    };

    if (selectedPhotoMode) {
        return (
            <Modal title="Add Image" isOpen={props.isOpen} closeModal={props.closeModal}>
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

    return(
        <Modal title="Add New Board" isOpen={props.isOpen} closeModal={props.closeModal}>
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
                    <Text style={styles.imagePickerButtonText}>
                        {imageUri ? "Change Image" : "Select Image"}
                    </Text>
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
                    style={styles.createButton}
                    onPress={handleCreateBoard}
                >
                    <Text style={styles.createButtonText}>Create Board</Text>
                </TouchableOpacity>
            </ScrollView>
        </Modal>
    );
}

export default AddModal;


const styles = StyleSheet.create({
    formContainer: {
        gap: 15,
        paddingBottom: 20,
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
})

