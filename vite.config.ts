/// <reference types="vitest/config" />
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

const dirname = import.meta.dirname;

const alias = {
  '@': path.resolve(dirname, './src'),
  '@backend': path.resolve(dirname, './backend'),
  '@shared': path.resolve(dirname, './shared'),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias,
  },
  test: {
    projects: [
      {
        test: {
          name: 'node',
          include: ['backend/**/*.{test,spec}.ts'],
          alias,
          environment: 'node',
        },
      },
    ],
  },
});
