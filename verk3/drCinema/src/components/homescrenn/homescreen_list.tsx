import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Movie } from '../../types/movie_type';
import { useRouter } from 'expo-router';
import { getTrailerKey } from '../../utils/trailer';
import * as WebBrowser from 'expo-web-browser';   // ✅

interface HomeScreenListProps {
	movies: Movie[];
}

export function HomeScreenList(props: HomeScreenListProps) {
	const router = useRouter();

	const handleWatchTrailer = async (trailerKey: string) => {
		const url = `https://www.youtube.com/watch?v=${trailerKey}`;
		await WebBrowser.openBrowserAsync(url);     // ✅
	};

	return (
		<ScrollView style={styles.container}>
			{props.movies.map((movie: Movie, index: number) => {
				const trailerKey = getTrailerKey(movie);

				return (
					<TouchableOpacity
						key={`${movie.id}-${movie._id || index}`}
						style={styles.movieItem}
						onPress={() => router.push(`/movie/${movie.id}`)}
					>
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
									onPress={() => handleWatchTrailer(trailerKey)}  // ✅
								>
									<Text style={styles.trailerButtonText}>Watch trailer</Text>
								</TouchableOpacity>
							)}
						</View>

						<View style={styles.movieInfo}>
							<View>
								<Text style={styles.title}>{movie.title}</Text>
								{movie.alternativeTitles && (
									<Text style={styles.info}>{movie.alternativeTitles}</Text>
								)}
								<Text style={styles.year}>Year: {movie.year}</Text>
								<Text style={styles.genres}>
									{movie.genres?.map((g) => g.Name).join(', ') || 'N/A'}
								</Text>
							</View>

							<View>
								{movie.plot && (
									<Text style={styles.plot} numberOfLines={3}>
										{movie.plot}
									</Text>
								)}
								{movie.ratings?.imdb && (
									<Text style={styles.rating}>IMDb: {movie.ratings.imdb}</Text>
								)}
								{movie.ratings?.rotten_critics && (
									<Text style={styles.rating}>
										Rotten Tomatoes: {movie.ratings.rotten_critics}
									</Text>
								)}
							</View>
						</View>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
}
