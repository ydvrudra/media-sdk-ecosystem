import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: process.cwd(),
  server: {
    port: 3000,
    open: true,
  },
  publicDir: 'public',
});