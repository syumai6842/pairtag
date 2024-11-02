/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            'text-shadow': '0 0 10px rgb(234 179 8 / 80%)',
            opacity: '1'
          },
          '50%': {
            'text-shadow': '0 0 20px rgb(234 179 8 / 100%)',
            opacity: '0.8'
          },
        }
      },
      animation: {
        'glow-slow': 'glow 2s ease-in-out infinite',
        'glow-fast': 'glow 1s ease-in-out infinite',
      }
    }
  },
  plugins: [],
} 