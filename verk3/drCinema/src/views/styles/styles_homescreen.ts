import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		fontSize: 16,
		color: colors.error,
		padding: 20,
	},
});
export default styles;
