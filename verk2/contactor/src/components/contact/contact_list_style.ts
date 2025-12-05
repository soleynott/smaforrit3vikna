import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 60,
	},
	portrait: {
		fontSize: 30,
		fontWeight: '700',
		paddingTop: 200,
		textAlign: 'center',
	},
	call: {
		fontSize: 20,
		color: '#007AFF',
		fontWeight: '500',
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: '#f2f2f7',
		marginTop: 14,
	},

	headerBar: {
		width: '100%',
		position: 'absolute',
		top: 20,
		right: 0,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		zIndex: 10,
	},

	editText: {
		fontSize: 18,
		color: '#007AFF',
		fontWeight: '600',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 999,
		backgroundColor: '#f2f2f7',
		
	},

	photo: {
		width: 180,
		height: 180,
		borderRadius: 90,
		marginTop: 40,
		marginBottom: 25,
	},

	name: {
		fontSize: 28,
		fontWeight: '700',
		marginBottom: 30,
		textAlign: 'center',
	},

	phone: {
		fontSize: 18,
		color: '#555',
		marginBottom: 10,
		paddingHorizontal: 18,
		paddingVertical: 8,
		borderRadius: 16,
		backgroundColor: '#f2f2f7',
	},

});

export default styles;
