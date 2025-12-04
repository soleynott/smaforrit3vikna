import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 60,
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
	},

	photo: {
		width: 180,
		height: 180,
		borderRadius: 90,
		marginTop: 40,
		marginBottom: 20,
	},

	name: {
		fontSize: 28,
		fontWeight: '700',
		marginBottom: 10,
		textAlign: 'center',
	},

	phone: {
		fontSize: 18,
		color: '#555',
		marginBottom: 30,
		paddingHorizontal: 18,
		paddingVertical: 8,
		borderRadius: 12,
		backgroundColor: '#f2f2f7',
		paddingTop: 12,
	},

	callButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: '#34C759', // iOS green
		paddingVertical: 14,
		paddingHorizontal: 26,
		borderRadius: 999,
		marginTop: 20,
	},

	callButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: '600',
	},
});

export default styles;
