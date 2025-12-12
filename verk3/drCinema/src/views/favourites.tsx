/**
 * favourites screen
 *
 * should include
 *      -a user should see a list of all movies that
 *      have been added to favourites.
 *      the list should be stored using AsyncStorage
 *          -a movie should display a thumbnail, name, release year and genres
 *          -each movie in the list should be clickable and when clicked
 *          the app should navigate to a detailed screen for the selected movie
 *
 *      -each movie can be removed from the list
 *      -each movie can be reordered within the list, creating a prioritised list of favourite movies
 *
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/favorites_styles';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Showtime } from '../types/movie_type';

type Movie = {
	id: string;
	_id: string;
	title: string;
	poster: string;
	year: number | string;
	genres?: string[];
	showtime?: string[];
};

const STORAGE_KEY = 'FAVOURITE_MOVIES';

export default function FavouritesScreen() {
	const [favourites, setFavourites] = useState<Movie[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const loadFavourites = useCallback(async () => {
		try {
			const json = await AsyncStorage.getItem(STORAGE_KEY);
			if (json) {
				const parsed: Movie[] = JSON.parse(json);
				setFavourites(parsed);
			}
		} catch (e) {
			console.log('Error loading favourites:', e);
		} finally {
			setLoading(false);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			loadFavourites();
			return () => {};
		}, [loadFavourites]),
	);


	const saveFavourites = async (movies: Movie[]) => {
		try {
			setFavourites(movies);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
		} catch (e) {
			console.log('Error saving favourites:', e);
		}
	};

	const handleRemove = async (movieId: string) => {
		const updated = favourites.filter((m) => m.id !== movieId);
		await saveFavourites(updated);
	};

	const moveItem = (index: number, direction: 'up' | 'down') => {
		const newIndex = direction === 'up' ? index - 1 : index + 1;
		if (newIndex < 0 || newIndex >= favourites.length) return;

		const updated = [...favourites];
		const temp = updated[index];
		updated[index] = updated[newIndex];
		updated[newIndex] = temp;

		saveFavourites(updated);
	};

	const handleMoviePress = (movie: Movie) => {
  		const isUpcoming = !movie.showtime || movie.showtime.length === 0;

		console.log(movie._id)
		if (isUpcoming) {
			router.push({
			pathname: '/upcoming/[_id]',
			params: { _id: movie._id },
		});
		} else {
			router.push({
			pathname: '/movie/[id]',
			params: { id: movie.id },
		});
		}
	};



const renderItem = ({ item, index }: { item: Movie; index: number }) => (
	<TouchableOpacity
		style={styles.card}
		activeOpacity={0.8}
		onPress={() => handleMoviePress(item)}
	>
		{/* 🔢 Rank number */}
		<View style={styles.rankContainer}>
			<Text style={styles.rankText}>{index + 1}</Text>
		</View>

		<Image source={{ uri: item.poster }} style={styles.thumbnail} />

		<View style={styles.info}>
			<Text style={styles.title}>{item.title}</Text>

			<Text style={styles.year}>{item.year}</Text>

			{item.genres && item.genres.length > 0 && (
				<Text style={styles.genres}>{item.genres.join(', ')}</Text>
			)}

			<View style={styles.actionsRow}>
				<TouchableOpacity
					onPress={() => moveItem(index, 'up')}
					style={styles.moveButton}
				>
					<Text style={styles.moveButtonText}>↑</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => moveItem(index, 'down')}
					style={styles.moveButton}
				>
					<Text style={styles.moveButtonText}>↓</Text>
				</TouchableOpacity>
			</View>
		</View>

		<TouchableOpacity
			onPress={() => handleRemove(item.id)}
			style={styles.removeButton}
		>
			<Text style={styles.removeButtonText}>✕</Text>
		</TouchableOpacity>
	</TouchableOpacity>
);

	if (loading) {
		return (
			<View style={styles.center}>
				<Text>Loading favourites...</Text>
			</View>
		);
	}

	if (!loading && favourites.length === 0) {
		return (
			<View style={styles.center}>
				<Text style={styles.emptyText}>No favourite movies yet.</Text>
				<Text style={styles.emptySubText}>
					Add some movies from the movie list screen.
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={favourites}
			keyExtractor={(item) => item.id}
			contentContainerStyle={styles.listContent}
			renderItem={renderItem}
		/>
	);
}