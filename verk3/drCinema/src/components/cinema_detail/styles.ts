import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#fff',
	},
	backButton: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		alignSelf: 'flex-start',
		marginBottom: 10,
		borderRadius: 6,
	},
	backText: {
		fontWeight: '600',
	},
	header: {
		flexDirection: 'row',
		marginBottom: 15,
	},
	poster: {
		width: 140,
		height: 200,
		borderRadius: 8,
		marginRight: 12,
	},
	headerInfo: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
	},
	year: {
		color: '#666',
		marginTop: 6,
	},
	genres: {
		color: '#999',
		marginTop: 8,
	},
	section: {
		marginTop: 12,
	},
	sectionTitle: {
		fontWeight: '700',
		marginBottom: 6,
	},
	sectionText: {
		color: '#333',
	},
});
export default styles;
