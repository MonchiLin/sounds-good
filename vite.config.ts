import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/lib': path.resolve(__dirname, './src/lib'),
            '@/data': path.resolve(__dirname, './src/data'),
            '@/contexts': path.resolve(__dirname, './src/contexts'),
            '@/constants': path.resolve(__dirname, './src/constants'),
            '@/types': path.resolve(__dirname, './src/types'),
            '@/utils': path.resolve(__dirname, './src/utils'),
        },
    },
    server: {
        port: 3001,
    },
})
