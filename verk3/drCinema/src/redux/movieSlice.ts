import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../api/kvikmyndir';

interface MovieState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const data = await getMovies();  
    return data;                    
  }
);
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: number) => {
    const allMovies = await getMovies();
    return allMovies.find((m: any) => m.id === id);
  }
);



const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error';
      });
  }
});

export default movieSlice.reducer;
