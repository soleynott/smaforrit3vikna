import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  
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
});
export default styles;