const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A75233',
        secondary: '#F2F2F2',
        dark: '#333333',
        light: '#FFFFFF',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        gray: {
          100: '#F9F9F9',
          200: '#E0E0E0',
          300: '#CCCCCC',
          400: '#999999',
          500: '#666666',
          600: '#444444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [typography],
};
