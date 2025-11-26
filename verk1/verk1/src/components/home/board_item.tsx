import { View, Text, Image, StyleSheet } from "react-native";
//displays one board as card, navigation handled in home_boards
interface BoardItemProps {
    id: number;
    name: string;
    description: string;
    image: string;
}

export function BoardItem(props: BoardItemProps) {
    return(
        <View style={styles.container}>
            <Image resizeMode="cover" source={{uri: props.image}} style={styles.thumbnail} />
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.desc}>{props.description}</Text>
        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 5,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#a9d9e5",
    borderRadius: 16,
    paddingBottom: 12,
  },
  thumbnail: {
    width: "50%",
    height: "75%",
    borderRadius: 6,
    paddingTop: 8,
  },
  name: {
    marginTop: 4,
    fontWeight: "600",
  },
  desc: {
    color: "#555",
    fontSize: 12,
  }
});