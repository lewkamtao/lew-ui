import scss from 'rollup-plugin-scss'
import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['./lib/index.ts'],
    platform: 'neutral',
    fromVite: true,
    plugins: [scss()],
    dts: {
      vue: true,
    },
  },
])
