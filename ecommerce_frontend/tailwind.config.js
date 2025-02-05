/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        // './pages/**/*.{js,jsx}',
        // './components/**/*.{js,jsx}',
        // './app/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
        extend: {},
    },

    plugins: [
        // require("tailwindcss-animate")
    ],
    // require('@tailwindcss/line-clamp'),

}