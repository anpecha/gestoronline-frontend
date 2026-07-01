import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DA291C",
          yellow: "#FFC72E",
          dark: "#202020",
        },
      },
    },
  },
  plugins: [],
};
export default config;
