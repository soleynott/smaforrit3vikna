import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  selectContainer: {
    minHeight: 300,
    flex: 1,
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
  contactList: {
    flex: 1,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    gap: 12,
  },
  contactRowSelected: {
    backgroundColor: "#e8f4f8",
    borderWidth: 2,
    borderColor: "#3498db",
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  contactInfo: {
    flex: 1,
    justifyContent: "center",
  },
  contactName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 12,
    color: "#666",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3498db",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#3498db",
  },
  actionsContainer: {
    gap: 10,
    marginTop: 16,
  },
  importButton: {
    backgroundColor: "#27ae60",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#95a5a6",
  },

  // initial state styles
  initialContainer: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#666",
    fontSize: 14,
  },
  introContainer: {
    gap: 16,
    width: "100%",
  },
  introText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  uploadIcon: {
    marginRight: 8,
  },
})

export default styles;