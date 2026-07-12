/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare const __DEV__: boolean
declare const __LEW_VERSION__: string

// dayjs types are handled by the package itself

declare module '@vueuse/core'
declare module 'lodash-es'
