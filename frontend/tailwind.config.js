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
          light: "var(--white)",
          dark: "var(--gray-6)"
        },
        border: {
          light: "var(--gray-1)",
          dark: "var(--gray-5)",
          current: {
            light: "var(--gray-2)",
            dark: "var(--gray-4)"
          }
        },
        gray: {
          light: "var(--gray-3)",
          dark: "var(--gray-5)"
        },
        yellow: {
          light: "var(--yellow-1)",
          dark: "var(--yellow-2)"
        },
        green: {
          light: "var(--green-1)",
          dark: "var(--green-2)"
        },
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"]
      }
    }
  },
  plugins: [],
}
