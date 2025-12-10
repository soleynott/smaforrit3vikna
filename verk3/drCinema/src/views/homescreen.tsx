import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie } from '../redux/movieSlice';
import { RootState, AppDispatch, store } from '../redux/store';
import { ScrollView, Text } from 'react-native';
import { Provider } from 'react-redux';


export default function Main() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovie());
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
	
		<ScrollView style={{ padding: 20 }}>
			<Text>{JSON.stringify(data, null, 2)}</Text>
		</ScrollView>
  );
}
