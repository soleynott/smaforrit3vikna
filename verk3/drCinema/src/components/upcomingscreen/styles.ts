import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		backgroundColor: colors.background, // soft modern background
	},

	movieItem: {
		marginBottom: 22,
		backgroundColor: '#FFFFFF',
		borderRadius: 14,
		overflow: 'hidden',
		flexDirection: 'row',
		minHeight: 250,

		// subtle shadow
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 8,
		elevation: 4,
	},

	posterContainer: {
		width: 150,
		height: 250,
		borderTopLeftRadius: 14,
		borderBottomLeftRadius: 14,
		overflow: 'hidden',
		backgroundColor: '#E3E3EE',
	},

	poster: {
		width: '100%',
		height: '100%',
	},

	movieInfo: {
		flex: 1,
		paddingVertical: 14,
		paddingHorizontal: 14,
		justifyContent: 'space-between',
	},

	title: {
		fontSize: 20,
		fontWeight: '800',
		marginBottom: 6,
		color: '#111118',
		letterSpacing: 0.3,
	},

	release: {
		fontSize: 14,
		color: colors.primary,
		fontWeight: '700',
		marginBottom: 4,
	},

	genres: {
		fontSize: 13,
		color: colors.secondary,
		fontWeight: '600',
		marginBottom: 8,
	},

	plot: {
		fontSize: 14,
		color: '#3A3A41',
		lineHeight: 20,
		marginBottom: 10,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	errorText: {
		fontSize: 16,
		color: 'red',
		padding: 20,
	},

	trailerbutton: {
		position: 'absolute',
		bottom: 10,
		left: 10,
		right: 10,
		backgroundColor: colors.primary,
		paddingVertical: 8,
		borderRadius: 999,
		alignItems: 'center',
		justifyContent: 'center',

		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		elevation: 3,
	},

	trailerButtonText: {
		color: '#FFFFFF',
		fontWeight: '800',
		fontSize: 13,
		letterSpacing: 0.3,
	},
});

export default styles;
