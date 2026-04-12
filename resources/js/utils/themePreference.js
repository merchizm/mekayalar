export const THEME_STORAGE_KEY = 'user-theme-preference';

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }

    return undefined;
};

export const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getStoredThemePreference = () => {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
};

export const setStoredThemePreference = (value) => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
        // Ignore storage write failures in restricted browsers.
    }
};

export const clearStoredThemePreference = () => {
    try {
        localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
        // Ignore storage write failures in restricted browsers.
    }
};

export const getTimeBasedTheme = (hour = null) => {
    const currentHour = hour !== null ? hour : new Date().getHours();
    return currentHour >= 21 || currentHour < 9;
};

export const resolveThemeState = (hour = null) => {
    const savedPreference = getStoredThemePreference();
    const darkModeCookie = getCookie('dark_mode');
    const timeBasedMode = getTimeBasedTheme(hour);

    if (savedPreference !== null) {
        return {
            isDarkMode: savedPreference === 'dark',
            hasManualOverride: true,
            migratedPreference: null,
        };
    }

    if (darkModeCookie !== undefined) {
        const cookieMode = darkModeCookie === '1';

        if (cookieMode !== timeBasedMode) {
            return {
                isDarkMode: cookieMode,
                hasManualOverride: true,
                migratedPreference: cookieMode ? 'dark' : 'light',
            };
        }

        return {
            isDarkMode: timeBasedMode,
            hasManualOverride: false,
            migratedPreference: null,
        };
    }

    return {
        isDarkMode: timeBasedMode,
        hasManualOverride: false,
        migratedPreference: null,
    };
};

export const applyThemeClass = (isDarkMode) => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';

    if (document.body) {
        document.body.classList.toggle('dark', isDarkMode);
    }
};
