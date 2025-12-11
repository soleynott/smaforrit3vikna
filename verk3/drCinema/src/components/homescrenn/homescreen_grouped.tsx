//grouping the movie lists of all cinemas

import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { HomeScreenList } from './homescreen_list';

export default function HomeScreenGrouped({ byCinema }) {
	return (
		<ScrollView>
			{Object.entries(byCinema).map(([cinemaId, movies]) => {
				<HomeScreenList key={cinemaId} movies={movies} cinema={Cinema} />;
			})}
		</ScrollView>
	);
}
