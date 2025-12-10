import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  releaseDate: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
});
