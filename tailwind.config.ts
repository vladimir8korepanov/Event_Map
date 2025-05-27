import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      height: {
        map: 'calc(100vh - 4rem)',
      },
    },
  },
  plugins: [],
}

export default config