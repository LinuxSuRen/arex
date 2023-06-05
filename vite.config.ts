import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/arex-request-runtime/lib/index.js',
          dest: '',
          rename: 'arex-request-runtime.js',
        },
      ],
    }),
  ],
  server: {
    port: 8000,
  },
});
