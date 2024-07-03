import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import { searchMovies, getPopularMovies, fetchMovies } from './api';
import { saveFavoriteMovie, removeFavoriteMovie, isFavorite, displayMovies, displayMovie, displayFavoriteMovies, undisplayFavoriteMovie } from './dom';
import { getRandomElement } from './utils';
import { Movie } from './types';


const searchForm = document.getElementById('search-submit') as HTMLFormElement;
const searchInput = document.getElementById('search') as HTMLInputElement;
const loadMoreBtn = document.getElementById('load-more') as HTMLButtonElement;



let currentPage = 1;
let currentQuery = '';
let currentMovies: Movie[] = [];
let endPointSearch = 'popular';


document.querySelectorAll('input[name="btnradio"]').forEach(radio => {
    radio.addEventListener('change', async (event) => {
        const target = event.target as HTMLInputElement;
        let endpoint = '';
        switch (target.id) {
            case 'popular':
                endpoint = 'popular';
                endPointSearch = 'popular'
                break;
            case 'upcoming':
                endpoint = 'upcoming';
                endPointSearch = 'upcoming'
                break;
            case 'top_rated':
                endpoint = 'top_rated';
                endPointSearch = 'top_rated'
                break;
            default:
                endpoint = 'popular';
                endPointSearch = 'popular'
        }

        fetchMovies(endpoint)
    });
});

document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('favorite-btn') || (target.parentElement && target.parentElement.classList.contains('favorite-btn'))) {
        const movieId = Number(target.dataset.id || target.parentElement?.dataset.id);
        const taggedMovie: Movie[] = currentMovies.filter(i => i.id === movieId);
        if (isFavorite(movieId)) {
            undisplayFavoriteMovie(movieId)
            removeFavoriteMovie(movieId);
            (target as HTMLElement).style.opacity = '0.5';
            if (target.parentElement) {
                target.parentElement.style.opacity = "0.5";
            }
        } else {
            displayFavoriteMovies(taggedMovie, movieId);
            saveFavoriteMovie(movieId);
            (target as HTMLElement).style.opacity = '1';
            if (target.parentElement) {
                target.parentElement.style.opacity = '1';
            }
        }
    }
});

if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = searchInput?.value;
        if (query) {
            const response = await searchMovies(query, 1);
            displayMovies(response.results);
        }
    });
}

async function handleSearch(event: Event): Promise<void> {
    event.preventDefault();
    currentQuery = searchInput.value;
    currentPage = 1;
    const response = await searchMovies(currentQuery, currentPage);
    currentMovies = response.results;
    displayMovies(currentMovies);
}

async function handleLoadMore(): Promise<void> {
    currentPage += 1;
    const response = await searchMovies(currentQuery, currentPage, endPointSearch);
    currentMovies = [...currentMovies, ...response.results];
    displayMovies(currentMovies);
}

if (searchForm) {
    searchForm.addEventListener('click', handleSearch);
}
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', handleLoadMore);
}

async function init(): Promise<void> {
    const response = await getPopularMovies();
    currentMovies = response.results;

    displayMovies(currentMovies);
    const randomMovie = getRandomElement(currentMovies);
    displayMovie(randomMovie);
}


init();
