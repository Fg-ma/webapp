module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                'fg-primary': '#F56114',
                'fg-secondary': '#2C92F5',
                'fg-white-95': '#F3F3F3',
                'fg-white-90': '#E6E6E6',
                'fg-white-85': '#D9D9D9',
                'fg-white-70': '#B3B3B3',
                'fg-black-30': '#4D4D4D',
                'fg-black-25': '#404040',
                'fg-black-20': '#333333',
                'fg-black-15': '#262626'
            },
            fontFamily: {
                Josefin: ["Josefin","sans"],
                K2D: ["K2D", "sans"]
            },
            backgroundSize: {
                '125': '125%',
                '150': '150%',
                '175': '175%',
                '200': '200%',
                '225': '225%',
                '250': '250%',
                '350': '350%',
            },
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
};