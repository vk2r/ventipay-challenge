/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const { parkwindPlugin } = require('@park-ui/tailwind-plugin');
const glow = require('@codaworks/react-glow/tailwind');
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [parkwindPlugin, glow],
  darkMode: ['class'],
};

