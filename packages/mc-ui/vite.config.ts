import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'vite';

const path = require('path');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        components: resolve(__dirname, './src/components/index.tsx'),
        hooks: resolve(__dirname, './src/hooks/index.ts'),
        constants: resolve(__dirname, './src/constants/index.ts'),
      },
    },
    rollupOptions: {
      plugins: [
        peerDepsExternal(),
        typescript({
          target: 'es5',
          declaration: true,
          declarationDir: resolve(__dirname, 'lib'),
          exclude: resolve(__dirname, 'node_modules/**'),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
    outDir: 'lib', // 打包后存放的目录文件
  },

  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(__dirname, 'src/style/variable.less')}";`,
        javascriptEnabled: true,
      },
    },
  },
});
