import { ImageBackground } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export interface BoardItemProps {
    id: number;
    name: string;
    description: string;
    image: string;
}

export function BoardItem(props: BoardItemProps) {
    return(
        <View style={styles.container}>
            <ImageBackground source={{ uri: props.image}} style = {styles.image} imageStyle={styles.imageStyle}>
                <BlurView intensity={25} tint="dark" style={styles.blur}>
                  <View style={styles.overlay}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.desc}>{props.description}</Text>
                  </View>
                </BlurView>
            </ImageBackground>
        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 5,
    alignSelf: "center",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: '#000',
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

})