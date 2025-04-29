/** @type {import('tailwindcss').Config} */
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#43a047',
          dark: '#388e3c',
          light: '#81c784',
          bg: '#e8f5e9',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(67, 160, 71, 0.08)',
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi', 'lucide']),
    }),
  ],
}
