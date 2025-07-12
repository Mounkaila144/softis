/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './dist/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F5F5',
          100: '#CCEBEB',
          200: '#99D6D6',
          300: '#66C2C2',
          400: '#33ADAD',
          500: '#2C7A7B',
          600: '#236262',
          700: '#1A4949',
          800: '#123131',
          900: '#091818',
        },
        turquoise: {
          50: '#E6F5F5',
          100: '#CCEBEB',
          200: '#99D6D6',
          300: '#66C2C2',
          400: '#33ADAD',
          500: '#2C7A7B',
          600: '#236262',
          700: '#1A4949',
          800: '#123131',
          900: '#091818',
          1000: '#2C7A7B',
        },
        gold: {
          50: '#FAF7E6',
          100: '#F5EFCC',
          200: '#EBDF99',
          300: '#E1CF66',
          400: '#D7BF33',
          500: '#D4AF37',
          600: '#A98C2C',
          700: '#7F6921',
          800: '#554616',
          900: '#2A230B',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          'sans-serif',
        ],
        serif: [
          '"Noto Serif JP"',
          'serif',
        ],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg')",
      },
    },
  },
  plugins: [],
};