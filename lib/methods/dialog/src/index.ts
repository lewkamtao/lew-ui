import type { LewDialogInstance, LewDialogOptions, LewDialogType } from 'lew-ui/types'
import { useMouse } from '@vueuse/core'
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
    icon,
    hideIcon,
    footerButtons,
    closeOnClickOverlay = false,
    closeByEsc = false,
    onOk,
    onClose: onCloseUser,
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
          hideIcon,
          transformOrigin,
          icon,
          title,
          content,
          footerButtons,
          onOk: () => {
            onOk?.()
          },
          onClose: () => {
            onCloseUser?.()
            app.unmount()
            div.remove()
          },
        },
        {
          default: () => [],
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
