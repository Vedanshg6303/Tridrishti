/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Logo electric cyan-blue
          600: '#0284c7', // Logo vibrant sapphire iris
          700: '#0369a1', // Deep ocean blue
          800: '#075985',
          900: '#0c4a6e',
          950: '#041f36',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        dark: {
          bg: '#040711',        // Ultra-deep midnight black like logo background
          card: '#090f20',      // Deep navy glass card
          cardHover: '#0f172e',
          border: '#172340',    // Sapphire tint border
          borderLight: '#243763',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-brand': '0 0 25px -5px rgba(14, 165, 233, 0.35)',
        'glow-card': '0 0 35px -10px rgba(2, 132, 199, 0.15)',
        'glow-accent': '0 0 40px -5px rgba(34, 211, 238, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15), transparent 70%), radial-gradient(circle at 100% 50%, rgba(2, 132, 199, 0.1), transparent 60%)',
      },
    },
  },
  plugins: [],
}
