import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Modal } from "./modal"
import { Entypo } from "@expo/vector-icons";


interface AddModalProps{
    isOpen: boolean;
    closeModal: () => void;
    takePhoto: () => void;
    selectFromCameraRoll: () => void;
}

export function AddModal(props: AddModalProps) {
    return(
    <Modal title="Add Image" isOpen={props.isOpen} closeModal={props.closeModal}>
        <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option} onPress={() => props.takePhoto} >
                <Entypo name="camera" size={48} color={"blue"} style={styles.icon}></Entypo>
                <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => props.takePhoto} >
                <Entypo name="image" size={48} color={"blue"} style={styles.icon}></Entypo>
                <Text style={styles.optionText}>Choose Image</Text>
            </TouchableOpacity>
        </View>
    </Modal>
)}

export default AddModal;


const styles = StyleSheet.create({
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
    }
})

