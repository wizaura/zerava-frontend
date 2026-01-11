/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "eco-black": "#0A0A0A",
        "mobility-green": "#0B2E28",
        "electric-teal": "#38D6C4",
        "mint-glow": "#A8F3D6",
        "text-primary": "#F5F5F5",
        "text-secondary": "#B5B5B5",
        "text-muted": "#8A8A8A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
