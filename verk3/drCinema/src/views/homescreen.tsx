import { useEffect, useState, useMemo, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMoviesByCinema } from '../redux/movieSlice';
import { fetchCinemas } from '../redux/cinemaSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../types/movie_type';
import { HomeScreenList } from '../components/homescrenn/homescreen_list';
import { FilterModal } from '../components/homescrenn/filter_modal';
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

	const timeToMinutes = (time: string) => {
		const [h, m] = time.split(':').map(Number);
		return !isNaN(h) ? h * 60 + (!isNaN(m) ? m : 0) : 0;
	};

	const filtered = useMemo(() => {
		if (!movies) return [];
		let result = [...movies];

		if (filters.title.trim()) {
			result = result.filter((m) => m.title.toLowerCase().includes(filters.title.toLowerCase()));
		}

		if (filters.imdbMin || filters.imdbMax) {
			result = result.filter((m) => {
				const rating = m.ratings?.imdb ? parseFloat(m.ratings.imdb) : 0;
				const min = filters.imdbMin ? parseFloat(filters.imdbMin) : 0;
				const max = filters.imdbMax ? parseFloat(filters.imdbMax) : 10;
				return rating >= min && rating <= max;
			});
		}

		if (filters.rottenMin || filters.rottenMax) {
			result = result.filter((m) => {
				const rating = m.ratings?.rotten_critics || 0;
				const min = filters.rottenMin ? parseFloat(filters.rottenMin) : 0;
				const max = filters.rottenMax ? parseFloat(filters.rottenMax) : 100;
				return rating >= min && rating <= max;
			});
		}

		if (filters.showtimeStart || filters.showtimeEnd) {
			result = result.filter((m) => {
				if (!m.showtimes || m.showtimes.length === 0) return false;
				const start = filters.showtimeStart ? timeToMinutes(filters.showtimeStart) : 0;
				const end = filters.showtimeEnd ? timeToMinutes(filters.showtimeEnd) : 1440;

				return m.showtimes.some((st) => 
					st.schedule.some((s) => {
						const time = timeToMinutes(s.time);
						return time >= start && time <= end;
					})
				);
			});
		}

		if (filters.actors.trim()) {
			const actorNames = filters.actors.split(',').map((a) => a.trim().toLowerCase()).filter(a => a);
			result = result.filter((m) =>
				actorNames.some((actor) =>
					m.actors_abridged.some((a) => a.name.toLowerCase().includes(actor))
				)
			);
		}

		if (filters.directors.trim()) {
			const directorNames = filters.directors.split(',').map((d) => d.trim().toLowerCase()).filter(d => d);
			result = result.filter((m) =>
				directorNames.some((director) =>
					m.directors_abridged.some((d) => d.name.toLowerCase().includes(director))
				)
			);
		}

		if (filters.pgRating.trim()) {
			result = result.filter((m) => m.certificate?.is?.toUpperCase() === filters.pgRating.toUpperCase());
		}

		return result;
	}, [movies, filters]);

	if (loading) {
	useEffect(() => {
		cinemas.forEach((cinema) => {
			dispatch(fetchMoviesByCinema(cinema.id));
		});
	}, [dispatch, cinemas]);

	if (cinemasLoading || moviesState.loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text>Loading...</Text>
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
			<View style={styles.headerBar}>
				<TouchableOpacity onPress={() => setShowFilter(true)} style={styles.filterButton}>
					<Feather name="filter" size={24} color="#4a90e2" />
				</TouchableOpacity>
			</View>
			<HomeScreenList movies={filtered} />
			<FilterModal isOpen={showFilter} onClose={() => setShowFilter(false)} />
			<HomeScreenGrouped cinemas={cinemas} />
		</View>
	);
}
