import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    {
      // 解决循环依赖
      name: 'singleHMR',
      handleHotUpdate({ modules }) {
        modules.map((m) => {
          m.importedModules = new Set();
          m.importers = new Set();
        });
        return modules;
      },
    },
  ],
  resolve: {
    alias: {
      'arex-core': path.resolve('../arex-core/src'),
    },
  },
  server: {
    proxy: {
      '/report': {
        target: 'http://10.5.153.1:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace('/report', '/api'),
      },
      '/schedule': {
        target: 'http://10.5.153.1:8092',
        changeOrigin: true,
        rewrite: (path) => path.replace('/schedule', '/api'),
      },
      '/storage': {
        target: 'http://10.5.153.1:8093',
        changeOrigin: true,
        rewrite: (path) => path.replace('/storage', '/api'),
      },
      '^/node/.*': {
        target: 'http://10.5.153.1:10001',
        changeOrigin: true,
        rewrite: (path) => path.replace('/node', '/'),
      },
    },
  },
});