import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/', // Matches your repo name for GH Pages compatibility later
    define: {
        // Polyfill process.env.PUBLIC_URL for compatibility with CRA code
        'process.env.PUBLIC_URL': JSON.stringify('/'),
    },
    server: {
        open: true, // Auto open browser
        port: 3000,
    },
    build: {
        outDir: 'build', // CRA outputs to 'build', maintaining this for scripts
    },
});
