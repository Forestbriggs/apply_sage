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
                'clamp-search': 'clamp(400px, 20dvw, 90dvw)'
            },
            minHeight: {
                'main-container': 'calc(100dvh - 64px - 64px)',
                'main-container-sm': 'calc(100dvh - 96px - 100px)'
            },
            backgroundColor: {
                'main': '#1F1F1F',
                'main-alt': '#48484860',
                'btn-main': '#98A869',
                'btn-main-hover': '#7D8A53',
                'edit-btn': '#007BFF',
                'edit-btn-hover': '#0056B3',
                'delete-btn': '#DC3545',
                'delete-btn-hover': '#C82333',
                'cancel-btn': '#A9A9A9',
                'cancel-btn-hover': '#6C757D',
                'tab-btn': '#48484860',
                'tab-btn-hover': '#48484880',
                'tab-btn-active': '#484848',
            },
            textColor: {
                'main-color': 'rgba(255, 255, 255, 0.87)',
                'hover-color': 'rgb(12, 158, 12)',
                'main-dark': '#1F1F1F',
            },
            borderColor: {
                'alt': '#48484860'
            },
            screens: {
                'feature-main': '1328px',
                'testimony-main': '1090px'
            }
        },
    },
    plugins: [
        // plugin(function ({ addComponents, theme }) {
        //     addComponents({
        //         '.edit-btn': {
        //             backgroundColor: theme('backgroundColor.edit-btn')
        //         }
        //     })
        // })
    ],
}

