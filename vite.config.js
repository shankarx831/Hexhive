import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import compression from 'vite-plugin-compression';
import path from 'path';

// Prerender configuration
import prerender from 'vite-plugin-prerender';
import Renderer from '@prerenderer/renderer-puppeteer';

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
        prerender({
            staticDir: path.resolve('build'),
            routes: ['/', '/programs', '/register', '/login'],
            renderer: new Renderer({
                renderAfterDocumentEvent: 'custom-render-trigger',
                renderAfterTime: 10000,
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }),
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
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    framer: ['framer-motion'],
                    pdf: ['@react-pdf/renderer'],
                    ui: ['lucide-react', '@formspree/react']
                }
            }
        },
        chunkSizeWarningLimit: 1000, // Suppress warnings for now
    },
});
