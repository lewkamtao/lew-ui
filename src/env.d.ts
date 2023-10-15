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
declare const LewMessage;
declare const LewDialog;
declare module '@/lib/utils';
declare const LewNotification: typeof import('../lib/directives')['LewNotification'];
