import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
     plugins: [
          react(),
          eslint({
               include: [
                    'src/**/*.js',
                    'src/**/*.ts',
                    'src/**/*.jsx',
                    'src/**/*.tsx',
               ],
               exclude: ['node_modules', 'dist'],
               fix: true,
          }),
     ],
     server: {
          proxy: {
               '/auth': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
               '/products': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
               '/categories': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
               '/seasons': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
               '/orders': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
               '/comments': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
               '/order-steps': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
               '/users': {
                    target: 'http://localhost:3002',
                    changeOrigin: true,
               },
          },
     },
});
