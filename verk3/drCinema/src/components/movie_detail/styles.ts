import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: colors.background,
	},

	header: {
		flexDirection: 'row',
		marginBottom: 15,
	},

	poster: {
		width: 140,
		height: 200,
		borderRadius: 12,
		marginRight: 12,
		backgroundColor: '#E3E3EE',
		shadowColor: '#000',
		shadowOpacity: 0.12,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		elevation: 4,
	},

	headerInfo: {
		flex: 1,
		justifyContent: 'flex-start',
	},

	title: {
		fontSize: 22,
		fontWeight: '800',
		color: colors.title,
		letterSpacing: 0.3,
	},

	year: {
		color: colors.primary,
		fontWeight: '800',
		marginTop: 6,
		fontSize: 15,
	},

	genres: {
		color: colors.secondary,
		marginTop: 8,
		fontSize: 13,
		fontWeight: '600',
	},

	info: {
		color: colors.muted,
		fontSize: 13,
	},

	topBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		marginTop: 10,
		paddingBottom: 6,
	},

	backButton: {
		paddingVertical: 8,
		paddingHorizontal: 6,
		alignSelf: 'flex-start',
		marginBottom: 10,
		borderRadius: 999,
	},

	heartButton: {
		padding: 6,
		borderRadius: 999,
	},

	section: {
		marginTop: 16,
	},

	sectionTitle: {
		fontWeight: '800',
		marginBottom: 8,
		fontSize: 17,
		color: colors.title,
		letterSpacing: 0.3,
	},

	sectionText: {
		color: '#333333',
		fontSize: 14,
		lineHeight: 20,
	},

	showtimeRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
		paddingHorizontal: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EFEFF4',
	},

	showtimeTime: {
		fontSize: 15,
		fontWeight: '600',
		color: colors.title,
	},

	ticketButton: {
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 999,
		backgroundColor: colors.primary,
		shadowColor: '#000',
		shadowOpacity: 0.16,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},

	ticketButtonText: {
		color: '#FFFFFF',
		fontWeight: '800',
		fontSize: 13,
		letterSpacing: 0.4,
	},
	ratingsRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
		marginTop: 20,
		marginBottom: 20,
	},
	ratingLabel: {
		fontSize: 14,
		fontWeight: '700',
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 8,
		color: '#fff',
		overflow: 'hidden',
	},
	imdbLabel: {
		backgroundColor: colors.imdb,
		color: '#000',
	},
	rottenLabel: {
		backgroundColor: colors.rotten,
	},

	trailerbutton: {
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: colors.primary,
		paddingVertical: 10,
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
