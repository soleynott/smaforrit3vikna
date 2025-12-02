   //show all lists for certain board
import { View, Text, Image, TouchableOpacity } from 'react-native';
import data from "../../resources/data.json";
import { FlatList } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { StyleSheet } from 'react-native';

export function ContactsList () {
    const router = useRouter();  
    return (
    <View style={{ flex: 1 }}>
    <FlatList
            data={data.contacts}
            keyExtractor={(item) => item.number}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={styles.row}
                // 👇 navigate to /contact and pass fields as params
                onPress={() =>
                router.push({
                    pathname: '/contact',
                    params: {
                    name: item.name,
                    number: item.number,
                    image: item.image,
                    },
                })
                }
                activeOpacity={0.7}
            >
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.number}</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        </View>
    )

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  listContent: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: 'gray',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#d1d1d6',
    marginLeft: 76,
  },
});