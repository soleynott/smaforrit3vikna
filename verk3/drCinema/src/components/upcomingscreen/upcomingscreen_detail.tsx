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
import styles from '../movie_detail/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Cinema } from '@/src/types/cinema_type';
import * as WebBrowser from 'expo-web-browser';
import { getTrailerKey } from '../../utils/trailer';

interface UpcomingDetailProps {
	upcoming: Movie;
}
const STORAGE_KEY = 'FAVOURITE_MOVIES';

type FavouriteMovie = {
	id: string;
	title: string;
	poster: string;
	year: number | string;
	genres?: string[];
};

export default function UpcomingDetail({ upcoming }: UpcomingDetailProps) {
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
				const exists = favourites.some((m) => m.id === String(upcoming.id));
				setIsFavourite(exists);
			} catch (e) {
				console.log('Error checking favourite:', e);
			} finally {
				setCheckingFav(false);
			}
		};

		checkFavourite();
	}, [upcoming.id]);

	const toggleFavourite = async () => {
		try {
			const json = await AsyncStorage.getItem(STORAGE_KEY);
			let favourites: FavouriteMovie[] = json ? JSON.parse(json) : [];

			const idStr = String(upcoming.id);
			const existingIndex = favourites.findIndex((m) => m.id === idStr);

			if (existingIndex === -1) {
				// Add to favourites
				const toSave: FavouriteMovie = {
					id: idStr,
					title: upcoming.title,
					poster: upcoming.poster,
					year: upcoming.year,
					genres: upcoming.genres?.map((g) => g.Name) ?? [],
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
	const trailerKey = getTrailerKey(upcoming);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.topBar}>
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
				{upcoming.poster && (
					<Image
						source={{ uri: upcoming.poster }}
						style={styles.poster}
						resizeMode="cover"
					/>
				)}
				<View style={styles.headerInfo}>
					<Text style={styles.title}>{upcoming.title}</Text>
					<Text style={styles.year}>{upcoming.year}</Text>
					<Text style={styles.genres}>
						{upcoming.genres?.map((g) => g.Name).join(', ') || 'N/A'}
					</Text>
					<Text style={styles.info}>Duration: {upcoming.durationMinutes} min</Text>
					<Text style={styles.info}>Bönnuð innan: {upcoming.certificate.is}</Text>
					<Text></Text>
					<Text style={styles.info}>
						Director: {upcoming.directors_abridged.map((d) => d.name).join(', ')}
					</Text>
					<Text style={styles.info}>
						Actors: {upcoming.actors_abridged.map((a) => a.name).join(', ')}
					</Text>
					<Text style={styles.info}>
						Country of Origin: {upcoming.omdb[0]?.Country || 'N/A'}
					</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionText}>{upcoming.plot || 'No plot available'}</Text>
			</View>

			<View style={styles.ratingsRow}>
				{upcoming.ratings?.imdb ? (
					<Text style={[styles.ratingLabel, styles.imdbLabel]}>
						IMDb: {upcoming.ratings.imdb}
					</Text>
				) : (
					<Text style={[styles.ratingLabel, styles.imdbLabel]}>Rotten: N/A</Text>
				)}
				{upcoming.ratings?.rotten_critics != 0 ? (
					<Text style={[styles.ratingLabel, styles.rottenLabel]}>
						Rotten: {upcoming.ratings.rotten_critics}%
					</Text>
				) : (
					<Text style={[styles.ratingLabel, styles.rottenLabel]}>Rotten: N/A</Text>
				)}
			</View>

			{trailerKey && (
				<TouchableOpacity
					style={styles.trailerbutton}
					onPress={() => handleWatchTrailer(trailerKey)}
				>
					<Text style={styles.trailerButtonText}>Watch trailer</Text>
				</TouchableOpacity>
			)}
		</ScrollView>
	);
}
