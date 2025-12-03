//show all lists for certain board
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import styles from '../main/styles/main_list_style';

interface ContactsListProps {
	contacts: ContactThumbnail[];
}

export function ContactsList ({ contacts }: ContactsListProps) {
    const router = useRouter();  
    return (
    <View style={{ flex: 1 }}>
    <FlatList
            data={contacts}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={styles.row}
                onPress={() =>
                router.push({
                    pathname: '/contact',
                    params: {
                    name: item.name,
                    number: item.phoneNumber,
                    image: item.thumbnailPhoto,
                    filename: item.filename,
                    },
                })
                }
                activeOpacity={0.7}
            >
                {item.thumbnailPhoto ? (
                    <Image source={{ uri: item.thumbnailPhoto }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, { backgroundColor: '#e0e0e0' }]} />
                )}
                <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phoneNumber}</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        </View>
    )

}
