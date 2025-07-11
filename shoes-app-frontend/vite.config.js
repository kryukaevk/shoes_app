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
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
               '/products': {
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
               '/categories': {
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
               '/seasons': {
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
               '/orders': {
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
               '/comments': {
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
               '/order-steps': {
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
               '/users': {
                    target: 'http://90.156.225.144',
                    changeOrigin: true,
               },
          },
     },
});
