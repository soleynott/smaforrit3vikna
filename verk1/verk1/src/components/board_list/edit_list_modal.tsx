import { TouchableOpacity, View, Text, TextInput, Image, ScrollView, Alert, FlatList } from "react-native";
import { Modal } from "../home/modal"
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { ListsThumbnail } from "@/src/types/lists_thumbnail";
import styles from "../board_list/board_list_styles/edit_list_styles";
import ColorPicker from "react-native-wheel-color-picker";  

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
                    /><ColorPicker
                        color={color}
                        onColorChangeComplete={(c) => setColor(c)}  
                        thumbSize={30}
                        sliderSize={30}
                        noSnap={true}
                        row={false}
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


