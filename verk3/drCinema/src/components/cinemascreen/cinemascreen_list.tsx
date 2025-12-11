import {
	ScrollView,
	Text,
	View,
	Image,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Cinema } from '../../types/cinema_type';
import { useRouter } from 'expo-router';

interface CinemaListProps {
	cinemas: Cinema[];
}

export function CinemaList(props: CinemaListProps) {
	const router = useRouter();
	return (
		<ScrollView style={styles.container}>
			{props.cinemas.map((cinema: Cinema, index: number) => (
				<TouchableOpacity
					key={`${cinema.id} || index}`}
					style={styles.cinemaItem}
					onPress={() => router.push(`/cinema/${cinema.id}`)}
				>
					<View style={styles.cinemaInfo}>
						<View>
							<Text style={styles.name}>{cinema.name}</Text>
							<Text style={styles.website}>{cinema.website}</Text>
						</View>
					</View>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
}
