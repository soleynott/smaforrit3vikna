import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Movie } from '@/src/types/movie_type';
//import stylesShared from '@/src/views/styles_homescreen';
import { useRouter } from 'expo-router';
import styles from './styles';
import colors from '@/src/resources/colors';

interface MovieDetailProps {
	movie: Movie;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
	const router = useRouter();

	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<Text style={styles.backText}>Back</Text>
			</TouchableOpacity>

			<View style={styles.header}>
				{movie.poster && (
					<Image
						source={{ uri: movie.poster }}
						style={styles.poster}
						resizeMode="cover"
					/>
				)}
				<View style={styles.headerInfo}>
					<Text style={styles.title}>{movie.title}</Text>
					<Text style={styles.year}>{movie.year}</Text>
					<Text style={styles.genres}>
						{movie.genres?.map((g) => g.Name).join(', ') || 'N/A'}
					</Text>
					<Text style={styles.info}>Duration: {movie.durationMinutes} min</Text>
					<Text style={{ color: movie.certificate.color }}>
						Bönnuð innan {movie.certificate.is}
					</Text>
					<Text></Text>
					<Text style={styles.info}>
						Director: {movie.directors_abridged.map((d) => d.name).join(', ')}
					</Text>
					<Text style={styles.info}>
						Actors: {movie.actors_abridged.map((a) => a.name).join(', ')}
					</Text>
					<Text style={styles.info}>
						Country of Origin: {movie.omdb[0]?.Country || 'N/A'}
					</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Plot</Text>
				<Text style={styles.sectionText}>{movie.plot || 'No plot available'}</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Ratings</Text>
				<Text style={styles.sectionText}>IMDb: {movie.ratings?.imdb || 'N/A'}</Text>
				<Text style={styles.sectionText}>
					Rotten Critics: {movie.ratings?.rotten_critics ?? 'N/A'}
					{movie.ratings.rotten_critics !== null ? '%' : ''}
				</Text>
			</View>
		</ScrollView>
	);
}
