import { StyleSheet } from 'react-native';
import colors from '@/src/resources/colors';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#fff',
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
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
	},
	year: {
		color: colors.primary,
		fontWeight: 'bold',
		marginTop: 6,
	},
	genres: {
		color: colors.secondary,
		marginTop: 8,
	},
	info: {
		color: colors.muted,
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
	topBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		marginTop: 10,
	},
	backButton: {
		paddingVertical: 8,
		alignSelf: 'flex-start',
		marginBottom: 10,
		borderRadius: 6,
	},
	heartButton: {
		padding: 6,
	},
	});
export default styles;
