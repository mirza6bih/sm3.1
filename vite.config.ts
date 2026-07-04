import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        savjeti: resolve(root, 'savjeti.html'),
        tekstovi: resolve(root, 'tekstovi.html'),
      },
    },
  },
});
