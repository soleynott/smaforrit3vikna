import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	toolbar: {
		height: 50,
		justifyContent: 'center',
		backgroundColor: '#fff',
	},

	toolbarAction: {
		position: 'absolute',
		bottom: 20,
		right: 20,
	},

	toolbarActionText: {
		width: 30,
		height: 30,
		borderRadius: 30,
		backgroundColor: 'blue',
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export default styles;
