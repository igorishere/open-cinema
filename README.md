# 🎬 Open Cinema

A modern and responsive web application for watching videos with support for light/dark theme and automatic detection of operating system preferences.

## 📋 Project Description

Open Cinema is a web video player that allows users to:
- Enter a video ID to load and watch
- Toggle between light and dark themes
- Automatically apply the OS theme preference
- Persist theme preferences via localStorage
- Modern visual experience with smooth transitions

## 🏗️ Project Structure

```
open-cinema/
├── index.html       # Main HTML file with page structure
├── style.css        # CSS styles with color variables by theme
├── script.js        # Main application logic (video loading, theme toggle)
├── themes.js        # Theme management and colors
└── README.md        # This file
```

## 🎨 Themes
### Change theme
- Click the 🌙/☀️ button in the top right corner
- Theme will toggle between light and dark
- Preference will be saved automatically
### Automatic OS preference
- On first visit, theme will be loaded according to OS settings
- If OS is in dark mode, it will load in dark mode
- If OS is in light mode, it will load in light mode
- If no preference is set, dark mode is the default

### Light Theme
```javascript
{
    'bg-gradient-1': '#667eea',           // Purple
    'bg-gradient-2': '#764ba2',           // Light purple
    'container-bg': '#ffffff',            // White
    '...' // and more colors
}
```

### Dark Theme
```javascript
{
    'bg-gradient-1': '#1a1a2e',           // Very dark blue
    'bg-gradient-2': '#16213e',           // Dark blue
    'container-bg': '#0f3460',            // Navy blue
    '...' // and more colors
}
```

## 🚀 How to Use

- Enter the video ID in the input field (e.g., `tt0137523`)
- Click the "Load Video" button or press Enter
- The video will be loaded in the iframe

## 🔄 Initialization Flow

```
1. HTML loaded
2. themes.js imported
3. script.js imported
4. DOMContentLoaded fires:
   - initTheme() → getCurrentTheme() → detects theme → applyTheme()
   - updateThemeButton() → updates icon
5. Page ready for interaction
```

## 🎯 Suggested Future Enhancements

- [ ] Video watch history
- [ ] Quick theme selection menu (more than 2 options)
- [ ] Support for multiple video platforms
- [ ] Favorites system
- [ ] Preferences management interface
- [ ] Support for multiple resolutions
- [ ] Cloud synchronization (Firebase, etc)
- [ ] PWA (Progressive Web App)
- [ ] Update notifications
- [ ] Usage analytics (Google Analytics, etc)

## 📝 Technical Notes

- No external dependencies (vanilla JavaScript, pure CSS)
- Supports all modern browsers
- Compatible with Safari, Chrome, Firefox, Edge
- Uses `prefers-color-scheme` media query to detect OS theme
- CSS Variables for easy color customization

## 🤝 AI Integration

To facilitate AI integration in the future:
- Each responsibility is in its own file
- Well-named and documented functions
- Descriptive variable names
- Clear and modular structure
- Explanatory comments in code
- This README documents the entire architecture

---

**Last updated:** April 12, 2026
