import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    backgroundColor: "#c6e6ef",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  toolbarAction: {
    padding: 6,
  },

  toolbarActionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#002f40",
  },
});
export default styles;
