const themes = {
    light: {
        name: 'Light',
        colors: {
            'bg-gradient-1': '#667eea',
            'bg-gradient-2': '#764ba2',
            'container-bg': '#ffffff',
            'container-shadow': 'rgba(0, 0, 0, 0.3)',
            'heading-color': '#333333',
            'text-color': '#666666',
            'input-border': '#e0e0e0',
            'input-focus-border': '#667eea',
            'button-bg': '#667eea',
            'button-hover': '#5568d3',
            'error-text': '#d32f2f',
            'error-bg': '#ffebee'
        }
    },
    dark: {
        name: 'Dark',
        colors: {
            'bg-gradient-1': '#1a1a2e',
            'bg-gradient-2': '#16213e',
            'container-bg': '#0f3460',
            'container-shadow': 'rgba(0, 0, 0, 0.7)',
            'heading-color': '#e0e0e0',
            'text-color': '#b0b0b0',
            'input-border': '#16213e',
            'input-focus-border': '#e94560',
            'button-bg': '#e94560',
            'button-hover': '#d63a52',
            'error-text': '#ff6b6b',
            'error-bg': '#2d1b1b'
        }
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });

    localStorage.setItem('theme', themeName);
    
    document.documentElement.setAttribute('data-theme', themeName);
}

function getSystemTheme() {

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    
    return 'dark';
}

function getCurrentTheme() {

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
    }
    
    return getSystemTheme();
}

function initTheme() {
    const theme = getCurrentTheme();
    applyTheme(theme);
}

