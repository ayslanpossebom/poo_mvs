import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/poo_mvs/', // <-- Adicione exatamente esta linha
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
