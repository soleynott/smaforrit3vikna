import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { HomeScreenList } from './homescreen_list';
import { Movie } from '../../types/movie_type';
import { Cinema } from '../../types/cinema_type';

export default function HomeScreenGrouped({ cinemas }: { cinemas: Cinema[] }) {
	const byCinema = useSelector((state: RootState) => state.movies.byCinema);

	return (
		<ScrollView>
			{cinemas.map((cinema) => {
				const grouped: Movie[] = byCinema[cinema.id] || [];

				return (
					<HomeScreenList
						key={cinema.id.toString()}
						movies={grouped}
						cinema={cinema}
					/>
				);
			})}
		</ScrollView>
	);
}
