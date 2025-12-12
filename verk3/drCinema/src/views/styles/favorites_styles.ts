import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

export default StyleSheet.create({
	listContent: {
		paddingVertical: 12,
	},

	card: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 14,
		backgroundColor: '#FFFFFF',
		marginBottom: 14,
		borderRadius: 14,

		// subtle shadow for elevation
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 8,
		elevation: 3,
	},

	thumbnail: {
		width: 60,
		height: 90,
		borderRadius: 8,
		marginRight: 14,
		backgroundColor: '#E3E3EE',
	},

	info: {
		flex: 1,
	},

	title: {
		fontSize: 18,
		fontWeight: '800',
		color: '#111118',
		letterSpacing: 0.3,
	},

	year: {
		marginTop: 2,
		fontSize: 14,
		color: '#6B6B7A',
	},

	genres: {
		marginTop: 2,
		fontSize: 13,
		color: '#7A8FA6',
		fontWeight: '600',
	},

	actionsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
	},

	moveButton: {
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#D6D6D6',
		marginRight: 10,
		backgroundColor: '#FFFFFF',

		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},

	moveButtonText: {
		fontSize: 14,
		fontWeight: '700',
		color: '#333',
	},

	removeButton: {
		paddingHorizontal: 6,
		paddingVertical: 6,
		marginLeft: 6,
	},

	removeButtonText: {
		fontSize: 20,
		color: '#E63946', // clean red tone
		fontWeight: '800',
	},

	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},

	emptyText: {
		fontSize: 18,
		fontWeight: '800',
		color: '#111118',
		textAlign: 'center',
	},

	emptySubText: {
		marginTop: 4,
		fontSize: 14,
		textAlign: 'center',
		color: '#6B6B7A',
	},

	rankContainer: {
		width: 32,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},

	rankText: {
		fontSize: 20,
		fontWeight: '800',
		color: '#111118',
	},
});
