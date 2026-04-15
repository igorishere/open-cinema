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