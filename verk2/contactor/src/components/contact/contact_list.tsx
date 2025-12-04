import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import data from '../../resources/data.json';
import { FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import styles from './contact_list_style';
import { useLocalSearchParams } from 'expo-router';

interface ContactListProps {
	name?: string;
	number?: string;
	image?: string | null;
	onEditPress?: () => void;
	onCall?: () => void;
}

export function ContactList({ name, number, image, onEditPress, onCall}: ContactListProps) {
	const imageSource =
		!image || image === 'default'
			? require('../../resources/Default_pfp.jpg')
			: { uri: image };

	return (
		<View style={styles.screen}>
			<View style={styles.header}>
				<TouchableOpacity onPress={onEditPress}>
					<Text style={styles.edit}>Edit</Text>
				</TouchableOpacity>
			</View>

			<Image source={imageSource} style={styles.photo} />

			<Text style={styles.name}>{name}</Text>
			<Text style={styles.phone}>{number}</Text>
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Button  title="Call" onPress={onCall} />
			</View>
		</View>
	);
}
