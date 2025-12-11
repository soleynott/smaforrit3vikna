import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movieSlice';
import cinemasReducer from './cinemaSlice';
import upcomingReducer from './upcomingSlice';

export const store = configureStore({
	reducer: {
		movies: moviesReducer,
		cinemas: cinemasReducer,
		upcoming: upcomingReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
