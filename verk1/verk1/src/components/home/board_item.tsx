import { ImageBackground } from "expo-image";
import { View, Text, Image, StyleSheet } from "react-native";
//displays one board as card, navigation handled in home_boards
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
              {/* <Image resizeMode="cover" source={{uri: props.image}} style={styles.thumbnail} /> */}
              <View style={styles.overlay}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.desc}>{props.description}</Text>
                </View>
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
    //paddingBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    // borderRadius: 6,
    // paddingTop: 8,
    justifyContent: "flex-end",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    // marginTop: 4,
    // fontWeight: "600",
  },
  desc: {
    // color: "#555",
    // fontSize: 12,
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  imageStyle: {
        borderRadius: 16,
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent dark overlay
        padding: 12,
    },
})