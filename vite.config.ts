import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import {run} from "vite-plugin-run";
import path from 'path';

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 3000,
        hmr: {
            host: "localhost",
        },
        watch: {
            usePolling: true,
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        run([
            {
                name: "wayfinder",
                run: ["php", "artisan", "wayfinder:generate"],
                pattern: ["routes/**/*.php", "app/**/Http/**/*.php"],
            },
        ]),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            '@':path.resolve(__dirname, 'resources/js'),
        }
    }
});
