import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';

// 路径
const pathSrc = path.resolve(__dirname, 'src');
const pathPackage = path.resolve(__dirname, 'lib');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        base: '',
        server: {
            open: true,
            port: 10034,
            hmr: true,
            proxy: {
                '/api_admin': {
                    target: 'https://app.tngeek.com/api_admin',
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api_admin/, '')
                }
            }
        },
        resolve: {
            // 设置别名
            alias: {
                'lew-ui': pathPackage,
                '@': pathSrc
            },
            // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
        },
        plugins: [
            vue(),
            vueJsx(),
            mode === 'lib' ? dts() : undefined,
            AutoImport({
                imports: ['vue'],
                dts: path.resolve(pathSrc, 'auto-imports.d.ts')
            }),
            AutoImport({
                imports: ['vue'],
                dts: path.resolve(pathPackage, 'auto-imports.d.ts')
            }),
            checker({
                typescript: true
            })
        ],
        build:
            mode === 'lib'
                ? {
                      lib: {
                          entry: path.resolve(__dirname, './lib/index.ts'),
                          name: 'lew-ui',
                          fileName: 'index'
                      },
                      minify: 'terser',
                      terserOptions: {
                          compress: {
                              // 生产环境时移除console
                              drop_console: true,
                              drop_debugger: true
                          }
                      },
                      emptyOutDir: true,
                      rollupOptions: {
                          // 确保外部化处理那些你不想打包进库的依赖
                          external: ['vue'],
                          output: {
                              // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                              globals: {
                                  vue: 'Vue'
                              }
                          }
                      }
                  }
                : {
                      rollupOptions: {
                          output: {
                              chunkFileNames: 'assets/js/[name]-[hash].js',
                              entryFileNames: 'assets/js/[name]-[hash].js',
                              assetFileNames: 'assets/static/[name]-[hash].[ext]',
                              // eslint-disable-next-line consistent-return
                              manualChunks(id) {
                                  if (id.includes('node_modules')) {
                                      return id
                                          .toString()
                                          .split('node_modules/')[1]
                                          .split('/')[0]
                                          .toString();
                                  }
                              }
                          }
                      },
                      minify: 'terser',
                      emptyOutDir: true,
                      terserOptions: {
                          compress: {
                              drop_console: true,
                              drop_debugger: true
                          }
                      }
                  }
    };
});
