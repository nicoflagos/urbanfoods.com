import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#1F8A3B"
        },
        accent: {
          500: "#F97316"
        }
      }
    }
  },
  plugins: []
} satisfies Config;

