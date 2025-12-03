import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	formContainer: {
		gap: 15,
		paddingBottom: 20,
	},
	optionsContainer: {
		gap: 15,
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 12,
	},
	icon: {
		marginRight: 20,
	},
	optionText: {
		fontSize: 18,
		color: 'lightblue',
		fontWeight: 500,
	},
	imagePreviewContainer: {
		marginBottom: 15,
		alignItems: 'center',
	},
	imagePreview: {
		width: '100%',
		height: 200,
		borderRadius: 12,
		marginBottom: 10,
	},
	removeImageButton: {
		padding: 8,
		backgroundColor: '#ff6b6b',
		borderRadius: 8,
	},
	removeImageText: {
		color: 'white',
		fontSize: 14,
		fontWeight: '500',
	},
	imagePickerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		backgroundColor: '#4a90e2',
		borderRadius: 12,
		gap: 10,
	},
	imagePickerButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 12,
		borderRadius: 8,
		fontSize: 16,
		backgroundColor: 'white',
		marginBottom: 10,
	},
	descriptionInput: {
		textAlignVertical: 'top',
		minHeight: 100,
	},
	createButton: {
		backgroundColor: '#27ae60',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 10,
	},
	createButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default styles;
