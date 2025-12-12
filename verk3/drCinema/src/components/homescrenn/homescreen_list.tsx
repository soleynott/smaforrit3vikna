import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Movie } from '../../types/movie_type';
import { useRouter } from 'expo-router';
import { getTrailerKey } from '../../utils/trailer';
import * as WebBrowser from 'expo-web-browser';
import { Cinema } from '../../types/cinema_type';

interface HomeScreenListProps {
	movies: Movie[];
	cinema: Cinema;
}

export function HomeScreenList(props: HomeScreenListProps) {
	const router = useRouter();

	const handleWatchTrailer = async (trailerKey: string) => {
		const url = `https://www.youtube.com/watch?v=${trailerKey}`;
		await WebBrowser.openBrowserAsync(url);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.cinemaName}>{props.cinema.name}</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{props.movies.map((movie: Movie, index: number) => {
					const trailerKey = getTrailerKey(movie);

					return (
						<TouchableOpacity
							key={`${movie.id}-${movie._id || index}`}
							style={styles.movieItem}
							onPress={() =>
								router.push({
									pathname: `/movie/${movie.id}`,
									params: { cinemaId: props.cinema.id },
								})
							}
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
										<Text style={styles.info}>{movie.alternativeTitles}</Text>
									)}
									<Text style={styles.year}>Year: {movie.year}</Text>
									<Text style={styles.genres}>
										{movie.genres?.map((g) => g.Name).join(', ') || 'N/A'}
									</Text>
								</View>

								<View>
									{movie.ratings?.imdb && (
										<Text style={styles.imdb}>IMDb: {movie.ratings.imdb}</Text>
									)}
									{movie.ratings?.rotten_critics && (
										<Text style={styles.rotten}>
											Rotten Tomatoes: {movie.ratings.rotten_critics}
										</Text>
									)}
								</View>
							</View>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}
