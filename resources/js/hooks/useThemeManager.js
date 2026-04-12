import { useState, useEffect, useCallback } from 'react';
import {
    applyThemeClass,
    clearStoredThemePreference,
    getTimeBasedTheme,
    resolveThemeState,
    setCookie,
    setStoredThemePreference,
} from '../utils/themePreference';

export function useThemeManager() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [hasManualOverride, setHasManualOverride] = useState(false);

    // Load saved preference on mount
    useEffect(() => {
        const themeState = resolveThemeState();

        setHasManualOverride(themeState.hasManualOverride);
        setIsDarkMode(themeState.isDarkMode);

        if (themeState.migratedPreference) {
            setStoredThemePreference(themeState.migratedPreference);
        }
    }, []);

    // Apply theme changes to DOM and cookies
    useEffect(() => {
        setCookie('dark_mode', isDarkMode ? '1' : '0', 365 * 5);
        applyThemeClass(isDarkMode);
    }, [isDarkMode]);

    // Manual toggle (from DarkModeToggle)
    const toggleManualMode = useCallback(() => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        setHasManualOverride(true);
        setStoredThemePreference(newMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // Set theme based on time (from TimezoneThemeSwitcher)
    const setTimeBasedMode = useCallback(
        (hour) => {
            if (!hasManualOverride) {
                const timeBasedMode = getTimeBasedTheme(hour);
                setIsDarkMode(timeBasedMode);
            }
        },
        [hasManualOverride, getTimeBasedTheme]
    );

    // Reset to automatic time-based theming
    const resetToAutomatic = useCallback(() => {
        clearStoredThemePreference();
        setHasManualOverride(false);
        setIsDarkMode(getTimeBasedTheme());
    }, [getTimeBasedTheme]);

    // Check if current theme matches time-based theme
    const isMatchingTimeTheme = useCallback(
        (hour = null) => {
            const timeBasedMode = getTimeBasedTheme(hour);
            return isDarkMode === timeBasedMode;
        },
        [isDarkMode, getTimeBasedTheme]
    );

    return {
        isDarkMode,
        hasManualOverride,
        toggleManualMode,
        setTimeBasedMode,
        resetToAutomatic,
        isMatchingTimeTheme,
        getTimeBasedTheme,
    };
}
