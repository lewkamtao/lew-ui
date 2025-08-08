import type { LewDialogInstance, LewDialogOptions, LewDialogType } from 'lew-ui/types'
import { useMouse } from '@vueuse/core'
import { locale } from 'lew-ui'
import { createApp, h } from 'vue'
import _LewDialog from './LewDialog.vue'

const { x, y } = useMouse()

function createDialog(type: LewDialogType) {
  return (options: LewDialogOptions) => dialog(type, options)
}

const dialogTypes: Record<LewDialogType, (options: LewDialogOptions) => void> = {
  warning: createDialog('warning'),
  error: createDialog('error'),
  info: createDialog('info'),
  normal: createDialog('normal'),
  success: createDialog('success'),
}

function dialog(type: LewDialogType, options: LewDialogOptions) {
  const {
    title,
    content,
    ok = () => Promise.resolve(true),
    cancel = () => Promise.resolve(true),
    okText,
    cancelText,
    closeOnClickOverlay = false,
    closeByEsc = false,
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

export const LewDialog: LewDialogInstance = {
  name: 'LewDialog',
  ...dialogTypes,
}

export * from './props'
