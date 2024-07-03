
import { API_KEY, BASE_URL } from './CONSTANTS';
import { displayMovies } from './dom';
import { ApiResponse } from './types';



export async function searchMovies(query: string, page: number = 1, endpoint?: string): Promise<ApiResponse> {
    if (endpoint) {
        const response = await fetch(`${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&query=${query}&page=${page}`);
        return response.json()
    } else {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
        return response.json();
    }

}
export async function fetchMovies(endpoint: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}`);
    const data: ApiResponse = await response.json();
    displayMovies(data.results);
}


export async function getPopularMovies(page: number = 1): Promise<ApiResponse> {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return response.json();
}

