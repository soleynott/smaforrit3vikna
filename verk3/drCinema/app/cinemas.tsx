//cinemas screen
import { CinemasScreen } from '@/src/views/cinemas';
import { useEffect, useState } from 'react';
import { getCinemas } from '@/src/api/kvikmyndir';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function CinemasWrapper() {
	const [cinemas, setCinemas] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function load() {
			try {
				const data = await getCinemas();
				// Transform the API response to match Cinema type
				// Assuming the API returns an array of cinema objects
				const transformedCinemas = (data || []).map((cinema: any) => ({
					id: cinema.id || cinema.theatreId,
					name: cinema.name || cinema.theatre,
					website: cinema.website || cinema.link || '',
				}));
				setCinemas(transformedCinemas);
			} catch (e) {
				console.log('Error loading cinemas:', e);
			} finally {
				setLoading(false);
			}
		}

		load();
	}, []);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#007AFF" />
				<Text style={{ marginTop: 12 }}>Loading cinemas...</Text>
			</View>
		);
	}

	return (
		<CinemasScreen
			cinemas={cinemas}
			onCinemaPress={(cinema) => {
				// Navigate to cinema detail screen
				router.push({
					pathname: '/cinema_detail',
					params: {
						cinemaId: cinema.id,
						cinemaName: cinema.name,
					},
				});
			}}
		/>
	);
}
