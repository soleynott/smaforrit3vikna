import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../api/kvikmyndir';
import { Movie } from '../types/movie_type';

interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMovies();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: number, { rejectWithValue }) => {
    try {
      const allMovies = await getMovies();
      const movie = allMovies.find((m: Movie) => m.id === id);
      if (!movie) {
        return rejectWithValue('Movie not found');
      }
      return movie;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        // Remove duplicates by id, keeping the first occurrence
        const seen = new Set<number>();
        state.movies = action.payload.filter((movie: Movie) => {
          if (seen.has(movie.id)) {
            return false;
          }
          seen.add(movie.id);
          return true;
        });
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error loading movies';
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error loading movie';
      });
  }
});

export default movieSlice.reducer;
