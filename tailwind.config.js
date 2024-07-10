/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
            },
            fontFamily: {
                sans: ["Poppins"],
            },
        },
    },
    plugins: [],
};
