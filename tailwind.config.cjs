/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // Add this if you use a src/ folder
    ],
    theme: {
        extends: {
            colors: {
                'glass-bg': 'rgba(9, 21, 42, 0.6)',
                'glass-border': '#1A3150',
                'card-overlay': 'rgba(21, 32, 55, 0.9)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
}