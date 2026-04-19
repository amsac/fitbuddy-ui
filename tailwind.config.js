export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",
        bgMain: "var(--color-bg)",
        card: "var(--color-card)",
        textMain: "var(--color-text)",
        textSecondary: "var(--color-text-secondary)",
      },
    },
  },
  plugins: [],
};