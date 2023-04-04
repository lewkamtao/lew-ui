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
declare module 'lew-ui/utils';
declare module 'lodash/throttle';
declare module '@vueuse/core';
declare module '@vueuse/components';
declare module 'moment';
