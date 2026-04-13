function loadVideo() {
    const videoId = document.getElementById('videoId').value.trim();
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

function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    updateThemeButton();
}

function updateThemeButton() {
    const button = document.getElementById('themeToggle');
    const currentTheme = getCurrentTheme();
    button.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    updateThemeButton();
});

document.getElementById('videoId').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        loadVideo();
    }
});
