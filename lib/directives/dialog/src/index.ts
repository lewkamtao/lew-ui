import { useMouse } from '@vueuse/core'
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

const dialogTypes: Record<DialogType, (options: Options) => void> = {
  warning: createDialog('warning'),
  error: createDialog('error'),
  info: createDialog('info'),
  normal: createDialog('normal'),
  success: createDialog('success')
}

const dialog = (type: LewColor, options: Options) => {
  const {
    title,
    content,
    ok = () => true,
    cancel = () => true,
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
          ok,
          onClose: () => {
            app.unmount()
            div.remove()
          },
          cancel
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
  ...dialogTypes
}

export type LewDialog = {
  name: string
} & Record<DialogType, (options: Options) => void>

export * from './props'
