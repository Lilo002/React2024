import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
    coverage: {
      provider: 'v8',
      exclude: [
        'next.config.mjs',
        '**/types.ts',
        'dist/**',
        '**/node_modules/**',
        '**/.next/**',
        '**/*.d.ts',
        '**/*utils.ts',
        '**/mainLayout.tsx',
      ],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
    },
  },
});
