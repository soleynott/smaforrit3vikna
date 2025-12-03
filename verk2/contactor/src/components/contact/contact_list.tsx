import { View, Text, Image, TouchableOpacity } from 'react-native';
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
}

export function ContactList({ name, number, image, onEditPress }: ContactListProps) {
	return (
		<View style={styles.screen}>
			<View style={styles.header}>
				<TouchableOpacity onPress={onEditPress}>
					<Text style={styles.edit}>Edit</Text>
				</TouchableOpacity>
			</View>

			{image && <Image source={{ uri: image.toString() }} style={styles.photo} />}

			<Text style={styles.name}>{name}</Text>
			<Text style={styles.phone}>{number}</Text>
		</View>
	);
}
