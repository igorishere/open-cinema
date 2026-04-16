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
        this.inputSearchById = document.getElementById('videoId');
        this.resultsContainer = document.getElementById('searchResults');
        this.movieDetails = document.getElementById('movieDetails');
        this.movieTitle = document.getElementById('movieTitle');
        this.movieYear = document.getElementById('movieYear');
        this.movieRuntime = document.getElementById('movieRuntime');
        this.seasonList = document.getElementById('seasonList');
        this.debounceTimer = null;
        this.currentMovieId = null;

        this.initialize();
    }

    initialize() {
        this.inputField.addEventListener('input', (event) => this.handleSearchByTitle(event));
        document.getElementById('loadVideoButton').addEventListener('click', (event) => this.handleSearchById(event));
        this.inputSearchById.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.handleSearchById(event);
            }
        });
    }

    async handleSearchById(event) {
        event.preventDefault();
        const videoId = this.inputSearchById.value.trim();
        if (videoId) {
            await this.loadMovieById(videoId);
        }
    }

    loadVideo(id) {
        const videoId = id;
        const errorMsg = document.getElementById('errorMsg');

        if (!videoId) {
            errorMsg.textContent = 'Por favor, digite um ID de vídeo válido!';
            errorMsg.style.display = 'block';
            return;
        }

        errorMsg.style.display = 'none';

        const newSrc = `https://vidsrc-embed.ru/embed/movie/${videoId}`;
        document.getElementById('videoFrame').src = newSrc;
    }

    async loadMovieById(imdbId) {
        this.currentMovieId = imdbId;
        this.loadVideo(imdbId);
        this.hideMovieDetails();

        const movieDetails = await this.fetchMovieDetails(imdbId);

        if (movieDetails && this.currentMovieId === imdbId) {
            this.showMovieDetails(movieDetails);
        }
    }

    async fetchMovieDetails(imdbId) {
        try {
            const response = await fetch(
                `${API_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbId)}`
            );
            const data = await response.json();

            if (data.Response === 'True') {
                return data;
            }
        } catch (error) {
            return null;
        }

        return null;
    }

    showMovieDetails(movie) {
        this.movieTitle.textContent = movie.Title || 'Título não informado';
        this.movieYear.textContent = `Ano: ${movie.Year || 'Não informado'}`;
        this.movieRuntime.textContent = `Duração: ${movie.Runtime || 'Não informada'}`;
        this.movieDetails.classList.remove('hidden');
        this.renderSeasons(movie);
    }

    hideMovieDetails() {
        this.movieTitle.textContent = '';
        this.movieYear.textContent = '';
        this.movieRuntime.textContent = '';
        this.movieDetails.classList.add('hidden');
        this.hideSeasons();
    }

    renderSeasons(movie) {
        const seasonCount = Number.parseInt(movie.totalSeasons, 10);
        const isSeries = movie.Type === 'series';

        if (!isSeries || !Number.isInteger(seasonCount) || seasonCount < 1) {
            this.hideSeasons();
            return;
        }

        this.seasonList.innerHTML = '';

        for (let seasonNumber = 1; seasonNumber <= seasonCount; seasonNumber += 1) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'season-button';
            button.textContent = `Temporada ${seasonNumber}`;
            button.setAttribute('aria-label', `Selecionar temporada ${seasonNumber}`);
            this.seasonList.appendChild(button);
        }

        this.seasonList.classList.remove('hidden');
    }

    hideSeasons() {
        this.seasonList.innerHTML = '';
        this.seasonList.classList.add('hidden');
    }

    handleSearchByTitle(event) {
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
                `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
            );
            const data = await response.json();

            if (data.Response === 'True') {
                this.displayResults(data.Search);
            } else {
                this.displayEmpty(data.Error || 'No results found.');
            }
        } catch (error) {
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
        this.resultsContainer.classList.add('active');
        this.resultsContainer.innerHTML = `<div class="search-loading">🔍 Searching...</div>`;
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

    async selectMovie(movie) {
        this.clearResults();
        await this.loadMovieById(movie.imdbID);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new MovieSearch();
});
