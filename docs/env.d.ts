/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'highlight.js'
declare const hljs
declare const LewMessage
declare const LewDialog

declare const LewNotification: (typeof import('../directives'))['LewNotification']

// Window interface is declared in individual directive files to avoid conflicts
