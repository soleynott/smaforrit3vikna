import { StyleSheet } from "react-native";

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

export default styles;