import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        coverage: {
            reporter: ["text", "lcov"],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});