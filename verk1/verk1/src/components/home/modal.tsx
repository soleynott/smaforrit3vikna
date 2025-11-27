import { View, Text, Image, StyleSheet, TouchableHighlight, Platform, Modal as RNModal, Pressable, TouchableOpacity } from "react-native";
import { ReactNode } from "react";


interface ModalProps{
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children: ReactNode;
}

export function Modal(props: ModalProps) {
    return(
        <RNModal
            visible={props.isOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={props.closeModal}
            statusBarTranslucent>
                <Pressable style={styles.backdrop} onPress={props.closeModal}>
                    <Pressable style={styles.modalContainer}
                    onPress={(e) => e.stopPropagation}>
                        <View style={styles.modalContainer}>
                            {props.title ? (
                                <Text style={styles.title}>{props.title}</Text>
                            ) : null}
                            <View style={styles.childrenContainer}>{props.children}</View>
                            <TouchableOpacity>
                                <Text style={styles.closeButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
        </RNModal>
    )
}









const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "pink",
        justifyContent: "flex-end"
    },
    modalContainer: {
        justifyContent: "flex-end"
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: Platform.OS === "ios" ? 40 : 20,
        minHeight: 200,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { width: 0, height: -2, },
                shadowOpacity: 0.25,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            }
        })
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333"
    },
    childrenContainer: {
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    closeButtonText: {
        fontSize: 16,
        color: "red",
        fontWeight: 600,
    }
});
