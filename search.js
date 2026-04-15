const API_KEY = '8310e7cb';
const API_URL = 'https://www.omdbapi.com/';

function switchTab(tab) {
    const searchByTitle = tab === 'title';

    document.getElementById('tabTitle').classList.toggle('active', searchByTitle);
    document.getElementById('tabId').classList.toggle('active', !searchByTitle);
    document.getElementById('panelTitle').classList.toggle('hidden', !searchByTitle);
    document.getElementById('panelId').classList.toggle('hidden', searchByTitle);

    if (searchByTitle) {
        document.getElementById('movieSearch').focus();
    } else {
        document.getElementById('videoId').focus();
    }
}

class MovieSearch {
    constructor() {
        this.inputField = document.getElementById('movieSearch');
        this.resultsContainer = document.getElementById('searchResults');
        this.debounceTimer = null;

        this.initialize();
    }

    initialize() {
        this.inputField.addEventListener('input', (event) => this.handleSearch(event));
    }

    handleSearch(event) {
        const query = event.target.value.trim();

        clearTimeout(this.debounceTimer);

        if (!query) {
            this.clearResults();
            return;
        }

        this.showLoading();

        this.debounceTimer = setTimeout(() => {
            this.fetchMovies(query);
        }, 400);
    }

    async fetchMovies(query) {
        try {
            const response = await fetch(
                `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
            );
            const data = await response.json();

            if (data.Response === 'True') {
                this.displayResults(data.Search);
            } else {
                this.displayEmpty(data.Error || 'No results found.');
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            this.displayEmpty('Connection error. Please try again.');
        }
    }

    displayResults(movies) {
        this.resultsContainer.innerHTML = '';

        movies.forEach(movie => {
            const item = this.createResultItem(movie);
            this.resultsContainer.appendChild(item);
        });

        this.resultsContainer.classList.add('active');
    }

    displayEmpty(message) {
        this.resultsContainer.innerHTML = `<div class="search-empty">😕 ${message}</div>`;
        this.resultsContainer.classList.add('active');
    }

    showLoading() {
        console.log('Showing loading indicator');
        this.resultsContainer.innerHTML = `<div class="search-loading">🔍 Searching...</div>`;
        this.resultsContainer.classList.add('active');
    }

    clearResults() {
        this.resultsContainer.innerHTML = '';
        this.resultsContainer.classList.remove('active');
    }

    createResultItem(movie) {
        const div = document.createElement('div');
        div.className = 'search-result-item';

        const poster = movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://via.placeholder.com/40x60?text=No+Image';

        div.innerHTML = `
            <img
                src="${poster}"
                alt="${movie.Title}"
                class="search-result-poster"
                onerror="this.src='https://via.placeholder.com/40x60?text=No+Image'"
            >
            <div class="search-result-info">
                <div class="search-result-title">${movie.Title}</div>
                <div class="search-result-meta">
                    <span>${movie.Year}</span>
                </div>
            </div>
        `;

        div.addEventListener('click', () => this.selectMovie(movie));
        return div;
    }

    /**
     * Selects a movie and loads it in the video player
     * @param {Object} movie - Movie object with imdbID and Title
     */
    selectMovie(movie) {
        this.clearResults();
        closeModal();
        loadVideo(movie.imdbID);
    }
}

// ── Initialize on DOM ready ────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    new MovieSearch();
    openModal();
});