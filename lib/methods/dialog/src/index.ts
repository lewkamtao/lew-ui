import type { LewDialogInstance, LewDialogOptions, LewDialogType } from 'lew-ui/types'
import { useMouse } from '@vueuse/core'
import { createApp, h } from 'vue'
import _LewDialog from './LewDialog.vue'

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

let mousePosition: ReturnType<typeof useMouse> | null = null

function getTransformOrigin(): string {
  if (typeof window === 'undefined')
    return 'center center'
  // 首次打开 Dialog 时再订阅指针，避免 import 即产生副作用
  mousePosition ??= useMouse()
  return `${mousePosition.x.value}px ${mousePosition.y.value}px`
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
  const transformOrigin = getTransformOrigin()
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
