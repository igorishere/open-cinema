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
        this.episodeList = document.getElementById('episodeList');
        this.playerSection = document.getElementById('playerSection');
        this.recentWatched = document.getElementById('recentWatched');
        this.debounceTimer = null;
        this.currentMovieId = null;
        this.currentSeason = null;
        this.currentEpisodeId = null;

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
        this.loadRecentWatched();
    }

    loadRecentWatched() {
        const recentWatchs = JSON.parse(localStorage.getItem('recentWatchs')) || [];
        this.recentWatched.innerHTML = '';

        if(recentWatchs.length > 0){
            const title = document.createElement('h2');
            title.textContent = 'Recentemente assistidos';
            this.recentWatched.appendChild(title);

            recentWatchs.forEach(movie => {
                const paragraph = document.createElement('p');
                const link = document.createElement('a');

                link.href = '#';
                link.textContent = movie.title;
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.loadMovieById(movie.imdbID);
                });

                paragraph.appendChild(link);
                this.recentWatched.appendChild(paragraph);
            });
        }
    }

    async handleSearchById(event) {
        event.preventDefault();
        const videoId = this.inputSearchById.value.trim();
        if (videoId) {
            await this.loadMovieById(videoId);
        } else {
            this.showError('Por favor, digite um ID do IMDb válido!');
        }
    }

    loadVideo(videoUrl) {
        const errorMsg = document.getElementById('errorMsg');

        if (!videoUrl) {
            errorMsg.textContent = 'Por favor, digite um ID de vídeo válido!';
            errorMsg.style.display = 'block';
            return;
        }

        errorMsg.style.display = 'none';

        const videoFrame = document.getElementById('videoFrame');
        videoFrame.removeAttribute('srcdoc');
        videoFrame.src = videoUrl;
        this.revealPlayerSection();
    }

    loadTitleVideo(title) {
        const imdbId = title.imdbID;
        const videoType = title.Type === 'series' ? 'tv' : 'movie';

        this.loadVideo(`https://vidsrc-embed.ru/embed/${videoType}/${imdbId}`);
    }

    loadEpisodeVideo(seriesImdbId, seasonNumber, episodeNumber) {
        this.loadVideo(`https://vidsrc-embed.ru/embed/tv/${seriesImdbId}/${seasonNumber}-${episodeNumber}`);
    }

    async loadMovieById(imdbId) {
        this.currentMovieId = imdbId;
        this.hideMovieDetails();

        const movieDetails = await this.fetchMovieDetails(imdbId);

        if (movieDetails && this.currentMovieId === imdbId) {
            this.showMovieDetails(movieDetails);
            const recentMovie = {
                imdbID: movieDetails.imdbID,
                title: movieDetails.Title,
            };
            
            this.addToRecentWatched(recentMovie)
            this.loadRecentWatched();

            if (movieDetails.Type === 'series') {
                this.resetVideo();
                this.revealPlayerSection();
            } else {
                this.loadTitleVideo(movieDetails);
            }
        } else {
            this.showError('Não foi possível carregar este título.');
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

    addToRecentWatched(movie){
        const recentWatchs = JSON.parse(localStorage.getItem('recentWatchs')) || [];
        const isAlreaadySaved = recentWatchs.some( saved => saved.imdbID === movie.imdbID);

        if(!isAlreaadySaved){
            recentWatchs.push(movie);
            recentWatchs.splice(0, recentWatchs.length - 5);
            localStorage.setItem('recentWatchs', JSON.stringify(recentWatchs));
        }
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
        this.hideEpisodes();
    }

    renderSeasons(movie) {
        const seasonCount = Number.parseInt(movie.totalSeasons, 10);
        const isSeries = movie.Type === 'series';

        this.hideEpisodes();

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
            button.setAttribute('aria-pressed', 'false');
            button.addEventListener('click', () => this.selectSeason(movie.imdbID, seasonNumber, button));
            this.seasonList.appendChild(button);
        }

        this.seasonList.classList.remove('hidden');
    }

    hideSeasons() {
        this.seasonList.innerHTML = '';
        this.seasonList.classList.add('hidden');
        this.currentSeason = null;
    }

    async selectSeason(imdbId, seasonNumber, selectedButton) {
        this.currentSeason = seasonNumber;
        this.currentEpisodeId = null;
        this.markActiveButton(this.seasonList, selectedButton);
        this.showEpisodesLoading();

        const seasonDetails = await this.fetchSeasonEpisodes(imdbId, seasonNumber);

        if (this.currentMovieId !== imdbId || this.currentSeason !== seasonNumber) {
            return;
        }

        if (seasonDetails && Array.isArray(seasonDetails.Episodes)) {
            this.renderEpisodes(seasonDetails.Episodes);
        } else {
            this.displayEpisodesEmpty('Não foi possível carregar os episódios.');
        }
    }

    async fetchSeasonEpisodes(imdbId, seasonNumber) {
        try {
            const response = await fetch(
                `${API_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbId)}&Season=${encodeURIComponent(seasonNumber)}`
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

    renderEpisodes(episodes) {
        if (episodes.length === 0) {
            this.displayEpisodesEmpty('Nenhum episódio encontrado para esta temporada.');
            return;
        }

        const orderedEpisodes = [...episodes].sort((firstEpisode, secondEpisode) => {
            return Number.parseInt(firstEpisode.Episode, 10) - Number.parseInt(secondEpisode.Episode, 10);
        });

        this.episodeList.innerHTML = '';

        orderedEpisodes.forEach((episode) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'episode-button';
            button.textContent = `${episode.Episode} - ${episode.Title}`;
            button.setAttribute('aria-label', `Reproduzir episódio ${episode.Episode}: ${episode.Title}`);
            button.setAttribute('aria-pressed', 'false');
            button.addEventListener('click', () => this.selectEpisode(episode, button));
            this.episodeList.appendChild(button);
        });

        this.episodeList.classList.remove('hidden');
    }

    selectEpisode(episode, selectedButton) {
        this.currentEpisodeId = episode.imdbID;
        this.markActiveButton(this.episodeList, selectedButton);
        this.loadEpisodeVideo(this.currentMovieId, this.currentSeason, episode.Episode);
    }

    revealPlayerSection() {
        this.playerSection.classList.remove('hidden');
        document.body.classList.remove('search-only');
        document.body.classList.add('player-ready');

        window.requestAnimationFrame(() => {
            this.playerSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    resetVideo() {
        const videoFrame = document.getElementById('videoFrame');
        videoFrame.removeAttribute('src');
        videoFrame.srcdoc = `
            <!doctype html>
            <html lang="pt-BR">
                <body style="margin:0;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center;padding:24px;box-sizing:border-box;">
                    Selecione uma temporada e um episódio para iniciar.
                </body>
            </html>
        `;
    }

    showError(message) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }

    showEpisodesLoading() {
        this.episodeList.innerHTML = '<div class="episode-status">Carregando episódios...</div>';
        this.episodeList.classList.remove('hidden');
    }

    displayEpisodesEmpty(message) {
        this.episodeList.innerHTML = `<div class="episode-status">${message}</div>`;
        this.episodeList.classList.remove('hidden');
    }

    hideEpisodes() {
        this.episodeList.innerHTML = '';
        this.episodeList.classList.add('hidden');
        this.currentSeason = null;
        this.currentEpisodeId = null;
    }

    markActiveButton(container, selectedButton) {
        container.querySelectorAll('button').forEach((button) => {
            const isSelected = button === selectedButton;
            button.classList.toggle('active', isSelected);
            button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });
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
        
        const videoType = movie.Type === 'series' ? 'Série' : 'Filme';
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
                    <span>${movie.Year}</span><span>${videoType}</span>
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
