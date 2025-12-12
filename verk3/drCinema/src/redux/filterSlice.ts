import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
	title: string;
	imdbMin: string;
	imdbMax: string;
	rottenMin: string;
	rottenMax: string;
	showtimeStart: string;
	showtimeEnd: string;
	actors: string;
	directors: string;
	pgRating: string;
}

const initialState: FilterState = {
	title: '',
	imdbMin: '',
	imdbMax: '',
	rottenMin: '',
	rottenMax: '',
	showtimeStart: '',
	showtimeEnd: '',
	actors: '',
	directors: '',
	pgRating: '',
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<FilterState>) => {
			return action.payload;
		},
		clearFilters: () => {
			return initialState;
		},
		updateFilter: (state, action: PayloadAction<{ key: keyof FilterState; value: string }>) => {
			state[action.payload.key] = action.payload.value;
		},
	},
});

export const { setFilters, clearFilters, updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
