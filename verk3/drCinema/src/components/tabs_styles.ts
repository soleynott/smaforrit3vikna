import { Platform } from 'react-native';
import colors from '../resources/colors';

export const tabBarStyle = {
	backgroundColor: '#FFFFFF',
	borderTopColor: 'rgba(0,0,0,0.05)',
	borderTopWidth: 1,

	height: 64,
	paddingTop: 6,
	paddingBottom: Platform.OS === 'ios' ? 12 : 8,
	shadowColor: '#000',
	shadowOpacity: 0.04,
	shadowOffset: { width: 0, height: -2 },
	shadowRadius: 8,
	elevation: 8,
};

export const tabColors = {
	active: colors.primary,
	inactive: '#8E8E93',
};

export default { tabBarStyle, tabColors };
