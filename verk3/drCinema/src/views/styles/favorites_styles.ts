import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	listContent: {
		paddingVertical: 8,
	},
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	thumbnail: {
		width: 60,
		height: 90,
		borderRadius: 6,
		marginRight: 12,
	},
	info: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
	},
	year: {
		marginTop: 2,
		fontSize: 14,
		color: '#555',
	},
	genres: {
		marginTop: 2,
		fontSize: 12,
		color: '#777',
	},
	actionsRow: {
		flexDirection: 'row',
		marginTop: 8,
	},
	moveButton: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#ccc',
		marginRight: 8,
	},
	moveButtonText: {
		fontSize: 14,
	},
	removeButton: {
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	removeButtonText: {
		fontSize: 18,
		color: '#d00',
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	emptyText: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
	},
	emptySubText: {
		marginTop: 4,
		fontSize: 14,
		textAlign: 'center',
		color: '#666',
	},
	rankContainer: {
	width: 32,
	alignItems: 'center',
	justifyContent: 'center',
	marginRight: 8,
	},

	rankText: {
		fontSize: 18,
		fontWeight: '700',
		color: '#000',
	},

});
