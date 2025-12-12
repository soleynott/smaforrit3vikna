import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 12,
		backgroundColor: colors.background,
	},

	cinemaName: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 10,
		color: colors.title,
		letterSpacing: 0.2,
	},

	movieItem: {
		marginRight: 14,
		marginBottom: 22,
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		overflow: 'hidden',
		flexDirection: 'row',
		minHeight: 250,
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 10,
		elevation: 4,
	},

	posterContainer: {
		width: 150,
		height: 250,
		position: 'relative',
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 16,
		overflow: 'hidden',
		backgroundColor: '#E3E3EE',
	},

	poster: {
		width: '100%',
		height: '100%',
	},

	movieInfo: {
		width: 160,
		flex: 1,
		paddingVertical: 14,
		paddingHorizontal: 14,
		justifyContent: 'space-between',
	},

	title: {
		fontSize: 18,
		fontWeight: '800',
		marginBottom: 4,
		color: colors.title,
		letterSpacing: 0.2,
	},

	year: {
		fontSize: 14,
		color: colors.primary,
		marginBottom: 4,
		fontWeight: '600',
	},

	genres: {
		fontSize: 12,
		color: colors.secondary,
		marginBottom: 8,
	},

	info: {
		fontSize: 13,
		color: '#6B6B7A',
		marginBottom: 4,
	},

	plot: {
		fontSize: 13,
		color: '#3A3A41',
		marginBottom: 10,
	},

	ratingLabel: {
			fontSize: 11,
			fontWeight: '700',
			paddingVertical: 4,
			paddingHorizontal: 10,
			borderRadius: 8,
			color: '#fff',
			overflow: 'hidden',
			marginBottom: 6,
		},
		imdbLabel: {
			backgroundColor: colors.imdb,
			color: '#000',
		},
		rottenLabel: {
			backgroundColor: colors.rotten,
		},

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
		shadowOpacity: 0.18,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 6,
		elevation: 5,
	},

	trailerButtonText: {
		color: '#FFFFFF',
		fontWeight: '700',
		fontSize: 13,
		letterSpacing: 0.3,
	},
});

export default styles;
