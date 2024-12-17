/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    sm: "600px",
                    md: "728px",
                    lg: "984px",
                    xl: "1240px",
                },
            },
            fontFamily: {
                sans: ["Poppins"],
            },
        },
    },
    plugins: [],
};
