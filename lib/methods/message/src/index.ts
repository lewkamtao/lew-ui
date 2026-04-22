import type {
  LewMessageInstance,
  LewMessageMethod,
  LewMessageOptions,
  LewMessageRequestErrorResult,
  LewMessageRequestOptions,
  LewMessageRequestResult,
  LewMessageType,
} from 'lew-ui/types'
import { h, render } from 'vue'
import MessageContainer from './MessageContainer.vue'

interface MessageContainerExposed {
  add: (
    type: string,
    content: string,
    duration: number,
    customId?: string,
  ) => string
  remove: (id: string) => void
  closeByCustomId: (customId: string) => void
}

let containerInstance: MessageContainerExposed | null = null
let containerElement: HTMLDivElement | null = null

function getContainer(): MessageContainerExposed | null {
  if (!containerInstance) {
    containerElement = document.createElement('div')
    containerElement.setAttribute('data-lew-message-root', '')
    document.body.appendChild(containerElement)

    const vnode = h(MessageContainer)
    render(vnode, containerElement)
    containerInstance = vnode.component?.exposed as MessageContainerExposed
  }
  return containerInstance
}

export function destroyMessageContainer(): void {
  if (containerElement) {
    render(null, containerElement)
    containerElement.remove()
    containerElement = null
    containerInstance = null
  }
}

function createMessage(type: LewMessageType): LewMessageMethod {
  return (e: string | LewMessageOptions) => {
    const options = typeof e === 'string' ? { content: e } : e
    const { content, duration = 3000, id } = options

    const container = getContainer()
    if (!container) {
      console.warn('[LewMessage] Failed to create message container')
      return
    }

    container.add(type, content || '', duration, id)
  }
}

const LewMessage: LewMessageInstance = {
  name: 'LewMessage',
  timer: {} as Record<string, NodeJS.Timeout>,

  warning: createMessage('warning'),
  error: createMessage('error'),
  info: createMessage('info'),
  normal: createMessage('normal'),
  success: createMessage('success'),
  loading: createMessage('loading'),

  close: ({ id }: { id: string }) => {
    const container = getContainer()
    if (container) {
      container.closeByCustomId(id)
    }
  },

  request: async (
    { loadingMessage }: LewMessageRequestOptions,
    asyncFn: () => Promise<LewMessageRequestResult>,
  ) => {
    try {
      LewMessage.loading({
        id: 'lew-request-loading',
        content: loadingMessage,
        duration: 0,
      })

      const startTime = Date.now()

      asyncFn()
        .then(
          async ({
            content = '请求成功！',
            duration = 3000,
            type = 'success',
          }: LewMessageRequestResult) => {
            const endTime = Date.now()
            const delay = 250
            if (endTime - startTime < delay) {
              await new Promise(resolve =>
                setTimeout(resolve, delay - (endTime - startTime)),
              )
            }
            LewMessage.close({ id: 'lew-request-loading' })
            const messageMethod = LewMessage[type as keyof typeof LewMessage] as LewMessageMethod
            if (typeof messageMethod === 'function') {
              messageMethod({ content, duration })
            }
          },
        )
        .catch(
          ({
            content = '加载失败！',
            duration = 3000,
          }: LewMessageRequestErrorResult) => {
            LewMessage.close({ id: 'lew-request-loading' })
            LewMessage.error({
              id: 'lew-request-fail',
              content,
              duration,
            })
          },
        )
    }
    catch (err) {
      console.error('Request error:', err)
      LewMessage.error({
        id: 'lew-request-loading',
        content: 'An error occurred',
        duration: 3000,
      })
    }
  },

  message: ({ type, e }: { type: string; e: LewMessageOptions }) => {
    const container = getContainer()
    if (!container) {
      console.warn('[LewMessage] Failed to create message container')
      return
    }
    const { content, duration = 3000, id } = e
    container.add(type, content || '', duration, id)
  },
}

export default LewMessage
