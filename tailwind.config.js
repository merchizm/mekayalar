import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './app/Enums/*.php'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                background: {
                    DEFAULT: '#ffffff',
                    dark: '#0C0C0C',
                },
                text: {
                    DEFAULT: '#24292e',
                    dark: '#d7d7db',
                },
                'light-text': {
                    DEFAULT: '#57606a',
                    dark: '#a1a1a9',
                },
                'dark-text': {
                    dark: '#8c8c91',
                },
                'key-preview': {
                    DEFAULT: '#e0e0e0',
                    dark: '#4a4a4a',
                },
                'key-border': {
                    DEFAULT: '#d1d5da',
                    dark: '#373737',
                },
                button: {
                    DEFAULT: '#f6f6f6',
                    dark: '#1a1a1e',
                },
                'button-hover': {
                    DEFAULT: '#efefef',
                    dark: '#111113',
                },
                'label-color': {
                    DEFAULT: '#ffffff',
                    dark: '#111113',
                },
                'label-border': {
                    DEFAULT: '#3b3b42',
                    dark: '#414149',
                },
                divider: {
                    DEFAULT: '#efefef',
                    dark: '#19191c',
                },
                svg: {
                    DEFAULT: '#222222',
                    dark: '#e7e5e5',
                },
                'outline-color': {
                    DEFAULT: 'hsla(0, 0%, 70%, .18)',
                    dark: 'hsla(0, 0%, 14%, 0.35)',
                },
                'hover-anchor': {
                    DEFAULT: '#222222',
                    dark: '#1a1a1e',
                },
                'poem-container': {
                    DEFAULT: '#f3f3f3',
                    dark: '#070707',
                },
                selection: {
                    DEFAULT: '#efefef',
                    dark: '#070707',
                },
                spotify: {
                    DEFAULT: '#01DA5A',
                    dark: '#05bc51',
                },
                'spotify-hover': {
                    DEFAULT: '#05bc51',
                    dark: '#05a648',
                },
                'social-bg': {
                    DEFAULT: '#efefef',
                    dark: '#313133',
                },
                'social-bg-hover': {
                    DEFAULT: '#f3f3f3',
                    dark: '#3b3b3b',
                },
                'repository-card-bg': {
                    DEFAULT: '#e3e3e3',
                    dark: '#19191a',
                },
                'repository-card-bg-hover': {
                    DEFAULT: '#ececec',
                    dark: '#161617',
                },
                'menu-active': {
                    DEFAULT: '#000000',
                    dark: '#f1f1f1',
                },
                menu: {
                    DEFAULT: '#272727',
                    dark: '#ddd',
                },
                'menu-hover': {
                    DEFAULT: '#efefef',
                    dark: '#111113',
                },
                'menu-hover-text': {
                    DEFAULT: '#3b3939',
                    dark: '#cccbcb',
                },
            }
        },
    },

    plugins: [forms],
};
