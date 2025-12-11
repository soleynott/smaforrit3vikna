import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	movieItem: {
		marginBottom: 20,
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		overflow: 'hidden',
		flexDirection: 'row',
		minHeight: 250,
	},
	posterContainer: {
		width: 150,
		height: 250,
		position: 'relative',
	},
	poster: {
		width: '100%',
		height: '100%',
		backgroundColor: '#e0e0e0',
	},
	movieInfo: {
		flex: 1,
		padding: 15,
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	year: {
		fontSize: 14,
		color: '#666',
		marginBottom: 5,
	},
	release: {
		fontSize: 14,
		color: colors.primary,
		marginBottom: 5,
	},
	genres: {
		fontSize: 12,
		color: colors.secondary,
		marginBottom: 8,
	},
	plot: {
		fontSize: 13,
		color: '#333',
		marginBottom: 100,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		fontSize: 16,
		color: 'red',
		padding: 20,
	},
	trailerbutton: {
		backgroundColor: colors.primary,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
		position: 'absolute',
		bottom: 0,
		left: 160,
	},
	trailerButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 14,
	},
});
export default styles;
