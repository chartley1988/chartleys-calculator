/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config'
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/tests/setup.ts',
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    environment: 'jsdom',
  },
})