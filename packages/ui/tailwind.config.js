/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "10rem",
        },
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      height: {
        "9/10": "90%",
      },
      transitionProperty: {
        spacing: "margin, padding",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("sky.blue.700"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.100"),
            a: {
              color: theme("sky.blue.300"),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [require("@tailwindcss/typography")],
};
