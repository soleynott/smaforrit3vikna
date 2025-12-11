import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, Text, View } from 'react-native';

export default function TrailerScreen() {
	const { key } = useLocalSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (!key) return;

		const url = `https://www.youtube.com/watch?v=${key}`;
		Linking.openURL(url);

		// Automatically go back after opening browser
		router.back();
	}, [key]);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Opening trailer...</Text>
		</View>
	);
}
