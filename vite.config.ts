import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/modules/shared/components'),
      '@type': path.resolve(__dirname, 'src/modules/shared/types'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/page'),
      '@utils': path.resolve(__dirname, 'src/modules/shared/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@layouts': path.resolve(__dirname, 'src/modules/shared/Layouts'),
      '@stores': path.resolve(__dirname, 'src/modules/shared/stores'),
      '@styles': path.resolve(__dirname, 'src/modules/shared/styles'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      src: path.resolve(__dirname, 'src'),
    },
  },
});
