import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMoviesByCinema } from '../redux/movieSlice';
import { fetchCinemas } from '../redux/cinemaSlice';
import { RootState, AppDispatch } from '../redux/store';
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Movie } from '../types/movie_type';
import { HomeScreenList } from '../components/homescrenn/homescreen_list';
import styles from './styles/styles_homescreen';
import HomeScreenGrouped from '../components/homescrenn/homescreen_grouped';

export default function HomeScreen() {
	const dispatch = useDispatch<AppDispatch>();
	const {
		cinemas,
		loading: cinemasLoading,
		error: cinemasError,
	} = useSelector((state: RootState) => state.cinemas);
	const moviesState = useSelector((state: RootState) => state.movies);

	useEffect(() => {
		dispatch(fetchMovies());
		dispatch(fetchCinemas());
	}, [dispatch]);

	useEffect(() => {
		cinemas.forEach((cinema) => {
			dispatch(fetchMoviesByCinema(cinema.id));
		});
	}, [dispatch, cinemas]);

	if (cinemasLoading || moviesState.loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text>Loading movies...</Text>
			</View>
		);
	}

	if (cinemasError) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.errorText}>Error: {cinemasError}</Text>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<HomeScreenGrouped cinemas={cinemas} />
		</View>
	);
}
