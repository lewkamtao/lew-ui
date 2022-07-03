import { defineConfig, ConfigEnv } from 'vite';
import compressPlugin from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    return {
        resolve: {
            //设置别名
            alias: {
                'lew-ui': path.resolve(__dirname, 'packages'),
                '@': path.resolve(__dirname, 'src'),
            },
            // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        // compressPlugin开启gzip压缩
        plugins: [
            vue(),
            compressPlugin({
                ext: '.gz',
                deleteOriginFile: false, // 是否删除原始文件
            }),
        ],
        build:
            mode == 'package'
                ? {
                      lib: {
                          entry: path.resolve(__dirname, './packages/index.ts'),
                          name: 'lew-ui',
                          fileName: (format) => `lew.${format}.ts`,
                      },
                      minify: 'terser',
                      terserOptions: {
                          compress: {
                              //生产环境时移除console
                              drop_console: true,
                              drop_debugger: true,
                          },
                      },
                      rollupOptions: {
                          // 确保外部化处理那些你不想打包进库的依赖
                          external: ['vue'],
                          output: {
                              // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                              globals: {
                                  vue: 'Vue',
                              },
                          },
                      },
                  }
                : {
                      rollupOptions: {
                          output: {
                              chunkFileNames: 'assets/js/[name]-[hash].js',
                              entryFileNames: 'assets/js/[name]-[hash].js',
                              assetFileNames:
                                  'assets/static/[name]-[hash].[ext]',
                              manualChunks(id: any) {
                                  if (id.includes('node_modules')) {
                                      return id
                                          .toString()
                                          .split('node_modules/')[1]
                                          .split('/')[0]
                                          .toString();
                                  }
                              },
                          },
                      },
                      minify: 'terser',
                      terserOptions: {
                          compress: {
                              drop_console: true,
                              drop_debugger: true,
                          },
                      },
                  },
    };
});
