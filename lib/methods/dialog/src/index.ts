import type { LewColor } from 'lew-ui'
import type { LewDialogInstance, LewDialogOptions, LewDialogType } from 'lew-ui/types'
import { useMouse } from '@vueuse/core'
import { locale } from 'lew-ui'
import _LewDialog from './LewDialog.vue'

const { x, y } = useMouse()

function createDialog(type: LewDialogType) {
  return (options: LewDialogOptions) =>
    dialog(type as LewColor, options)
}

const dialogTypes: Record<LewDialogType, (options: LewDialogOptions) => void> = {
  warning: createDialog('warning'),
  error: createDialog('error'),
  info: createDialog('info'),
  normal: createDialog('normal'),
  success: createDialog('success'),
}

function dialog(type: LewColor, options: LewDialogOptions) {
  const {
    title,
    content,
    ok = () => true,
    cancel = () => true,
    okText,
    cancelText,
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
