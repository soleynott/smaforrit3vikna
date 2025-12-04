import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import data from '../../resources/data.json';
import { FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import styles from './contact_list_style';

interface ContactListProps {
	name?: string;
	number?: string;
	image?: string | null;
	onEditPress?: () => void;
	onCall?: () => void;
}

export function ContactList(props: ContactListProps) {
	const imageSource =
		!props.image || props.image === 'default'
			? require('../../resources/Default_pfp.jpg')
			: { uri: props.image };

	return (
		<View style={styles.screen}>
			{/* top header */}
			<View style={styles.headerBar}>
				<TouchableOpacity onPress={props.onEditPress}>
					<Text style={styles.editText}>Edit</Text>
				</TouchableOpacity>
			</View>

			{/* contact image */}
			<Image source={imageSource} style={styles.photo} />

			{/* name & number */}
			<Text style={styles.name}>{props.name}</Text>
			<Text style={styles.phone}>{props.number}</Text>

			{/* call button */}
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Button title="Call" onPress={props.onCall} />
			</View>
		</View>
	);
}
