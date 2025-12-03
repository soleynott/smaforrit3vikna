import { StyleSheet, Platform } from 'react-native';
const styles = StyleSheet.create({
	searchBarContainer: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderColor: '#eee',
	},

	searchInput: {
		backgroundColor: '#f0f0f0',
		padding: 12,
		borderRadius: 10,
		fontSize: 16,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'white',
	},

	listContent: {
		padding: 10,
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderColor: '#eee',
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},

	textContainer: {
		marginLeft: 12,
	},

	name: {
		fontSize: 16,
		fontWeight: '600',
	},

	phone: {
		fontSize: 12,
		color: '#888',
	},
});

export default styles;
