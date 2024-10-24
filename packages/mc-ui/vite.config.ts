/*
 * @Author: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @Date: 2024-10-23 16:08:05
 * @LastEditors: Heng-Zhang2 Heng.Zhang2@budweiserapac.com
 * @LastEditTime: 2024-10-24 22:59:08
 * @FilePath: /mc-design/packages/mc-ui/vite.config.ts
 * @Description: vite 配置
 */
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  build: {
    lib: {
      entry: {
        'components/index': resolve(__dirname, './src/components/index.ts'),
        'hooks/index': resolve(__dirname, './src/hooks/index.ts'),
        'constants/index': resolve(__dirname, './src/constants/index.ts'),
      },
    },
    rollupOptions: {
      plugins: [peerDepsExternal()],
    },
    outDir: 'lib', // 打包后存放的目录文件
  },

  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, 'src/style/variable.less')}";`,
        javascriptEnabled: true,
      },
    },
  },
});
