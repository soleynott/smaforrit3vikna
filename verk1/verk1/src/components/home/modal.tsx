import { View, Text, Modal as RNModal, Pressable, TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import styles from "../home/home_styles/modal_styles";

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
                    <Pressable style={styles.modalContentWrapper}
                    onPress={(e) => e.stopPropagation}>
                        <View style={styles.modalContent}>
                            {props.title ? (
                                <Text style={styles.title}>{props.title}</Text>
                            ) : null}
                            <View style={styles.childrenContainer}>{props.children}</View>
                            <TouchableOpacity onPress={props.closeModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
        </RNModal>
    )
}

