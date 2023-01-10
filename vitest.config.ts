/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config'
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts/',
  },
})