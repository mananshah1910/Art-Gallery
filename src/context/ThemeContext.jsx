import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Base UI themes (dark/light mode toggle)
const UI_THEMES = ['light', 'dark', 'midnight'];
// Gallery aesthetic themes (curator controlled)
const GALLERY_THEMES = ['minimalist', 'baroque', 'digital-echo', 'surrealist', 'neo-classical', 'abstract'];

export const ThemeProvider = ({ children }) => {
    const [uiTheme, setUiTheme] = useState(() => {
        const saved = localStorage.getItem('art_gallery_theme') || 'light';
        // If saved theme is a gallery theme, default ui to light
        return UI_THEMES.includes(saved) ? saved : 'light';
    });

    const [galleryTheme, setGalleryThemeState] = useState(() => {
        return localStorage.getItem('art_gallery_gallery_theme') || null;
    });

    // The active theme is galleryTheme if set, otherwise uiTheme
    const activeTheme = galleryTheme || uiTheme;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', activeTheme);
    }, [activeTheme]);

    const toggleTheme = (newTheme) => {
        setUiTheme(newTheme);
        localStorage.setItem('art_gallery_theme', newTheme);
        // Clear gallery theme override when manually toggling UI theme
        setGalleryThemeState(null);
        localStorage.removeItem('art_gallery_gallery_theme');
    };

    const setGalleryTheme = (theme) => {
        if (theme === galleryTheme) {
            // Toggle off if already active
            setGalleryThemeState(null);
            localStorage.removeItem('art_gallery_gallery_theme');
            document.documentElement.setAttribute('data-theme', uiTheme);
        } else {
            setGalleryThemeState(theme);
            localStorage.setItem('art_gallery_gallery_theme', theme);
        }
    };

    // Legacy support: theme = activeTheme
    const theme = activeTheme;

    return (
        <ThemeContext.Provider value={{ theme, uiTheme, galleryTheme, toggleTheme, setGalleryTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
