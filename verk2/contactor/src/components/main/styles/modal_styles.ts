import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContentWrapper: {
    justifyContent: "flex-end",
    flex: 1,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    maxHeight: "90%",
    minHeight: 100,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  childrenContainer: {
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
});

export default styles;
