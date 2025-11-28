import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "94%",
    marginVertical: 6,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingLeft: 20,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  notch: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 12,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },

  name: {
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "600",
    color: "#272727",
  },
});

export default styles;
