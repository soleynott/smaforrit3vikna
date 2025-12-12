import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/src/redux/store';
import { useLocalSearchParams } from 'expo-router';
import { fetchUpcomingById } from '@/src/redux/upcomingSlice';
import UpcomingDetail from '@/src/components/upcomingscreen/upcomingscreen_detail';

export default function UpcomingDetailScreen(props: { id?: string }) {
	const params = useLocalSearchParams();
	const idParam = props.id ?? (params.id as string);
	const upcomingId = idParam as string;
	const dispatch = useDispatch<AppDispatch>();

	const { currentUpcoming, loading, error } = useSelector((state: RootState) => state.upcoming);

	useEffect(() => {
		if (upcomingId) {
			dispatch(fetchUpcomingById(upcomingId));
		}
	}, [upcomingId]);

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

	return <UpcomingDetail upcoming={currentUpcoming} />;
}
