import type {
  LewNotificationInstance,
  LewNotificationMethod,
  LewNotificationOptions,
  LewNotificationResult,
} from 'lew-ui/types'
import { h, render } from 'vue'
import NotificationContainer from './components/NotificationContainer.vue'

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

function createNotification(type: string): LewNotificationMethod {
  return ({
    title,
    content,
    duration = 3000,
    showProgress = false,
    width = 320,
  }: LewNotificationOptions): LewNotificationResult => {
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

export const LewNotification: LewNotificationInstance = {
  name: 'LewNotification',
  warning: createNotification('warning'),
  info: createNotification('info'),
  normal: createNotification('normal'),
  success: createNotification('success'),
  error: createNotification('error'),
}
