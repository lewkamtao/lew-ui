/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'lib/components/collapse/src/LewCollapseTransition.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module './src/LewCollapseTransition.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module './LewCollapseTransition.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'highlight.js'
declare const hljs
declare module '@vueuse/core'
declare module 'lodash-es'

// Window interface is declared in individual directive files to avoid conflicts
