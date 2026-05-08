import type { Config } from 'tailwindcss'

// NOTE: Tailwind CSS v4 uses CSS-first configuration.
// The real color and font tokens are defined in src/assets/styles/main.css
// using the @theme { } directive. This file exists for IDE tooling compatibility.
const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Tailwind v4 ignores this — see main.css @theme block
      colors: {
        navy: '#2C395C',
        slate: '#8B98A9',
        mist: '#A6BBCE',
        sand: '#D9BC9C',
        cream: '#FCF4EF',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
