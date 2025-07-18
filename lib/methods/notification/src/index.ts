import { h, render } from 'vue'
import NotificationContainer from './components/NotificationContainer.vue'

export interface NotificationParamsTyped {
  title: string
  content: string
  duration?: number
  showProgress?: boolean
  width?: number | string
}

export type NotificationFn = (options: NotificationParamsTyped) => {
  close: () => void
}

export interface NotificationInstance {
  name: string
  warning: NotificationFn
  info: NotificationFn
  normal: NotificationFn
  success: NotificationFn
  error: NotificationFn
}

let containerInstance: any = null

function createContainer() {
  if (!containerInstance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const vnode = h(NotificationContainer)
    render(vnode, container)
    containerInstance = vnode.component?.exposed
  }
  return containerInstance
}

function createNotification(type: string) {
  return ({
    title,
    content,
    duration = 3000,
    showProgress = false,
    width = 320,
  }: NotificationParamsTyped) => {
    const container = createContainer()
    const id = container?.add(
      type,
      title,
      content,
      duration,
      showProgress,
      width,
    )
    return {
      close: () => {
        container?.handleClose(id)
      },
    }
  }
}

export const LewNotification = {
  name: 'LewNotification',
  warning: createNotification('warning'),
  info: createNotification('info'),
  normal: createNotification('normal'),
  success: createNotification('success'),
  error: createNotification('error'),
}

export interface LewNotification {
  name: string
  warning: NotificationFn
  info: NotificationFn
  normal: NotificationFn
  success: NotificationFn
  error: NotificationFn
}
