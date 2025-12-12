import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movieSlice';
import cinemasReducer from './cinemaSlice';
import upcomingReducer from './upcomingSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
	reducer: {
		movies: moviesReducer,
		cinemas: cinemasReducer,
		upcoming: upcomingReducer,
		filters: filterReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, //get rid of warning
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
