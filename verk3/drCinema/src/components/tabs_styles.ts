import { Platform } from 'react-native';

export const tabBarStyle = {
  backgroundColor: '#FFFFFF',
  borderTopColor: '#E5E5EA',
  borderTopWidth: 1,
  paddingBottom: 8,
  paddingTop: 8,
  height: 60,
  // extra safe padding for ios devices with home indicator
  paddingHorizontal: Platform.OS === 'ios' ? 12 : 8,
};

export const tabColors = {
  active: '#007AFF',
  inactive: '#8E8E93',
};

export default { tabBarStyle, tabColors };
