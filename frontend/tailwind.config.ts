import type { Config } from 'tailwindcss';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'stone': {
                    50: '#faf8f5',
                    100: '#f5f3ef',
                    200: '#e8e4dd',
                },
                'charcoal': '#2d2d2d',
                'champagne': {
                    100: '#f5efd8',
                    400: '#e0c56d',
                    600: '#d4af37',
                },
                'sage': {
                    500: '#9caf88',
                },
            },
            fontFamily: {
                playfair: ['"Playfair Display"', 'serif'],
                montserrat: ['"Montserrat"', 'sans-serif'],
            },
            letterSpacing: {
                'luxury': '0.2em',
            },
        },
    },
    plugins: [],
} satisfies Config;
