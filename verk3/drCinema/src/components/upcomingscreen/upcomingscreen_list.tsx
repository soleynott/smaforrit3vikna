import {
	ScrollView,
	Text,
	View,
	Image,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Movie } from '../../types/movie_type';
import { useRouter } from 'expo-router';
import { getTrailerKey } from '../../utils/trailer';

interface UpcomingScreenListProps {
	upcomingMovies: Movie[];
}
export function UpcomingScreenList(props: UpcomingScreenListProps) {
	const router = useRouter();

	return (
		<ScrollView style={styles.container}>
			{props.upcomingMovies.map((movie: Movie, index: number) => {
				const trailerKey = getTrailerKey(movie);

				return (
					<View key={`${movie.id}-${movie._id || index}`} style={styles.movieItem}>
						<View style={styles.posterContainer}>
							{movie.poster && (
								<Image
									source={{ uri: movie.poster }}
									style={styles.poster}
									resizeMode="cover"
								/>
							)}
							{trailerKey && (
								<TouchableOpacity
									style={styles.trailerbutton}
									onPress={() => router.push(`/trailer/${trailerKey}`)}
								>
									<Text style={styles.trailerButtonText}>Watch Trailer</Text>
								</TouchableOpacity>
							)}
						</View>
						<View style={styles.movieInfo}>
							<View>
								<Text style={styles.title}>{movie.title}</Text>
								{movie.alternativeTitles && (
									<Text style={styles.year}>{movie.alternativeTitles}</Text>
								)}
								<Text style={styles.year}>
									Release date: {movie.release_dateIS}
								</Text>
								<Text style={styles.genres}>
									{movie.genres?.map((g) => g.Name).join(', ') || 'N/A'}
								</Text>
								{movie.plot && (
									<Text style={styles.plot} numberOfLines={4}>
										{movie.plot}
									</Text>
								)}
							</View>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
}
