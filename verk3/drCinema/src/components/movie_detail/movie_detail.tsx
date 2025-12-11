import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Movie } from '@/src/types/movie_type';
//import stylesShared from '@/src/views/styles_homescreen';
import { useRouter } from 'expo-router';
import styles from './styles';
import colors from '@/src/resources/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


interface MovieDetailProps {
	movie: Movie;
}
const STORAGE_KEY = 'FAVOURITE_MOVIES';

type FavouriteMovie = {
	id: string;
	title: string;
	poster: string;
	year: number | string;
	genres?: string[];
};

export default function MovieDetail({ movie }: MovieDetailProps) {
	const router = useRouter();
	const [isFavourite, setIsFavourite] = useState(false);
	const [checkingFav, setCheckingFav] = useState(true);

		useEffect(() => {
		const checkFavourite = async () => {
			try {
				const json = await AsyncStorage.getItem(STORAGE_KEY);
				if (!json) {
					setIsFavourite(false);
					return;
				}
				const favourites: FavouriteMovie[] = JSON.parse(json);
				const exists = favourites.some((m) => m.id === String(movie.id));
				setIsFavourite(exists);
			} catch (e) {
				console.log('Error checking favourite:', e);
			} finally {
				setCheckingFav(false);
			}
		};

		checkFavourite();
	}, [movie.id]);

	const toggleFavourite = async () => {
		try {
			const json = await AsyncStorage.getItem(STORAGE_KEY);
			let favourites: FavouriteMovie[] = json ? JSON.parse(json) : [];

			const idStr = String(movie.id);
			const existingIndex = favourites.findIndex((m) => m.id === idStr);

			if (existingIndex === -1) {
				// Add to favourites
				const toSave: FavouriteMovie = {
					id: idStr,
					title: movie.title,
					poster: movie.poster,
					year: movie.year,
					genres: movie.genres?.map((g) => g.Name) ?? [],
				};
				favourites = [...favourites, toSave];
				setIsFavourite(true);
			} else {
				// Remove from favourites (toggle behaviour)
				favourites.splice(existingIndex, 1);
				setIsFavourite(false);
			}

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
		} catch (e) {
			console.log('Error toggling favourite:', e);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.topBar}>
				<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
					<Ionicons name="arrow-back" size={28} color="black" />
				</TouchableOpacity>


				<TouchableOpacity
					onPress={toggleFavourite}
					disabled={checkingFav}
					style={styles.heartButton}
				>
					<Ionicons
						name={isFavourite ? "heart" : "heart-outline"}
						size={28}
						color={isFavourite ? "red" : "black"}
					/>
				</TouchableOpacity>
			</View>


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
					<Text style={styles.info}>Bönnuð innan {movie.certificate.is}</Text>
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
