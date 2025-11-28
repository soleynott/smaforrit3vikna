import { ImageBackground } from "react-native";
import { View, Text } from "react-native";
import { BlurView } from "expo-blur";
import styles from "../home/home_styles/board_item_styles";

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
