# 🎬 Open Cinema

A modern and responsive web application for watching movies for free.

## 📋 Table of Contents

- [Overview](#overview)
- [Themes](#-themes)
- [How to Use](#-how-to-use)
- [OMDB API](#-omdb-api)
- [VidSrc API](#-vidsrc-api)
- [Technologies](#-technologies)
- [Development Definitions](#-development-definitions)

## 🎯 Overview

Open Cinema is an application built with **HTML, CSS and vanilla JavaScript** that provides an intuitive interface to search and watch movies. The application is integrated with the **OMDB API** (Open Movie Database) to fetch data from movies.

**Main features:**
- ✅ Real-time movie search
- ✅ Light/Dark mode
- ✅ Video playback via iframe
- ✅ OMDB API integration (development)

## 🎨 Themes

### Toggle Theme
- Click the 🌙/☀️ button in the top right corner
- The theme will toggle between light and dark
- Your preference will be saved automatically
- Automatic OS Preference. On first visit, the theme will be detected automatically based on OS setting.

## 🚀 How to Use

### 1. Movie Search (Recommended Method)
1. Type the movie name in the **"🔍 Search movie..."** field
2. Results will appear in real time in the dropdown
3. Click a movie to load it automatically

### 2. By IMDb ID
1. Enter the IMDb ID (e.g. `tt0137523`) in the input field
2. Click **"Load Video"** or press **Enter**
3. The video will start playing

## 🎬 OMDB API

The application uses the **OMDB API** (Open Movie Database) to search for movie data centrally.

### 📚 API Information

| Attribute | Value |
|-----------|-------|
| **Website** | https://www.omdbapi.com/ |
| **Protocol** | REST API (HTTP/HTTPS) |
| **Format** | JSON / XML |
| **Authentication** | API Key via Query Parameter |
| **License** | CC BY-NC 4.0 |
| **Swagger Docs** | [OMDB_API_SWAGGER.json](OMDB_API_SWAGGER.json) |

### 🔑 Get your API Key

1. Go to: https://www.omdbapi.com/apikey.aspx
2. Choose your plan (Free or Paid)
3. Confirm your email
4. Copy your API key

**Development key:** `8310e7cb`

### ⚙️ API Limits

| Limit | Value |
|-------|-------|
| **Free Plan** | 1,000 requests/day |
| **Paid Plan** | Up to 250,000 requests/day |
| **Timeout** | 10 seconds per request |
| **Rate Limiting** | No apparent rate limit |
| **Max Results** | 100 results per page |

## 📺 VidSrc API

The application uses the **VidSrc API** to load the selected movie inside an iframe player.

While **OMDB API** is responsible for searching movie data, **VidSrc** is responsible for generating the embed URL used by the video player.

### 📚 API Information

| Attribute | Value |
|-----------|-------|
| **Website** | https://vidsrcme.ru/api/ |
| **Embed endpoint** | `https://vidsrc-embed.ru/embed/movie` |
| **Current usage** | `https://vidsrc-embed.ru/embed/movie/{imdbId}` |
| **Supported IDs** | IMDb ID or TMDb ID |
| **Player type** | iframe embed |
| **Authentication** | No API key used in this project |

### 🎬 Movie Embed Example

```html
<iframe
  src="https://vidsrc-embed.ru/embed/movie/tt0137523"
  allowfullscreen>
</iframe>
```

The app updates this iframe dynamically when a movie is selected from search results or loaded by IMDb ID.

### ⚙️ Optional Parameters

According to the VidSrc documentation, movie embed URLs can also receive optional parameters:

| Parameter | Description |
|-----------|-------------|
| `imdb` | IMDb ID from imdb.com |
| `tmdb` | TMDb ID from themoviedb.com |
| `sub_url` | Encoded `.srt` or `.vtt` subtitle URL with CORS enabled |
| `ds_lang` | Default subtitle language using ISO 639 language code |
| `autoplay` | `1` or `0` to enable or disable autoplay |

### 🔗 Available Embed Domains

The VidSrc documentation lists these domains for embed URLs:

- `vidsrc-embed.ru`
- `vidsrc-embed.su`
- `vidsrcme.su`
- `vsrc.su`

## 🛠️ Technologies

- **HTML5** — Semantic markup
- **CSS3** — Styles, animations and themes
- **JavaScript (Vanilla)** — Pure logic and interactivity
- **Fetch API** — Asynchronous HTTP requests
- **LocalStorage** — Preference persistence
- **OMDB API** — Movie database
- **VidSrc API** — iframe movie embed provider

## 🔧 Development Definitions

### Language Standard

- Content read by the user: `Portuguese`
- Content read by the developer/Ai Agent: `English`

**Developed with ❤️ for film lovers | Last updated: April 14, 2026**
