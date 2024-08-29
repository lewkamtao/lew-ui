/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
import { LewNotification, LewDialog, LewMessage, LewContextMenu } from '../directives'
import { Fancybox } from '@fancyapps/ui'

declare module 'highlight.js'
declare const hljs
declare module '@vueuse/core'
declare module '@vueuse/components'
declare interface Window {
  LewContextMenu: LewContextMenu
  LewFancybox: Fancybox
  LewNotification: LewNotification
  LewDialog: LewDialog
  LewMessage: LewMessage
}
