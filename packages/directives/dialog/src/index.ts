import _LewDialog from './LewDialog.vue'

interface Options {
  title: string
  content: string
  ok: Function
  cancel: Function
  layout: string
  okText: string
  cancelText: string
  closeOnClickOverlay?: boolean
}

function warning(options: Options) {
  dialog('warning', options)
}

function error(options: Options) {
  dialog('error', options)
}

function info(options: Options) {
  dialog('info', options)
}

function normal(options: Options) {
  dialog('normal', options)
}

function success(options: Options) {
  dialog('success', options)
}

function dialog(type: string, options: Options) {
  const {
    title,
    content,
    ok,
    cancel,
    okText,
    cancelText,
    layout,
    closeOnClickOverlay,
  } = options
  const div: HTMLDivElement = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp({
    render() {
      return h(
        _LewDialog,
        {
          closeOnClickOverlay,
          type,
          layout,
          okText,
          cancelText,
          ok:
                        ok
                        || (() => {
                          return true
                        }),
          onClose: () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            app.unmount(div)
            div.remove()
          },
          cancel:
                        cancel
                        || (() => {
                          return true
                        }),
        },
        {
          title: () => title,
          content: () => content,
        },
      )
    },
  })
  app.mount(div)
}

export default {
  name: 'LewDialog',
  warning,
  info,
  normal,
  success,
  error,
}
