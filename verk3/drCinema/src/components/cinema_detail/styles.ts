import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#FAFAFE', // soft, modern background
	},

	backButton: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		alignSelf: 'flex-start',
		marginBottom: 12,
		borderRadius: 999,
	},

	backText: {
		fontWeight: '700',
		fontSize: 16,
		letterSpacing: 0.3,
		color: '#111118',
	},

	header: {
		marginBottom: 20,
	},

	title: {
		fontSize: 24,
		fontWeight: '800',
		color: '#111118',
		marginBottom: 8,
		letterSpacing: 0.3,
	},

	year: {
		color: '#FF6A3D',
		fontWeight: '700',
		marginTop: 2,
		fontSize: 15,
	},

	genres: {
		color: '#7A8FA6',
		marginTop: 6,
		fontSize: 14,
		fontWeight: '600',
	},

	section: {
		marginTop: 20,
	},

	sectionTitle: {
		fontWeight: '800',
		marginBottom: 8,
		fontSize: 17,
		color: '#111118',
		letterSpacing: 0.3,
	},

	sectionText: {
		color: '#3A3A41',
		fontSize: 15,
		lineHeight: 22,
	},
});

export default styles;
