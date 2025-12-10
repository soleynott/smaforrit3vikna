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

import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { getMovies } from '@/src/api/kvikmyndir';
import styles from './styles/upcoming_styles';

type Movie = {
  id: string;
  title: string;
  poster: string;
  releaseDate: string;
};

export default function UpcomingScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMovies();

        // Filter only UPCOMING movies
        const today = new Date();

        const upcoming = data.filter((movie: any) => {
          if (!movie.releaseDate) return false;
          return new Date(movie.releaseDate) > today;
        });

        setMovies(upcoming);
      } catch (e) {
        console.log('Error loading movies:', e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Sort by release date
  const sortedMovies = useMemo(() => {
    return [...movies].sort(
      (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );
  }, [movies]);

  return (
    <FlatList
      data={sortedMovies}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.poster }}
            style={styles.thumbnail}
          />

          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.releaseDate}>
              Release: {new Date(item.releaseDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

//VANTAR TRAILER PART