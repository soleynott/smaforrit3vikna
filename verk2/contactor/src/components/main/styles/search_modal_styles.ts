import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	overlayContainer: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 0,
		marginTop: -53,
	},
	searchHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderColor: '#eee',
		backgroundColor: 'white',
	},
	searchInput: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		padding: 10,
		borderRadius: 10,
		fontSize: 16,
	},
	cancelButton: {
		marginLeft: 12,
	},
	cancelText: {
		color: '#007aff',
		fontSize: 16,
	},
	listContent: {
		paddingVertical: 10,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	textContainer: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
	},
	phone: {
		fontSize: 14,
		color: '#666',
	},
});

export default styles;
