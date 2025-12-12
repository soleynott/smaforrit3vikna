import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 50,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	body: {
		padding: 16,
	},
	field: {
		marginBottom: 20,
	},

	label: {
		fontSize: 13,
		fontWeight: '600',
		marginBottom: 6,
		color: '#333',
	},
	label2: {
		fontSize: 13,
		fontWeight: '600',
		marginBottom: 6,
		color: '#333',
		paddingLeft: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		backgroundColor: colors.background,
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	marginLeft: {
		marginLeft: 8,
	},
	multiline: {
		minHeight: 80,
		textAlignVertical: 'top',
	},
	actions: {
		flexDirection: 'row',
		gap: 8,
		marginVertical: 20,
		marginBottom: 40,
	},
	buttonClear: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#ddd',
		alignItems: 'center',
	},
	buttonClearText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#666',
	},
	buttonApply: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 6,
		backgroundColor: '#4a90e2',
		alignItems: 'center',
	},
	buttonApplyText: {
		fontSize: 14,
		fontWeight: '600',
		color: colors.white,
	},
	column: {
		flexDirection: 'column',
	},
	flex1: {
		flex: 1,
	},
});
export default styles;