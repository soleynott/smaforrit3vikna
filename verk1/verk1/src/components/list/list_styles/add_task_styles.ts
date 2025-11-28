import { StyleSheet } from "react-native";

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

  descriptionInput: {
    textAlignVertical: "top",
    minHeight: 100,
  },
});

export default styles;
