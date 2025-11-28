import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
  },

  colorBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },

  finished: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },

  deleteButton: {
    padding: 6,
  },
});
export default styles;