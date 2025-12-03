import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#f2f2f7',
	},
	listContent: {
		paddingVertical: 8,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: 'white',
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		marginRight: 12,
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	name: {
		fontSize: 17,
		fontWeight: '500',
		marginBottom: 2,
	},
	phone: {
		fontSize: 14,
		color: 'gray',
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#d1d1d6',
		marginLeft: 76,
	},
});

export default styles;
