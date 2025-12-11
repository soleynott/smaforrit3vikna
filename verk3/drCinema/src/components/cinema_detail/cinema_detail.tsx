import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Cinema } from '@/src/types/cinema_type';
import { Movie } from '@/src/types/movie_type';
import { HomeScreenList } from '../homescrenn/homescreen_list';
//import stylesShared from '@/src/views/styles_homescreen';
import { useRouter } from 'expo-router';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

interface CinemaDetailProps {
	cinema: Cinema;
	movies: Movie[];
}

export default function CinemaDetail({ cinema, movies }: CinemaDetailProps) {
	const router = useRouter();

	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<Ionicons name="arrow-back" size={28} color="black" />
			</TouchableOpacity>

			<View style={styles.header}>
				<View style={styles.headerInfo}>
					<Text style={styles.title}>{cinema.name}</Text>
					<Text style={styles.year}>
						{cinema.address}, {cinema.city}
					</Text>
					<Text style={styles.year}>{cinema.phone}</Text>
					<Text style={styles.year}>{cinema.website}</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionText}>
					{cinema.description?.replace(/<[^>]+>/g, '')} {/* remove HTML tags */}
				</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Movies</Text>
				<HomeScreenList movies={movies} />
			</View>
		</ScrollView>
	);
}
