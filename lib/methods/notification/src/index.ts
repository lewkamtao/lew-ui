import type {
  LewNotificationInstance,
  LewNotificationMethod,
  LewNotificationOptions,
  LewNotificationResult,
  LewNotificationType,
} from 'lew-ui/types'
import { h, render } from 'vue'
import NotificationContainer from './NotificationContainer.vue'

// 容器实例接口定义
interface NotificationContainerExposed {
  add: (
    type: string,
    title: string,
    content: string,
    duration: number,
    showProgress: boolean,
    width: number | string,
  ) => string
  handleClose: (id: string) => void
}

// 使用 WeakRef 或可清理的引用
let containerInstance: NotificationContainerExposed | null = null
let containerElement: HTMLDivElement | null = null

/**
 * 创建或获取通知容器
 */
function getContainer(): NotificationContainerExposed | null {
  if (!containerInstance) {
    containerElement = document.createElement('div')
    containerElement.setAttribute('data-lew-notification-root', '')
    document.body.appendChild(containerElement)

    const vnode = h(NotificationContainer)
    render(vnode, containerElement)
    containerInstance = vnode.component?.exposed as NotificationContainerExposed
  }
  return containerInstance
}

/**
 * 销毁通知容器（用于清理）
 */
export function destroyNotificationContainer(): void {
  if (containerElement) {
    render(null, containerElement)
    containerElement.remove()
    containerElement = null
    containerInstance = null
  }
}

/**
 * 创建指定类型的通知方法
 */
function createNotification(type: LewNotificationType): LewNotificationMethod {
  return (options: LewNotificationOptions): LewNotificationResult => {
    const {
      title,
      content,
      duration = 3000,
      showProgress = false,
      width = 320,
    } = options

    const container = getContainer()

    if (!container) {
      console.warn('[LewNotification] Failed to create notification container')
      return { close: () => {} }
    }

    const id = container.add(
      type,
      title,
      content,
      duration,
      showProgress,
      width,
    )

    return {
      close: () => {
        container.handleClose(id)
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
