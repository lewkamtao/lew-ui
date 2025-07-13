import { defineConfig } from 'tsdown'
import scss from 'rollup-plugin-scss'

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
