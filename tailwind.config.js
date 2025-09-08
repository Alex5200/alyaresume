// tailwind.config.js
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#284139',
                secondary: '#809076',
                light: '#f8fafc',
                dark: '#1e293b',
                'accent-hover': '#1e322c',
                'secondary-light': '#a0b096',
            },
            fontFamily: {
                lora: ['var(--font-lora)', 'Lora', 'serif'],
                viaoda: ['var(--font-viaoda)', 'Viaoda Libre', 'serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('tailwindcss-animate'),
    ],
};