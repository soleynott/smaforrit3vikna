import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../redux/movieSlice';
import { RootState, AppDispatch } from '../redux/store';
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Movie } from '../types/movie_type';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  movieItem: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    minHeight: 250,
  },
  posterContainer: {
    width: 150,
    height: 250,
  },
  poster: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  movieInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  year: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  genres: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  plot: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB800',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    padding: 20,
  },
});

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
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
    <ScrollView style={styles.container}>
      {movies.map((movie: Movie, index: number) => (
        <View key={`${movie.id}-${movie._id || index}`} style={styles.movieItem}>
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
                <Text style={styles.year}>{movie.alternativeTitles}</Text>
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
        </View>
      ))}
    </ScrollView>
  );
}
