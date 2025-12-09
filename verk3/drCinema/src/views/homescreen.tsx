/**
 * home screen
 *
 * should include
 *      -see all movies which are being shown,
 *      where each movie is grouped by the cinema
 *      associated with the movie.
 *      note that a movie can be linked to multiple cinemas
 *      and should be displayed as part of all associated cinemas.
 *
 *      -a filter should be presented where a user can
 *      filter on the following criterias
 *          -title
 *          -rating both from Rotten tomatoes and IMDB
 *          -range of showtime, e.g. from 20:00 - 22:00
 *          -starring actors
 *          -directors
 *          -PG rating
 *
 *      -a movie should display a thumbnail, name, release year and genres
 *
 *      -each movie in the list should be clickable and when clicked
 *      the app should navigate to a detailed screen for the selected movie
 *
 */
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { getMovies } from '@/src/api/kvikmyndir';

export default function HomeScreen() {
	const [movies, setMovies] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			try {
				const data = await getMovies();
				setMovies(data);
			} catch (e) {
				console.log('Error loading movies:', e);
			} finally {
				setLoading(false);
			}
		}

		load();
	}, []);

	return (
		<FlatList
			data={movies} //index to remove duplicates
			keyExtractor={(item, index) => `${item.id}-${index}`}
			renderItem={({ item }) => (
				<View style={{ padding: 16 }}>
					<Image
						source={{ uri: item.poster }}
						style={{ width: 120, height: 180, borderRadius: 8 }}
					/>
					<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
					<Text>{item.year}</Text>
					<Text>{item.genres?.join(', ')}</Text>
				</View>
			)}
		/>
	);
}
