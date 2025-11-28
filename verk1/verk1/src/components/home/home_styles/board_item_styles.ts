import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 5,
    alignSelf: "center",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  desc: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
  },

  blur: {
    overflow: "hidden",
  },
});

export default styles;
