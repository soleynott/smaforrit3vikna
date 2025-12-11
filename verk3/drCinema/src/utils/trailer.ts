//function for getting trailer key
import { Movie } from '../types/movie_type';

export function getTrailerKey(movie: Movie): string | null {
	return movie?.trailers?.[0]?.results?.[0]?.key ?? null;
}
