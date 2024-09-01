import { useMouse } from '@vueuse/core'
import { createApp, h } from 'vue'
import _LewDialog from './LewDialog.vue'
import type { LewColor } from 'lew-ui'

const { x, y } = useMouse()

type Options = {
  title: string
  content: string
  ok?: () => boolean | Promise<boolean>
  cancel?: () => boolean | Promise<boolean>
  layout?: string
  okText?: string
  cancelText?: string
  closeOnClickOverlay?: boolean
  closeByEsc?: boolean
}

type DialogType = 'warning' | 'error' | 'info' | 'normal' | 'success'

const createDialog = (type: DialogType) => (options: Options) => dialog(type as LewColor, options)

const warning = createDialog('warning')
const error = createDialog('error')
const info = createDialog('info')
const normal = createDialog('normal')
const success = createDialog('success')

const dialog = (type: LewColor, options: Options) => {
  const {
    title,
    content,
    ok,
    cancel,
    okText,
    cancelText,
    layout,
    closeOnClickOverlay,
    closeByEsc
  } = options
  const div = document.createElement('div')
  const transformOrigin = `${x.value}px ${y.value}px`
  document.body.appendChild(div)

  const app = createApp({
    render() {
      return h(
        _LewDialog,
        {
          closeOnClickOverlay,
          closeByEsc,
          type,
          layout,
          okText,
          cancelText,
          transformOrigin,
          ok: ok || (() => true),
          onClose: () => {
            app.unmount()
            div.remove()
          },
          cancel: cancel || (() => true)
        },
        {
          title: () => title,
          content: () => content
        }
      )
    }
  })

  app.mount(div)
}

export const LewDialog = {
  name: 'LewDialog',
  warning,
  info,
  normal,
  success,
  error
}

export type LewDialog = {
  name: string
  warning: (options: Options) => void
  info: (options: Options) => void
  normal: (options: Options) => void
  success: (options: Options) => void
  error: (options: Options) => void
}

export * from './props'
