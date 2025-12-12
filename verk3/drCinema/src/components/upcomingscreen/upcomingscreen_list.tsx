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
import * as WebBrowser from 'expo-web-browser';   // ✅ ADD THIS

interface UpcomingScreenListProps {
	upcomingMovies: Movie[];
}

export function UpcomingScreenList(props: UpcomingScreenListProps) {
	const router = useRouter();

	const handleWatchTrailer = async (trailerKey: string) => {
		const url = `https://www.youtube.com/watch?v=${trailerKey}`;
		await WebBrowser.openBrowserAsync(url);    
	};

	return (
		<ScrollView style={styles.container}>
			{props.upcomingMovies.map((movie: Movie, index: number) => {
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
									onPress={() => handleWatchTrailer(trailerKey)} 
								>
									<Text style={styles.trailerButtonText}>Watch trailer</Text>
								</TouchableOpacity>
							)}
						</View>
						<View style={styles.movieInfo}>
							<View>
								<Text style={styles.title}>{movie.title}</Text>
								{movie.alternativeTitles && (
									<Text>{movie.alternativeTitles}</Text>
								)}
								<Text style={styles.release}>
									Release date:{' '}
									{movie.release_dateIS
										? new Date(movie.release_dateIS).toLocaleDateString(
												'is-IS',
												{
													year: '2-digit',
													month: 'short',
													day: '2-digit',
												},
										  )
										: 'N/A'}
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
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
}
