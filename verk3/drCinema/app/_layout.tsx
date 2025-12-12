import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';
import { tabBarStyle, tabColors } from '@/src/components/tabs_styles';

export default function RootLayout() {
	return (
		<Provider store={store}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Tabs
					screenOptions={{
						tabBarActiveTintColor: tabColors.active,
						tabBarInactiveTintColor: tabColors.inactive,
						tabBarStyle: tabBarStyle,
						headerShown: true,
					}}
				>
					<Tabs.Screen
						name="index"
						options={{
							title: 'Dr. Cinema',
							tabBarLabel: 'Home',
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="home" color={color} size={size} />
							),
							headerTitle: 'Dr. Cinema',
						}}
					/>
					<Tabs.Screen
						name="cinemas"
						options={{
							title: 'Cinemas',
							tabBarLabel: 'Cinemas',
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="film" color={color} size={size} />
							),
							headerTitle: 'Cinemas',
						}}
					/>
					<Tabs.Screen
						name="upcoming"
						options={{
							title: 'Upcoming movies',
							tabBarLabel: 'Upcoming',
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="calendar" color={color} size={size} />
							),
							headerTitle: 'Upcoming Movies',
						}}
					/>
					<Tabs.Screen
						name="favourites"
						options={{
							title: 'Your Favourites',
							tabBarLabel: 'Favorites',
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="heart" color={color} size={size} />
							),
							headerTitle: 'Your Favorites',
						}}
					/>
					<Tabs.Screen
						name="movie/[id]"
						options={{
							href: null,
							title: 'Movie detail',
						}}
					/>
					<Tabs.Screen
						name="cinema/[id]"
						options={{
							href: null,
							title: 'Cinema detail',
						}}
					/>
					<Tabs.Screen
						name="upcoming/[id]"
						options={{
							href: null,
							headerTitle: 'Upcoming Movie Detail',
						}}
					/>
				</Tabs>
			</GestureHandlerRootView>
		</Provider>
	);
}
