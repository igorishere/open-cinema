# 🎬 Open Cinema

A modern and responsive web application for watching videos with integrated search and light/dark theme support.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [OMDB API](#-omdb-api)
- [Directory Structure](#directory-structure)
- [Technologies](#technologies)

## 🎯 Overview

Open Cinema is an application built with **HTML, CSS and vanilla JavaScript** that provides an intuitive interface to search and watch movies and series. The application is ready to integrate with the **OMDB API** (Open Movie Database).

**Main features:**
- ✅ Real-time movie and series search
- ✅ Floating dropdown with instant results
- ✅ Light/Dark mode
- ✅ Modern responsive design
- ✅ Video playback via iframe
- ✅ OMDB API integration (development)
- ✅ Mock data for testing

## 🏗️ Directory Structure

```
open-cinema/
├── index.html                 # Main page
├── style.css                  # CSS styles with themes
├── themes.js                  # Theme system (Light/Dark)
├── loadContent.js             # Video loading
├── search.js                  # Search and API integration
├── movies.json                # Mock data (development)
├── OMDB_API_SWAGGER.json      # OMDB API Swagger
└── README.md                  # This file
```

## 🎨 Themes

### Toggle Theme
- Click the 🌙/☀️ button in the top right corner
- The theme will toggle between light and dark
- Your preference will be saved automatically

### Automatic OS Preference
- On first visit, the theme will be detected automatically
- If the OS is in dark mode, loads in dark mode
- If the OS is in light mode, loads in light mode
- If no preference is detected, uses dark mode as default

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

The application uses the **OMDB API** (Open Movie Database) to search for movie and series data centrally.

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

### 🔌 Available Endpoints

#### 1. Search by Title — Recommended
```
GET https://www.omdbapi.com/?apikey=YOUR_KEY&s=title
```

Returns an array of results for a given title.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `s` | string | ✅ | Movie or series title |
| `y` | integer | ❌ | Release year |
| `type` | string | ❌ | Type: `movie`, `series`, `episode` |
| `page` | integer | ❌ | Page number (max. 100 results/page) |
| `r` | string | ❌ | Format: `json`, `xml` |
| `apikey` | string | ✅ | Your API key |

**Response Example:**
```json
{
  "Search": [
    {
      "Title": "Fight Club",
      "Year": "1999",
      "imdbID": "tt0137523",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/..."
    }
  ],
  "totalResults": "250",
  "Response": "True"
}
```

#### 2. Search by IMDb ID
```
GET https://www.omdbapi.com/?apikey=YOUR_KEY&i=tt0137523
```

Returns the full details of a specific movie using its IMDb ID.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `i` | string | ✅ | IMDb ID (e.g. tt0000001) |
| `plot` | string | ❌ | `short` or `full` |
| `r` | string | ❌ | Format: `json`, `xml` |
| `apikey` | string | ✅ | Your API key |

**Response Example:**
```json
{
  "Title": "Fight Club",
  "Year": "1999",
  "Rated": "R",
  "Released": "15 Oct 1999",
  "Runtime": "139 min",
  "Genre": "Drama, Thriller",
  "Director": "David Fincher",
  "Writer": "Jim Uhls, Chuck Palahniuk",
  "Actors": "Brad Pitt, Edward Norton, Meat Loaf",
  "Plot": "An insomniac office worker...",
  "Language": "English",
  "Country": "United States, Germany",
  "Awards": "Nominated for 7 Oscars",
  "Poster": "https://m.media-amazon.com/images/M/...",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "8.8/10"
    }
  ],
  "imdbID": "tt0137523",
  "Type": "movie",
  "Response": "True"
}
```

#### 3. Search by Exact Title
```
GET https://www.omdbapi.com/?apikey=YOUR_KEY&t=title
```

Returns the most popular result for a given title.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `t` | string | ✅ | Exact movie title |
| `y` | integer | ❌ | Release year |
| `type` | string | ❌ | Type: `movie`, `series`, `episode` |
| `plot` | string | ❌ | `short` or `full` |
| `r` | string | ❌ | Format: `json`, `xml` |
| `apikey` | string | ✅ | Your API key |

### 📝 Request Examples

**JavaScript (Fetch API):**
```javascript
// Search by title
const query = "Fight Club";
const apiKey = "8310e7cb";

fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.Search); // Array of results
  })
  .catch(error => console.error('Error:', error));
```

**cURL:**
```bash
curl "https://www.omdbapi.com/?apikey=8310e7cb&s=Fight%20Club"
```

**Python:**
```python
import requests

url = "https://www.omdbapi.com/"
params = {
    "apikey": "8310e7cb",
    "s": "Fight Club"
}

response = requests.get(url, params=params)
data = response.json()
print(data)
```

### ⚙️ API Limits

| Limit | Value |
|-------|-------|
| **Free Plan** | 1,000 requests/day |
| **Paid Plan** | Up to 250,000 requests/day |
| **Timeout** | 10 seconds per request |
| **Rate Limiting** | No apparent rate limit |
| **Max Results** | 100 results per page |

### 🏷️ Response Fields (Search)

| Field | Type | Description |
|-------|------|-------------|
| `Title` | string | Movie/series title |
| `Year` | string | Release year |
| `imdbID` | string | Unique IMDb ID |
| `Type` | string | Type: movie, series, episode |
| `Poster` | string | Poster image URL |
| `Response` | string | true/false |

### 🏷️ Response Fields (Details - ID)

| Field | Description |
|-------|-------------|
| `Title` | Full title |
| `Year` | Production year |
| `Rated` | Age rating (G, PG, R, etc) |
| `Released` | Release date |
| `Runtime` | Duration in minutes |
| `Genre` | Genres (Drama, Thriller, etc) |
| `Director` | Director(s) |
| `Writer` | Writer(s) |
| `Actors` | Main actors |
| `Plot` | Synopsis |
| `Language` | Language(s) |
| `Country` | Country(ies) of production |
| `Ratings` | Array of ratings |
| `imdbID` | IMDb ID |
| `Type` | movie, series, episode |

## 🛠️ Technologies

- **HTML5** — Semantic markup
- **CSS3** — Styles, animations and themes
- **JavaScript (Vanilla)** — Pure logic and interactivity
- **Fetch API** — Asynchronous HTTP requests
- **LocalStorage** — Preference persistence
- **OMDB API** — Movie and series database

## 🔧 Development Definitions

### Language Standard

**English:** All code, comments and variable names must be in English.

**Allowed exceptions:**
- Names of external libraries and APIs (e.g. `fetch`, `localStorage`, `document`)
- CSS IDs and classes may use English naming (e.g. `search-result-item`)
- Variables referencing API fields may keep original names (e.g. `Title`, `imdbID`, `Poster`)

**Correct example:**
```javascript
// ❌ Avoid
function searchMovie(query) {
    const results = movies.filter(m => m.title.includes(query));
    return results;
}

// ✅ Correct
function searchMovie(query) {
    const results = movies.filter(m => m.title.includes(query));
    return results;
}
```

### User Interface

**English:** All visible texts, messages and labels must be in English.

**File:** [index.html](index.html)

### Code Comments

All JavaScript, HTML and CSS comments must be in English.

**Recommended format:**
```javascript
// Brief description of what it does
function functionName() {
    // ...
}

/**
 * Detailed description of the function
 * @param {type} paramName - Parameter description
 * @returns {type} Return description
 */
function functionName(paramName) {
    // ...
}
```

## 📝 Development Notes

### API Key Configuration

**Option 1: Environment Variable (Recommended)**
```javascript
const apiKey = process.env.OMDB_API_KEY;
```

**Option 2: Separate Config File**
```javascript
// config.js
export const apiKey = "your-key-here";
```

**Option 3: Hardcoded (Development Only)**
```javascript
const apiKey = "8310e7cb";
```

### Mock vs Real API

- **Development:** Use `movies.json` (mock) for quick testing
- **Production:** Set up real OMDB API integration
- **Transition:** Modify only the `loadMovies()` method in [search.js](search.js)

## 🚦 Next Steps

- [ ] Full OMDB API integration
- [ ] Robust error handling
- [ ] Loading states and skeletons
- [ ] Results pagination
- [ ] Advanced filters (genre, year, rating)
- [ ] Search history
- [ ] Favorites and watchlist
- [ ] Comment system
- [ ] Production deploy

## 📄 License

This project is licensed under CC BY-NC 4.0. The OMDB API is also under CC BY-NC 4.0.

## 🤝 Contributions

Contributions are welcome! Open an issue or pull request to suggest improvements.

---

**Developed with ❤️ for film lovers | Last updated: April 14, 2026**