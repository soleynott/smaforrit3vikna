/**
 * upcoming movies screen
 *
 * should include
 *      -a user should see a list of all upcoming movies
 *          -ordered by release date (ascending order)
 *          -an upcoming movie should display a thumbnail, name and release date
 *      -a trailer which is associated with the upcoming movie can be watched within
 *      the application (note that not all upcoming movies have a trailer, so inly those who have)
 *
 */
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { fetchUpcoming } from '../redux/upcomingSlice';
import styles from './styles/upcoming_styles';
import { UpcomingScreenList } from '../components/upcomingscreen/upcomingscreen_list';

// type Movie = {
// 	id: string;
// 	title: string;
// 	poster: string;
// 	releaseDate: string;
// };

// export default function UpcomingScreen() {
// 	const [movies, setMovies] = useState<Movie[]>([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		async function load() {
// 			try {
// 				const data = await getUpcoming();

// 				//   // Filter only UPCOMING movies
// 				//   const today = new Date();

// 				//   const upcoming = data.filter((movie: any) => {
// 				//     if (!movie.releaseDate) return false;
// 				//     return new Date(movie.releaseDate) > today;
// 				//   });

// 				//   setMovies(upcoming);
// 				// } catch (e) {
// 				//   console.log('Error loading movies:', e);
// 			} finally {
// 				setLoading(false);
// 			}
// 		}

// 		load();
// 	}, []);

// 	// // Sort by release date
// 	// const sortedMovies = useMemo(() => {
// 	// 	return [...movies].sort(
// 	// 		(a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
// 	// 	);
// 	// }, [movies]);

// 	return (
// 		<FlatList
// 			data={sortedMovies}
// 			keyExtractor={(item) => item.id}
// 			contentContainerStyle={styles.listContent}
// 			renderItem={({ item }) => (
// 				<View style={styles.card}>
// 					<Image source={{ uri: item.poster }} style={styles.thumbnail} />

// 					<View style={styles.info}>
// 						<Text style={styles.title}>{item.title}</Text>

// 						<Text style={styles.releaseDate}>
// 							Release: {new Date(item.releaseDate).toLocaleDateString()}
// 						</Text>
// 					</View>
// 				</View>
// 			)}
// 		/>
// 	);
// }

//VANTAR TRAILER PART

export default function UpcomingScreen() {
	const dispatch = useDispatch<AppDispatch>();

	const { upcoming: movies, loading, error } = useSelector((state: RootState) => state.upcoming);

	useEffect(() => {
		dispatch(fetchUpcoming());
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
			<UpcomingScreenList upcomingMovies={movies} />
		</View>
	);
}
