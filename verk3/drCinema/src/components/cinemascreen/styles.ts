import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		backgroundColor: '#FAFAFE', // soft background so cards pop
	},

	cinemaItem: {
		marginBottom: 16,
		backgroundColor: '#FFFFFF',
		borderRadius: 14,
		overflow: 'hidden',
		flexDirection: 'row',
		minHeight: 90,

		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 3 },
		shadowRadius: 8,
		elevation: 3,
	},

	cinemaInfo: {
		flex: 1,
		paddingVertical: 14,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},

	name: {
		fontSize: 18,
		fontWeight: '800',
		marginBottom: 4,
		color: '#111118',
		letterSpacing: 0.3,
	},

	location: {
		fontSize: 14,
		color: '#6B6B7A',
		marginBottom: 2,
	},

	website: {
		fontSize: 13,
		color: '#FF6A3D', // little pop of colour
		marginTop: 2,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FAFAFE',
	},

	errorText: {
		fontSize: 16,
		color: 'red',
	},
});

export default styles;
