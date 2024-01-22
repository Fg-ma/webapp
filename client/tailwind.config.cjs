module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    media: false,
    mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'fg-primary': '#F56114',
                'fg-secondary': '#2C92F5',
                'fg-white-95': '#F3F3F3',
                'fg-white-90': '#E6E6E6',
                'fg-white-85': '#D9D9D9',
                'fg-white-80': '#CCCCCC',
                'fg-white-75': '#BFBFBF',
                'fg-white-70': '#B3B3B3',
                'fg-white-65': '#A6A6A6',
                'fg-white-60': '#999999',
                'fg-white-55': '#8C8C8C',
                'fg-black-50': '#808080',
                'fg-black-45': '#737373',
                'fg-black-40': '#666666',
                'fg-black-35': '#595959',
                'fg-black-30': '#4D4D4D',
                'fg-black-25': '#404040',
                'fg-black-20': '#333333',
                'fg-black-15': '#262626',
                'fg-black-10': '#1A1A1A',
                'fg-black-5': '#0D0D0D',
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
            rotate: {
                "225": "225deg"
            },
            spacing: {
                '-3.25': '-0.8125rem',
            },
            maxWidth: {
                '1/4': '25%',
            },
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
};