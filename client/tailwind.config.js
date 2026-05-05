export default {
  // theme: {
  //   extend: {
  //     keyframes: {
  //       blobDrift: {
  //         "0%, 100%": { transform: "translate(0,0) scale(1)" },
  //         "33%": { transform: "translate(24px,-16px) scale(1.06)" },
  //         "66%": { transform: "translate(-16px,12px) scale(0.96)" },
  //       },
  //     },
  //   },
  // },
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#F8F9FA",
        ink: "#0B1F3A",
        muted: "#5B6B7F",
        line: "rgba(11, 31, 58, 0.10)",
        brand: {
          50: "#EEF6FF",
          100: "#D9EAFF",
          200: "#B7D5FF",
          300: "#84B7FF",
          400: "#4D92FF",
          500: "#2F73F6",
          600: "#1E5DE0",
          700: "#1849B0",
          800: "#173E8F",
          900: "#173574",
        },
        gold: {
          50: "#FFF8E8",
          100: "#FFEDC2",
          200: "#FFD98A",
          300: "#FFC14A",
          400: "#FFAB1F",
          500: "#F08A00",
          600: "#CC6700",
          700: "#A64B00",
          800: "#833B00",
          900: "#6B3200",
        },
      },
      boxShadow: {
        md: "0 12px 24px rgba(11, 31, 58, 0.22), 0 3px 10px rgba(11, 31, 58, 0.14)",
        lg: "0 22px 52px rgba(11, 31, 58, 0.26), 0 10px 18px rgba(11, 31, 58, 0.16)",
        soft: "0 10px 26px rgba(11, 31, 58, 0.12)",
        card: "0 16px 40px rgba(11, 31, 58, 0.16)",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
