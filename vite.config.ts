import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    plugins: [vue()],
});

//     build: {
//     lib: {
//         entry: path.resolve(__dirname, './packages/index.ts'),
//         name: 'lew-ui',
//         fileName: (format) => `lew.${format}.ts`,
//     },
//     rollupOptions: {
//         // 确保外部化处理那些你不想打包进库的依赖
//         external: ['vue'],
//         output: {
//             // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
//             globals: {
//                 vue: 'Vue',
//             },
//         },
//     },
// },
