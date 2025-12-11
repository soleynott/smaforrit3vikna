import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUpcoming } from '../api/kvikmyndir';
import { Movie } from '../types/movie_type';

interface UpcomingState {
	upcoming: Movie[];
	loading: boolean;
	error: string | null;
}

const initialState: UpcomingState = {
	upcoming: [],
	loading: false,
	error: null,
};

export const fetchUpcoming = createAsyncThunk(
	'upcoming/fetchUpcoming',
	async (_, { rejectWithValue }) => {
		try {
			const data = await getUpcoming();
			return data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

const upcomingSlice = createSlice({
	name: 'upcoming',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUpcoming.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUpcoming.fulfilled, (state, action) => {
				state.loading = false;
				// Remove duplicates by id, keeping the first occurrence
				// const seen = new Set<number>();
				// state.upcoming = action.payload.filter((movie: Movie) => {
				// 	if (seen.has(movie.id)) {
				// 		return false;
				// 	}
				// 	seen.add(movie.id);
				// 	return true;
				// });

				//sort by release date
				state.upcoming = action.payload
					.filter((m) => m.release_dateIS) // keep only movies with a date
					.sort((a, b) => {
						return (
							new Date(a.release_dateIS!).getTime() -
							new Date(b.release_dateIS!).getTime()
						);
					});
				//add movies without release date to the bottom
				state.upcoming = action.payload.sort((a, b) => {
					if (!a.release_dateIS) return 1;
					if (!b.release_dateIS) return -1;
					return (
						new Date(a.release_dateIS).getTime() - new Date(b.release_dateIS).getTime()
					);
				});
			});
	},
});
