import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		backgroundColor: colors.background,
	},

	cinemaItem: {
		marginBottom: 16,
		backgroundColor: '#FFFFFF',
		borderRadius: 14,
		overflow: 'hidden',
		flexDirection: 'row',
		minHeight: 90,

		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 8,
		elevation: 3,
	},

	cinemaInfo: {
		flex: 1,
		paddingVertical: 14,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},

	name: {
		fontSize: 18,
		fontWeight: '800',
		marginBottom: 4,
		color: colors.title,
		letterSpacing: 0.3,
	},

	location: {
		fontSize: 14,
		color: '#6B6B7A',
		marginBottom: 2,
	},

	website: {
		fontSize: 13,
		color: colors.primary,
		marginTop: 2,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.background,
	},

	errorText: {
		fontSize: 16,
		color: colors.error,
	},
});

export default styles;
