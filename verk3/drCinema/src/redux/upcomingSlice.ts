import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUpcoming } from '../api/kvikmyndir';
import { Movie } from '../types/movie_type';

interface UpcomingState {
	upcoming: Movie[];
	currentUpcoming: Movie | null;
	loading: boolean;
	error: string | null;
}

const initialState: UpcomingState = {
	upcoming: [],
	currentUpcoming: null,
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

export const fetchUpcomingById = createAsyncThunk(
	'movies/fetchUpcomingById',
	async (id: string, { rejectWithValue }) => {
		try {
			const upcomingMovies = await getUpcoming();
			const upcoming = upcomingMovies.find((m: Movie) => m._id === id);
			if (!upcoming) {
				return rejectWithValue('Upcoming Movie not found');
			}
			return upcoming;
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
				const seen = new Set<number>();
				const filtered = action.payload.filter((movie: Movie) => {
					if (seen.has(movie.id)) {
						return false;
					}
					seen.add(movie.id);
					return true;
				});

				//sort by release date
				state.upcoming = filtered.sort((a, b) => {
					if (!a.release_dateIS) return 1; // a goes last
					if (!b.release_dateIS) return -1; // b goes last
					return (
						new Date(a.release_dateIS).getTime() - new Date(b.release_dateIS).getTime()
					);
				});
			})
			.addCase(fetchUpcoming.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Error loading upcoming';
			})
			.addCase(fetchUpcomingById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUpcomingById.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUpcoming = action.payload;
			})
			.addCase(fetchUpcomingById.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Error loading movie';
			});
	},
});

export default upcomingSlice.reducer;
