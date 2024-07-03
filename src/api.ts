
import { ApiResponse } from './types';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '86d4d21a3efead74f3ae57364ed831d7';

export async function searchMovies(query: string, page: number = 1, endpoint?: string): Promise<ApiResponse> {
    if (endpoint) {
        const response = await fetch(`${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&query=${query}&page=${page}`);
        return response.json()
    } else {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
        return response.json();
    }

}

export async function getPopularMovies(page: number = 1): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

