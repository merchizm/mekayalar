import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const semanticColor = (name) => `hsl(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './app/Enums/*.php',
        './resources/js/**/*.{js,jsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                background: semanticColor('background'),
                foreground: semanticColor('foreground'),
                card: {
                    DEFAULT: semanticColor('card'),
                    foreground: semanticColor('card-foreground'),
                },
                popover: {
                    DEFAULT: semanticColor('popover'),
                    foreground: semanticColor('popover-foreground'),
                },
                primary: {
                    DEFAULT: semanticColor('primary'),
                    foreground: semanticColor('primary-foreground'),
                },
                secondary: {
                    DEFAULT: semanticColor('secondary'),
                    foreground: semanticColor('secondary-foreground'),
                },
                muted: {
                    DEFAULT: semanticColor('muted'),
                    foreground: semanticColor('muted-foreground'),
                },
                accent: {
                    DEFAULT: semanticColor('accent'),
                    foreground: semanticColor('accent-foreground'),
                },
                destructive: {
                    DEFAULT: semanticColor('destructive'),
                    foreground: semanticColor('destructive-foreground'),
                },
                border: semanticColor('border'),
                input: semanticColor('input'),
                ring: semanticColor('ring'),
                success: {
                    DEFAULT: semanticColor('success'),
                    foreground: semanticColor('success-foreground'),
                    surface: semanticColor('success-surface'),
                },
                warning: {
                    DEFAULT: semanticColor('warning'),
                    foreground: semanticColor('warning-foreground'),
                    surface: semanticColor('warning-surface'),
                },
                info: {
                    DEFAULT: semanticColor('info'),
                    foreground: semanticColor('info-foreground'),
                    surface: semanticColor('info-surface'),
                },
                sidebar: {
                    DEFAULT: semanticColor('sidebar'),
                    foreground: semanticColor('sidebar-foreground'),
                    accent: semanticColor('sidebar-accent'),
                    border: semanticColor('sidebar-border'),
                },
                spotify: {
                    DEFAULT: '#1DB954',
                    foreground: '#ffffff',
                },
            },
        },
    },
    plugins: [forms],
};
