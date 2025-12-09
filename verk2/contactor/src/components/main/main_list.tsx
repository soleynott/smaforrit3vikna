import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { ContactThumbnail } from '@/src/types/contact_thumbnail';
import styles from '../main/styles/main_list_style';

interface ContactsListProps {
	contacts: ContactThumbnail[];
	onSelect?: (c: ContactThumbnail) => void;
}

export function ContactsList({ contacts, onSelect }: ContactsListProps) {
	const router = useRouter();

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={contacts}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.listContent}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				renderItem={({ item }) => {
					const imageSource =
						!item.thumbnailPhoto || item.thumbnailPhoto === 'default'
							? require('../../resources/Default_pfp.jpg')
							: { uri: item.thumbnailPhoto };

					return (
						<TouchableOpacity
							style={styles.row}
							onPress={() => {
								if (onSelect) {
									onSelect(item);
									return;
								}

								router.push({
									pathname: '/contact',
									params: {
										name: item.name,
										number: item.phoneNumber,
										image: item.thumbnailPhoto,
										filename: item.filename,
									},
								});
							}}
							activeOpacity={0.7}
						>
							<Image source={imageSource} style={styles.avatar} />

							<View style={styles.textContainer}>
								<Text style={styles.name}>{item.name}</Text>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}
