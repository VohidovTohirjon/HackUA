/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        care: {
          navy: "#102a43",
          blue: "#2563eb",
          cyan: "#0891b2",
          mint: "#10b981",
          ice: "#f4fbfb",
          ink: "#172033"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
