import React, { use, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById, fetchShowtimesForMovie } from '@/src/redux/movieSlice';
import { RootState, AppDispatch } from '@/src/redux/store';
import { useLocalSearchParams } from 'expo-router';
import MovieDetail from '@/src/components/movie_detail/movie_detail';
import { fetchCinemaById } from '@/src/redux/cinemaSlice';
import { Cinema } from '@/src/types/cinema_type';

/**
 * movie screen
 *
 * should include
 *      -see detailed information about the selected movie
 *          -name
 *          -image (poster)
 *          -plot
 *          -duration (in minutes)
 *          -year of release
 *          -rating (PG, etc)
 *          -director
 *          -writers
 *          -actors
 *          -country of origin
 *          -ratings (IMDB, Rotten Tomatoes)
 *          -genres
 *
 *      -be able to see the showtimes of the movie
 *      (only in the cinema which was selected when this particular
 *      movie was selected) and a way to purchase a ticket via a link
 *
 *      -a trailer which is associated with the movie can be watched within the application
 *      (note that some movies might not have a trailer, and therefore an empty state should be displayed)
 *
 */

export default function MovieView(props: { id?: string }) {
	const params = useLocalSearchParams();
	const idParam = props.id ?? (params.id as string | undefined);
	const movieId = parseInt(idParam || '', 10);
	const dispatch = useDispatch<AppDispatch>();
	const cinemaId = params.cinemaId as string | undefined;

	const { currentMovie, loading, error } = useSelector((state: RootState) => state.movies);
	const currentCinema = useSelector((state: RootState) => state.cinemas.currentCinema);

	useEffect(() => {
		if (!isNaN(movieId)) {
			dispatch(fetchMovieById(movieId));
		}
	}, [dispatch, movieId]);

	useEffect(() => {
		if (cinemaId) {
			dispatch(fetchCinemaById(Number(cinemaId)));
		}
	}, [dispatch, cinemaId]);

	const showtimes = useSelector((state: RootState) => state.movies.showtimes);

	useEffect(() => {
		if (!isNaN(movieId) && cinemaId) {
			dispatch(
				fetchShowtimesForMovie({ movieId: Number(movieId), cinemaId: Number(cinemaId) }),
			);
		}
	}, [dispatch, movieId, cinemaId]);

	if (loading)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text>Loading movie...</Text>
			</View>
		);

	if (error)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ color: 'red' }}>Error: {error}</Text>
			</View>
		);

	if (!currentMovie || !currentCinema)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>No movie found</Text>
			</View>
		);

	return <MovieDetail movie={currentMovie} cinema={currentCinema} showtimes={showtimes} />;
}
