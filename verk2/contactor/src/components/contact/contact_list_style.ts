import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 20,
		paddingTop: 80,
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
		paddingHorizontal: 12,
		paddingVertical: 7,
		borderRadius: 999,
		backgroundColor: '#f2f2f7',
		marginTop: 10,
	},
	photo: {
		width: 200,
		height: 200,
		borderRadius: 100,
		marginBottom: 20,
	},
	name: {
		fontSize: 28,
		fontWeight: '700',
		letterSpacing: 0.5,
		marginBottom: 10,
		textAlign: 'center',
		width: '100%',
	},
	phone: {
		fontSize: 18,
		color: '#333',
		paddingHorizontal: 18,
		paddingVertical: 8,
		borderRadius: 999,
		backgroundColor: '#f2f2f7',
		textAlign: 'center',
	},
	header: {
		position: 'absolute',
		top: 0,
		right: 20,
		paddingTop: 10,
		zIndex: 10,
	},
	edit: {
		fontSize: 18,
		color: '#007AFF',
		fontWeight: '500',
		paddingHorizontal: 18,
		paddingVertical: 8,
		borderRadius: 999,
		backgroundColor: '#f2f2f7',
	},
});

export default styles;
