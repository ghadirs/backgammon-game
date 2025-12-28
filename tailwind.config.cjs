/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",      // Your page/lobby file
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Your GameCard/NavItem files
        "./src/**/*.{js,ts,jsx,tsx,mdx}",      // Include if you have a src folder
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}