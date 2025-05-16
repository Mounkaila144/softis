import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Préserver la structure des assets pour faciliter la migration
    assetsInlineLimit: 4096, // 4kb - les fichiers plus petits seront inlinés en base64
  },
  // Définir des alias pour faciliter les imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
});
