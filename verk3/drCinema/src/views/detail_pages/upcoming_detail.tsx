/**
 * cinema detail screen
 *
 * should include
 *      -see detailed information on the selected cinema
 *          -name
 *          -description
 *          -complete address (including street name and city)
 *          -phone
 *          -website
 *      -see all movies associated with the cinema
 *      along with their showtime
 *          -a movie should display a thumbnail, name, release year and genres
 *          -each movie in the list should be clickable and when clicked
 *          the app should navigate to a detailed screen for the selected movie
 *
 */
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCinemaById } from '@/src/redux/cinemaSlice';
import { fetchMoviesByCinema } from '@/src/redux/movieSlice';
import { RootState, AppDispatch } from '@/src/redux/store';
import { useLocalSearchParams } from 'expo-router';
import CinemaDetail from '@/src/components/cinema_detail/cinema_detail';
import { fetchUpcomingById } from '@/src/redux/upcomingSlice';

export default function UpcomingDetailScreen(props: { id?: string }) {
	const params = useLocalSearchParams();
	const idParam = props.id ?? (params.id as string | undefined);
	const upcomingId = parseInt(idParam || '', 10);
	const dispatch = useDispatch<AppDispatch>();

	const { currentUpcoming, loading, error } = useSelector((state: RootState) => state.upcoming);

	useEffect(() => {
		if (!isNaN(upcomingId)) {
			dispatch(fetchUpcomingById(upcomingId));
		}
	}, [dispatch, upcomingId]);

	if (loading)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text>Loading upcoming...</Text>
			</View>
		);

	if (error)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text style={{ color: 'red' }}>Error loading upcoming: {error}</Text>
			</View>
		);

	if (!currentUpcoming)
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>No upcoming movie data available.</Text>
			</View>
		);

	return <UpcomingDetailScreen upcoming={currentUpcoming} />;
}
