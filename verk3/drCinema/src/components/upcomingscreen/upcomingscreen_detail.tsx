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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { getTrailerKey } from '../../utils/trailer';
import styles from '../movie_detail/styles';

// IMPORTANT: Upcoming movies do NOT match Movie type.
// You should create an Upcoming type, but for now we'll use loose typing:
interface UpcomingDetailProps {
	upcoming: any;
}

const STORAGE_KEY = 'FAVOURITE_MOVIES';

export default function UpcomingDetail({ upcoming }: UpcomingDetailProps) {
	const router = useRouter();
	const [isFavourite, setIsFavourite] = useState(false);
	const [checkingFav, setCheckingFav] = useState(true);

	const handleWatchTrailer = async (key: string) => {
		const url = `https://www.youtube.com/watch?v=${key}`;
		await WebBrowser.openBrowserAsync(url);
	};

	// ---------- FAVOURITES ----------
	useEffect(() => {
		const checkFavourite = async () => {
			try {
				const json = await AsyncStorage.getItem(STORAGE_KEY);
				if (!json) {
					setIsFavourite(false);
					return;
				}
				const favourites = JSON.parse(json);
				const exists = favourites.some((m: any) => m.id === String(upcoming.id));
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
			let favourites = json ? JSON.parse(json) : [];

			const idStr = String(upcoming.id);
			const existingIndex = favourites.findIndex((m: any) => m.id === idStr);

			if (existingIndex === -1) {
				const toSave = {
					id: idStr,
					_id: upcoming._id,
					title: upcoming.title,
					poster: upcoming.poster,
					year: upcoming.year,
					genres: upcoming.genres?.map((g: any) => g.Name) ?? [],
				};
				favourites.push(toSave);
				setIsFavourite(true);
			} else {
				favourites.splice(existingIndex, 1);
				setIsFavourite(false);
			}

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
		} catch (e) {
			console.log('Error toggling favourite:', e);
		}
	};

	// Trailers
	const trailerKey = getTrailerKey(upcoming);

	return (
		<ScrollView style={styles.container}>
			{/* HEART BUTTON */}
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

			{/* HEADER */}
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

					{/* Genres */}
					<Text style={styles.genres}>
						{upcoming.genres?.map((g: any) => g.Name).join(', ') || 'N/A'}
					</Text>

					{/* Directors */}
					<Text style={styles.info}>
						Director:{' '}
						{upcoming.directors_abridged?.map((d: any) => d.name).join(', ') ?? 'N/A'}
					</Text>

					{/* Actors */}
					<Text style={styles.info}>
						Actors:{' '}
						{upcoming.actors_abridged?.map((a: any) => a.name).join(', ') ?? 'N/A'}
					</Text>

					{/* Country (from OMDB if present) */}
					<Text style={styles.info}>Country: {upcoming.omdb?.[0]?.Country ?? 'N/A'}</Text>
				</View>
			</View>

			{/* PLOT */}
			<View style={styles.section}>
				<Text style={styles.sectionText}>{upcoming.plot || 'No plot available'}</Text>
			</View>

			{/* TRAILER BUTTON */}
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
