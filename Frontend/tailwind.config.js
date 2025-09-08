/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  theme: {
    extend: {
      screens: {
        'xs': '375px', 
        'iphone-x': { 'raw': '(device-width: 375px) and (device-height: 812px)' },
        'iphone-plus': { 'raw': '(device-width: 414px) and (device-height: 736px)' },
        'tablet-mini': { 'raw': '(min-width: 300px) and (max-width: 900px)' },

        'ipad': { 'raw': '(min-width: 768px) and (max-width: 1024px)' },
        'ipad-Pro': { 'raw': '(min-width: 1024px) and (max-width: 1366px)' },
        'Laptop': { 'raw': '(min-width: 1366px) and (max-width: 1600px)' },
        '4k': '2560px',
      },
    },
  },
  
  plugins: [],
}