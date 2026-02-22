/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                lora: ['var(--font-lora)', 'Lora', 'serif'],
                viaoda: ['var(--font-viaoda)', 'Viaoda Libre', 'serif'],
            },
        },
    },
    plugins: [],
}