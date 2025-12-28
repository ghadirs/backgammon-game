import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#282632",
        secondary: "#1C1A24",
        accent: {
          blue: "#687DB0",
          darkBlue: "#00466D",
          cyan: "#22C8F2",
          red: "#FF4F52",
        },
        text: {
          primary: "#E4E3E7",
          secondary: "#89888D",
        },
        wood: {
          light: "#A66D4A",
          dark: "#623D2C",
          darker: "#5B321E",
        },
        piece: {
          black: "#190802",
          white: "#9B5A3D",
        },
        panel: "rgba(9, 21, 42, 0.35)",
        button: "rgba(9, 21, 42, 0.5)",
        border: "#1A3150",
      },
      backgroundColor: {
        panel: "rgba(28, 31, 46, 0.8)",
        button: "rgba(9, 21, 42, 0.5)",
      },
      borderColor: {
        panel: "#1A3150",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        strong: ["Strong", "sans-serif"],
        strait: ["Strait", "sans-serif"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "56px",
      },
      spacing: {
        "4.5": "18px",
        "5.5": "22px",
        "7.5": "30px",
        "12.5": "50px",
        "15": "60px",
      },
      borderRadius: {
        DEFAULT: "6px",
        lg: "8px",
        xl: "10px",
      },
      backdropFilter: {
        none: "none",
        blur: {
          sm: "blur(20px)",
          md: "blur(30px)",
          lg: "blur(80px)",
          xl: "blur(100px)",
        },
      },
      boxShadow: {
        inner: "inset 0px 0px 15px 3px rgba(43, 15, 0, 1)",
        "inner-light": "inset 0px 0px 15px 3px rgba(183, 152, 135, 1)",
        piece:
          "0px 0px 5px 3px rgba(0, 0, 0, 0.25), inset 2px 2px 2px 0px rgba(0, 0, 0, 0.25), inset -2px -2px 2px 0px rgba(242, 172, 102, 0.25)",
        button: "inset 0px 0px 15px 0px rgba(0, 0, 0, 0.25)",
        card: "0px 0px 20px 1px rgba(0, 0, 0, 0.25)",
      },
      opacity: {
        5: "0.05",
        10: "0.1",
        50: "0.5",
        60: "0.6",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in",
        slideIn: "slideIn 0.3s ease-out",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
