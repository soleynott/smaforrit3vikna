/*import { useEffect } from 'react';
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
}*/
//spila trailer innan i appinu, virðist ekki virka i expo go
// export default function TrailerScreen() {
// 	const { key } = useLocalSearchParams();
// 	if (!key) {
// 		return <Text>No trailer available</Text>;
// 	}

// 	const youtubeUrl = `https://www.youtube-nocookie.com/embed/${key}`;

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<WebView
// 				source={{ uri: youtubeUrl }}
// 				style={{ flex: 1 }}
// 				allowsFullscreenVideo
// 				javaScriptEnabled
// 				domStorageEnabled
// 				renderLoading={() => <ActivityIndicator style={{ flex: 1 }} />}
// 				startInLoadingState
// 			/>
// 		</View>
// 	);
// }

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';

export default function TrailerScreen() {
	const { key } = useLocalSearchParams();
	const router = useRouter();

	const trailerKey = Array.isArray(key) ? key[0] : key;
	const trailerUrl = trailerKey
		? `https://www.youtube.com/watch?v=${trailerKey}`
		: null;

	useEffect(() => {
		const openTrailer = async () => {
			if (!trailerUrl) return;
			await WebBrowser.openBrowserAsync(trailerUrl);
		};

		openTrailer();
	}, [trailerUrl]);

	if (!trailerUrl) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>No trailer available.</Text>
				<TouchableOpacity onPress={() => router.back()}>
					<Text style={{ marginTop: 8, color: 'blue' }}>Go back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	// Simple loading state while the browser opens
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" />
			<Text>Opening trailer...</Text>
		</View>
	);
}
