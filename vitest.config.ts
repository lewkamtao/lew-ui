import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    plugins: [vue()],
    optimizeDeps: {
        disabled: true,
    },
    test: {
        clearMocks: true,
        environment: 'jsdom',
        transformMode: {
            web: [/\.[jt]sx$/],
        },
    },
});
