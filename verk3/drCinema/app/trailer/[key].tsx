import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function TrailerScreen() {
	const { key } = useLocalSearchParams();
	if (!key) {
		return <Text>No trailer available</Text>;
	}

	const youtubeUrl = `https://www.youtube-nocookie.com/embed/${key}`;

	return (
		<View style={{ flex: 1 }}>
			<WebView
				source={{ uri: youtubeUrl }}
				style={{ flex: 1 }}
				allowsFullscreenVideo
				javaScriptEnabled
				domStorageEnabled
				renderLoading={() => <ActivityIndicator style={{ flex: 1 }} />}
				startInLoadingState
			/>
		</View>
	);
}
