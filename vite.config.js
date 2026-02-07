import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import compression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        react(),
        Sitemap({
            hostname: 'https://hexhive.solutions',
            outDir: 'build',
            dynamicRoutes: [
                '/',
                '/programs',
                '/register',
                '/login',
                '/business/become-instructor',
                '/business/hire',
                '/business/what-we-do',
                '/business/why-hexhive',
                '/legal'
            ]
        }),
        compression({ algorithm: 'brotliCompress' }),
    ],
    base: '/', // Matches your repo name for GH Pages compatibility later
    define: {
        'process.env.PUBLIC_URL': JSON.stringify(''),
    },
    server: {
        open: true, // Auto open browser
        port: 3000,
    },
    build: {
        outDir: 'build', // CRA outputs to 'build', maintaining this for scripts

    },
});
