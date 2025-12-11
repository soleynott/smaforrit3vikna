import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Cinema } from '@/src/types/cinema_type';
//import stylesShared from '@/src/views/styles_homescreen';
import { useRouter } from 'expo-router';

interface CinemaDetailProps {
	cinema: Cinema;
}

export default function CinemaDetail({ cinema }: CinemaDetailProps) {
	const router = useRouter();

	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<Text style={styles.backText}>Back</Text>
			</TouchableOpacity>

			<View style={styles.header}>
				<View style={styles.headerInfo}>
					<Text style={styles.title}>{cinema.name}</Text>
					<Text style={styles.year}>Year: {cinema.address}</Text>
					{/* <Text style={styles.genres}>
						{movie.genres?.map((g) => g.Name).join(', ') || 'N/A'}
					</Text> */}
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Plot</Text>
				<Text style={styles.sectionText}>{cinema.phone || 'No plot available'}</Text>
			</View>

			<View style={styles.section}>
				{/* <Text style={styles.sectionTitle}>Ratings</Text>
				<Text style={styles.sectionText}>IMDb: {movie.ratings?.imdb || 'N/A'}</Text>
				<Text style={styles.sectionText}>
					Rotten Critics: {movie.ratings?.rotten_critics ?? 'N/A'}
				</Text> */}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#fff',
	},
	backButton: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		alignSelf: 'flex-start',
		marginBottom: 10,
		backgroundColor: '#eee',
		borderRadius: 6,
	},
	backText: {
		fontWeight: '600',
	},
	header: {
		flexDirection: 'row',
		marginBottom: 15,
	},
	poster: {
		width: 140,
		height: 200,
		borderRadius: 8,
		marginRight: 12,
	},
	headerInfo: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
	},
	year: {
		color: '#666',
		marginTop: 6,
	},
	genres: {
		color: '#999',
		marginTop: 8,
	},
	section: {
		marginTop: 12,
	},
	sectionTitle: {
		fontWeight: '700',
		marginBottom: 6,
	},
	sectionText: {
		color: '#333',
	},
});
