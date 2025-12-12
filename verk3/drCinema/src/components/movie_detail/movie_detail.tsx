import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Movie, Showtime } from '@/src/types/movie_type';
//import stylesShared from '@/src/views/styles_homescreen';
import { useRouter } from 'expo-router';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Cinema } from '@/src/types/cinema_type';
import * as WebBrowser from 'expo-web-browser';
import { getTrailerKey } from '../../utils/trailer';
interface MovieDetailProps {
	movie: Movie;
	cinema: Cinema;
	showtimes: Showtime[];
}
const STORAGE_KEY = 'FAVOURITE_MOVIES';

type FavouriteMovie = {
	id: string;
	title: string;
	poster: string;
	year: number | string;
	genres?: string[];
};

export default function MovieDetail({ movie, cinema, showtimes }: MovieDetailProps) {
	const router = useRouter();
	const [isFavourite, setIsFavourite] = useState(false);
	const [checkingFav, setCheckingFav] = useState(true);

	const handleWatchTrailer = async (trailerKey: string) => {
		const url = `https://www.youtube.com/watch?v=${trailerKey}`;
		await WebBrowser.openBrowserAsync(url);
	};

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
				// Remove from favourites
				favourites.splice(existingIndex, 1);
				setIsFavourite(false);
			}

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
		} catch (e) {
			console.log('Error toggling favourite:', e);
		}
	};
	const trailerKey = getTrailerKey(movie);

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
						name={isFavourite ? 'heart' : 'heart-outline'}
						size={28}
						color={isFavourite ? 'red' : 'black'}
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
					<Text style={styles.info}>Bönnuð innan: {movie.certificate.is}</Text>
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
				<Text style={styles.sectionText}>{movie.plot || 'No plot available'}</Text>
			</View>

			<View style={styles.ratingsRow}>
				<Text style={[styles.ratingLabel, styles.imdbLabel]}>
					IMDb: {movie.ratings?.imdb || 'N/A'}
				</Text>

				<Text style={[styles.ratingLabel, styles.rottenLabel]}>
					Rotten: {movie.ratings?.rotten_critics ?? 'N/A'}
					{movie.ratings?.rotten_critics !== null ? '%' : ''}
				</Text>
			</View>

			{trailerKey && (
				<TouchableOpacity
					style={styles.trailerbutton}
					onPress={() => handleWatchTrailer(trailerKey)}
				>
					<Text style={styles.trailerButtonText}>Watch trailer</Text>
				</TouchableOpacity>
			)}

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Showtimes in {cinema?.name ?? 'Cinema'}</Text>
				{showtimes.length > 0 ? (
					showtimes.map((s: Showtime) =>
						s.schedule.map((sch, idx) => (
							<View key={`${s.cinema.id}-${idx}`} style={styles.showtimeRow}>
								<Text style={styles.showtimeTime}>{sch.time}</Text>

								<Pressable
									onPress={() => WebBrowser.openBrowserAsync(sch.purchase_url)}
									style={styles.ticketButton}
								>
									<Text style={styles.ticketButtonText}>Buy ticket</Text>
								</Pressable>
							</View>
						)),
					)
				) : (
					<Text style={styles.sectionText}>No showtimes available</Text>
				)}
			</View>
		</ScrollView>
	);
}
