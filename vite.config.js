import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // Configurações base
  base: './',
  publicDir: 'assets',
  
  // Configurações do servidor de desenvolvimento
  server: {
    port: 3000,
    open: true,
    host: true,
    cors: true
  },
  
  // Configurações do servidor de preview
  preview: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Configurações de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    target: 'es2015',
    
    // Configurações de chunking para otimização
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        manualChunks: {
          utils: ['./js/utils/helpers.js'],
          modules: [
            './js/modules/navigation.js',
            './js/modules/carousel.js', 
            './js/modules/animations.js'
          ]
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // Configurações de terser para minificação
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // Plugins
  plugins: [
    // Plugin para compatibilidade com browsers antigos
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  
  // Configurações de CSS
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  
  // Configurações de assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  
  // Define globais para compatibilidade
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
  }
});