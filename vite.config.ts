import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/

export const isHosting = false;
export default defineConfig({
  base: isHosting ? '/CP25Team02/' : '/',

  plugins: [react()],
});
