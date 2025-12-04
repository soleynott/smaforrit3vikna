import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						title: 'Contacts',
					}}
				/>
				<Stack.Screen
					name="contact"
					options={{
						title: 'Contact Details',
					}}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}
