import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';

export default function RootLayout() {
	return (
		<Provider store={store}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen
						name="index"
						options={{ title: 'Dr. Cinema' }}
					/>
					<Stack.Screen
						name="cinemas"
						options={{ title: 'Cinemas' }}
					/>
					<Stack.Screen
						name="cinema_detail"
						options={{ title: 'Cinema detail' }}
					/>
					<Stack.Screen
						name="movie"
						options={{ title: 'Movie' }}
					/>
					<Stack.Screen
						name="upcoming"
						options={{ title: 'Upcoming movies' }}
					/>
					<Stack.Screen
						name="favourites"
						options={{ title: 'Your Favourites' }}
					/>
				</Stack>
			</GestureHandlerRootView>
		</Provider>
	);
}
