import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByCinema } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Movie } from '../types/movie_type';
import { HomeScreenList } from '../components/homescrenn/homescreen_list';
import styles from './styles/styles_homescreen';
import HomeScreenGrouped from '../components/homescrenn/homescreen_grouped';

export default function HomeScreen() {
	const dispatch = useDispatch<AppDispatch>();

	const { movies, loading, error } = useSelector((state: RootState) => state.movies);

	const {
		byCinema,
		loading: moviesLoading,
		error: moviesError,
	} = useSelector((state: RootState) => state.movies);

	useEffect(() => {
		dispatch(fetchMoviesByCinema());
	}, [dispatch]);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text>Loading movies...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.errorText}>Error: {error}</Text>
			</View>
		);
	}

	if (!movies || movies.length === 0) {
		return (
			<View style={styles.loadingContainer}>
				<Text>No movies found</Text>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<HomeScreenGrouped byCinema={byCinema} />
		</View>
	);
}
