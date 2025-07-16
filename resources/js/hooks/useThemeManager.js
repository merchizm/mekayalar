import { useState, useEffect, useCallback } from 'react';

const THEME_STORAGE_KEY = 'user-theme-preference';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return undefined;
};

const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export function useThemeManager() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasManualOverride, setHasManualOverride] = useState(false);

  // Get theme based on time
  const getTimeBasedTheme = useCallback((hour = null) => {
    const currentHour = hour !== null ? hour : new Date().getHours();
    return currentHour >= 21 || currentHour < 9;
  }, []);

  // Load saved preference on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem(THEME_STORAGE_KEY);
    const darkModeCookie = getCookie('dark_mode');
    
    if (savedPreference !== null) {
      // User has a manual preference in localStorage
      setHasManualOverride(true);
      setIsDarkMode(savedPreference === 'dark');
    } else if (darkModeCookie !== undefined) {
      // Legacy cookie preference - migrate to new system
      const cookieMode = darkModeCookie === '1';
      const timeBasedMode = getTimeBasedTheme();
      
      if (cookieMode !== timeBasedMode) {
        // Cookie differs from time-based, treat as manual override
        setHasManualOverride(true);
        setIsDarkMode(cookieMode);
        localStorage.setItem(THEME_STORAGE_KEY, cookieMode ? 'dark' : 'light');
      } else {
        // Cookie matches time-based, use automatic mode
        setHasManualOverride(false);
        setIsDarkMode(timeBasedMode);
      }
    } else {
      // No preference, use time-based
      setHasManualOverride(false);
      setIsDarkMode(getTimeBasedTheme());
    }
  }, [getTimeBasedTheme]);

  // Apply theme changes to DOM and cookies
  useEffect(() => {
    setCookie('dark_mode', isDarkMode ? '1' : '0', 365 * 5);
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Manual toggle (from DarkModeToggle)
  const toggleManualMode = useCallback(() => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setHasManualOverride(true);
    localStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Set theme based on time (from TimezoneThemeSwitcher)
  const setTimeBasedMode = useCallback((hour) => {
    if (!hasManualOverride) {
      const timeBasedMode = getTimeBasedTheme(hour);
      setIsDarkMode(timeBasedMode);
    }
  }, [hasManualOverride, getTimeBasedTheme]);

  // Reset to automatic time-based theming
  const resetToAutomatic = useCallback(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    setHasManualOverride(false);
    setIsDarkMode(getTimeBasedTheme());
  }, [getTimeBasedTheme]);

  // Check if current theme matches time-based theme
  const isMatchingTimeTheme = useCallback((hour = null) => {
    const timeBasedMode = getTimeBasedTheme(hour);
    return isDarkMode === timeBasedMode;
  }, [isDarkMode, getTimeBasedTheme]);

  return {
    isDarkMode,
    hasManualOverride,
    toggleManualMode,
    setTimeBasedMode,
    resetToAutomatic,
    isMatchingTimeTheme,
    getTimeBasedTheme
  };
}