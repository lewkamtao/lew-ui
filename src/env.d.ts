/*
 * @Author: Kamtao
 * @Date: 2022-07-08 10:58:24
 * @LastEditTime: 2022-07-12 15:39:19
 * @Description:
 */
/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'highlight.js';
declare const hljs;
declare module 'lew-ui';
declare module '@vicons/fluent';
declare module '@fancyapps/ui';
declare const LewMessage;
declare const LewDialog;
declare const LewNotification;
