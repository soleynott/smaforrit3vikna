import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import Constants from 'expo-constants';
import { Movie } from '../types/movie_type';
import { Cinema } from '../types/cinema_type';

const API_URL = 'https://api.kvikmyndir.is';
const AUTH_URL = `${API_URL}/authenticate`;
const USERNAME = Constants.expoConfig?.extra?.KVM_USERNAME as string;
const PASSWORD = Constants.expoConfig?.extra?.KVM_PASSWORD as string;

console.log('Username:', USERNAME); // just to test

async function fetchAuthToken(): Promise<string> {
	const basicAuth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

	const response = await fetch(AUTH_URL, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basicAuth}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to authenticate');
	}

	const data = await response.json();
	const token = data.token;

	// Save token + timestamp
	await AsyncStorage.setItem('kvik_token', token);
	await AsyncStorage.setItem('kvik_token_time', Date.now().toString());

	return token;
}

async function getToken(): Promise<string> {
	const stored = await AsyncStorage.getItem('kvik_token');
	const time = await AsyncStorage.getItem('kvik_token_time');

	// No token saved at all
	if (!stored || !time) {
		return fetchAuthToken();
	}

	const ageHours = (Date.now() - parseInt(time)) / (1000 * 60 * 60);

	// Token expired (24 hours)
	if (ageHours >= 24) {
		return fetchAuthToken();
	}

	return stored;
}

// ----- API WRAPPERS -----

export async function getMovies(): Promise<Movie[]> {
	const token = await getToken();
	const response = await fetch(`${API_URL}/movies?token=${token}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch movies: ${response.status}`);
	}

	const data = await response.json();
	return data;
}

export async function getCinemas(): Promise<Cinema[]> {
	const token = await getToken();
	const response = await fetch(`${API_URL}/theaters`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'x-access-token': token,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch cinemas: ${response.status}`);
	}
	console.log('Cinemas response status:', token);
	const dataCinema = await response.json();
	return dataCinema;
}

export async function getUpcoming(): Promise<Movie[]> {
	const token = await getToken();
	const response = await fetch(`${API_URL}/upcoming?token=${token}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch upcoming movies: ${response.status}`);
	}

	const data = await response.json();
	//return data;
	return data.map((movie: any) => ({
		...movie,
		release_dateIS: movie['release-dateIS'],
		release_dateUS: movie['release-dateUS'],
	}));
}
