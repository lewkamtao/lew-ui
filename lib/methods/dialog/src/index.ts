import type { LewColor } from 'lew-ui'
import { useMouse } from '@vueuse/core'
import { locale } from 'lew-ui'
import _LewDialog from './LewDialog.vue'

const { x, y } = useMouse()

interface Options {
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

function createDialog(type: DialogType) {
  return (options: Options) =>
    dialog(type as LewColor, options)
}

const dialogTypes: Record<DialogType, (options: Options) => void> = {
  warning: createDialog('warning'),
  error: createDialog('error'),
  info: createDialog('info'),
  normal: createDialog('normal'),
  success: createDialog('success'),
}

function dialog(type: LewColor, options: Options) {
  const {
    title,
    content,
    ok = () => true,
    cancel = () => true,
    okText,
    cancelText,
    layout,
    closeOnClickOverlay,
    closeByEsc,
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
          cancel,
        },
        {
          title: () => title || locale.t('dialog.title'),
          content: () => content,
        },
      )
    },
  })

  app.mount(div)
}

export const LewDialog = {
  name: 'LewDialog',
  ...dialogTypes,
}

export type LewDialog = {
  name: string
} & Record<DialogType, (options: Options) => void>

export * from './props'
