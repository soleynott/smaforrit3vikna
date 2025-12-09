import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<Stack>
				<Stack.Screen
					name="homescreen"
					options={{
						title: 'Dr. Cinema',
					}}
				/>
				<Stack.Screen
					name="cinemas"
					options={{
						title: 'Cinemas',
					}}
				/>
				<Stack.Screen
					name="cinemaDetail"
					options={{
						title: 'Cinema detail',
					}}
				/>
				<Stack.Screen
					name="movie"
					options={{
						title: 'Movie',
					}}
				/>
				<Stack.Screen
					name="upcoming"
					options={{
						title: 'Upcoming movies',
					}}
				/>
				<Stack.Screen
					name="favourites"
					options={{
						title: 'Your Favourites',
					}}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}
