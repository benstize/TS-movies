import { Movie } from "./types";

const favoriteMoviesKey = 'favoriteMovies';

export function createMovieCard(movie: Movie): HTMLElement {
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-md-4 col-12 p-2';
    card.innerHTML = `
        <div class="card shadow-sm">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" class="card-img-top"/>
            <svg xmlns="http://www.w3.org/2000/svg" stroke="red" style="opacity:0.65;"
         fill="red" width="50" height="50" class="bi bi-heart-fill position-absolute p-2 favorite-btn" viewBox="0 -2 18 22" data-id="${movie.id}">
                <path class="favorite-btn" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>
            <div class="card-body">
                <p class="card-text truncate">${movie.overview}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">${movie.release_date}</small>
                </div>
            </div>
        </div>
        
    `;
    return card;
}

export function createMovieFavCard(movie: Movie, movieId: number): HTMLElement {
    const card = document.createElement('div');
    card.className = 'col-12 p-2"';
    card.id = `${movieId}`;
    card.innerHTML = `
        <div class="card shadow-sm">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" class="card-img-top"/>
            <svg xmlns="http://www.w3.org/2000/svg" stroke="red" style="opacity:0.65;"
         fill="red" width="50" height="50" class="bi bi-heart-fill position-absolute p-2 favorite-btn" viewBox="0 -2 18 22" data-id="${movie.id}">
                <path class="favorite-btn" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>
            <div class="card-body">
                <p class="card-text truncate">${movie.overview}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">${movie.release_date}</small>
                </div>
            </div>
        </div>
        
    `;
    return card;
}




export function displayMovie(movie: Movie): void {
    const movieNameElement = document.getElementById('random-movie-name');
    const movieDescriptionElement = document.getElementById('random-movie-description');
    const filmContainer = document.getElementById('random-movie');
    if (movieNameElement && movieDescriptionElement && filmContainer) {
        movieNameElement.innerText = movie.title;
        movieDescriptionElement.innerText = movie.overview;
        filmContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
        filmContainer.style.backgroundSize = 'cover';
        filmContainer.style.backgroundPosition = 'center';
    }
}


export function displayMovies(movies: Movie[]): void {
    const filmContainer = document.getElementById('film-container');
    if (filmContainer) {
        filmContainer.innerHTML = '';
        movies.forEach(movie => {
            filmContainer.appendChild(createMovieCard(movie));
        });
    }
}


export function getFavoriteMovies(): number[] {
    const favorites = localStorage.getItem(favoriteMoviesKey);
    return favorites ? JSON.parse(favorites) : [];
}

export function displayFavoriteMovies(movie: Movie[], movieId: number): void {
    const favoriteMovies = document.getElementById('favorite-movies')
    if (favoriteMovies) {
        favoriteMovies.appendChild(createMovieFavCard(movie[0], movieId));
    }
}

export function undisplayFavoriteMovie(movieId: number): void {
    const removedMovie = document.getElementById(`${movieId}`);
    if (removedMovie) {
        removedMovie?.parentNode?.removeChild(removedMovie)
    }
}

export function saveFavoriteMovie(movieId: number): void {

    const favorites = getFavoriteMovies();
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem(favoriteMoviesKey, JSON.stringify(favorites));
    }

}

export function removeFavoriteMovie(movieId: number): void {
    const favorites = getFavoriteMovies();
    const newFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem(favoriteMoviesKey, JSON.stringify(newFavorites));
}

export function isFavorite(movieId: number): boolean {
    return getFavoriteMovies().includes(movieId);
}
