import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from '@/src/redux/movieSlice';
import { RootState, AppDispatch } from '@/src/redux/store';
import { useLocalSearchParams } from 'expo-router';
import MovieDetail from '@/src/components/movie_detail/movie_detail';

export default function MovieView(props: { id?: string }) {
  const params = useLocalSearchParams();
  const idParam = props.id ?? (params.id as string | undefined);
  const movieId = parseInt(idParam || '', 10);
  const dispatch = useDispatch<AppDispatch>();

  const { currentMovie, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (!isNaN(movieId)) {
      dispatch(fetchMovieById(movieId));
    }
  }, [dispatch, movieId]);

  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading movie...</Text>
    </View>
  );

  if (error) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{color:'red'}}>Error: {error}</Text>
    </View>
  );

  if (!currentMovie) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>No movie found</Text>
    </View>
  );

  return <MovieDetail movie={currentMovie} />;
}
