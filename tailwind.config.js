/** @type {import('tailwindcss').Config} */
module.exports = {
  // 👇 These are all the directories Tailwind should scan for class names
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}",      // Page Router
    "./components/**/*.{js,ts,jsx,tsx}", // UI Components
    "./hooks/**/*.{js,ts,jsx,tsx}",      // Custom hooks
    "./store/**/*.{js,ts,jsx,tsx}",      // Zustand store folder
    "./lib/**/*.{js,ts,jsx,tsx}",        // Utility modules
    "./src/**/*.{js,ts,jsx,tsx}",        // Optional: if you use /src structure
  ],

  theme: {
    extend: {
      colors: {
        bid: "#00C176",   // Green for bids
        ask: "#FF4B4B",   // Red for asks
        background: "#0b1220",
        textLight: "#e6eef8",
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },

  // ✅ If you're using Tailwind v3, keep this
  // For Tailwind v4 (beta), use `export default` instead
  plugins: [],
};
