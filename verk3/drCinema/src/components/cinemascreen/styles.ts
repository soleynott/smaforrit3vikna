import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cinemaItem: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    minHeight: 100,
  },
  cinemaInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  website: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default styles;