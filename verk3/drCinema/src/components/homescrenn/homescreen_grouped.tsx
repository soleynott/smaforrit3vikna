//grouping the movie lists of all cinemas

import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { HomeScreenList } from './homescreen_list';
import { Movie } from '../../types/movie_type';
import { Cinema } from '../../types/cinema_type';

// interface GroupedProps {
// 	cinemas: Cinema[];
// 	movies: Movie[];
// }
export default function HomeScreenGrouped({ cinemas }: { cinemas: Cinema[] }) {
	const byCinema = useSelector((state: RootState) => state.movies.byCinema);
	//for every cinema, get its movies

	return (
		<ScrollView>
			{cinemas.map((cinema) => {
				const grouped: Movie[] = byCinema[cinema.id] || [];
				return <HomeScreenList movies={grouped} cinema={cinema}></HomeScreenList>;
			})}
		</ScrollView>
	);
}
