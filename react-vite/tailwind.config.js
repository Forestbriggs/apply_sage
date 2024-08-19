/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            width: {
                'clamp-input': 'clamp(300px, 20dvw, 90dvw)',
            }
        },
    },
    plugins: [],
}

