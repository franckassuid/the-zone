/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    light: '#F8F9FA',
                    dark: '#121212',
                },
                primary: {
                    indigo: '#6366F1', // Indigo 500
                    coral: '#F43F5E',  // Rose 500 (close to Coral)
                },
                success: '#34D399',  // Emerald 400 (Mintish)
                surface: {
                    light: '#FFFFFF',
                    dark: '#1E1E1E',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
