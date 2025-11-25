import {Text, View, StyleSheet} from 'react-native';
//this view will show all 
export default function BoardScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}> Board screen </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000',
    },
});
