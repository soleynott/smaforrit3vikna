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
import { Cinema } from '@/src/types/cinema_type';

interface HomeScreenListProps {
	movies: Movie[];
	cinema: Cinema;
}

export function HomeScreenList(props: HomeScreenListProps) {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.cinemaName}>{props.cinema.name}</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}>
				{props.movies.map((movie: Movie, index: number) => (
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
									<Text style={styles.rating}>IMDb: {movie.ratings.imdb} </Text>
								)}
								{movie.ratings?.rotten_critics && (
									<Text style={styles.rating}>
										Rotten Tomatoes: {movie.ratings.rotten_critics}
									</Text>
								)}
							</View>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}
