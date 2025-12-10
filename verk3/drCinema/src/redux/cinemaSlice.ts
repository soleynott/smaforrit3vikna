import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCinemas } from '../api/kvikmyndir';
import { Cinema } from '../types/cinema_type';

interface CinemaState {
  cinemas: Cinema[];
  currentCinema: Cinema | null;
  loading: boolean;
  error: string | null;
}

const initialState: CinemaState = {
  cinemas: [],
  currentCinema: null,
  loading: false,
  error: null,
};

export const fetchCinemas = createAsyncThunk(
  'cinemas/fetchCinemas',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCinemas();
      console.log('Fetched cinemas:', data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCinemaById = createAsyncThunk(
  'cinemas/fetchCinemaById',
  async (id: number, { rejectWithValue }) => {
    try {
      const allCinemas = await getCinemas();
      const cinema = allCinemas.find((c: Cinema) => c.id === id);
      if (!cinema) {
        return rejectWithValue('Cinema not found');
      }
      return cinema;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const cinemaSlice = createSlice({
  name: 'cinemas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemas.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemas = action.payload;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCinemaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCinema = action.payload;
      })
      .addCase(fetchCinemaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cinemaSlice.reducer;