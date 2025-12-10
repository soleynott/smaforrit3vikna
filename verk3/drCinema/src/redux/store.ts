import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movieSlice';
import cinemasReducer from './cinemaSlice';

export const store = configureStore({
	reducer: {
		movies: moviesReducer,
		cinemas: cinemasReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
