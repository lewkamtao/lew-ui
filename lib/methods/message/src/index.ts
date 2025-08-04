import type {
  LewMessageInstance,
  LewMessageMethod,
  LewMessageOptions,
  LewMessageRequestErrorResult,
  LewMessageRequestOptions,
  LewMessageRequestResult,
  LewMessageType,
} from 'lew-ui/types'
import { getIconInnerHTML } from 'lew-ui/utils'
import { nextTick } from 'vue'
import '../styles/index.scss'

interface MessageInternalOptions {
  type: string
  e: LewMessageOptions
}

const LewMessage: LewMessageInstance = {
  name: 'LewMessage',
  timer: {} as Record<string, NodeJS.Timeout>,
  warning: undefined!,
  error: undefined!,
  info: undefined!,
  normal: undefined!,
  success: undefined!,
  loading: undefined!,
  close: undefined!,
  request: undefined!,
  message: undefined!,
}

function createMessageList() {
  const messageContainer = document.createElement('div')
  messageContainer.setAttribute('id', 'lew-message')
  document.body.appendChild(messageContainer)
}

function showMessage({ type, e }: MessageInternalOptions) {
  const { id, content, duration } = e

  const messageContainer: any = document.getElementById('lew-message')
  const hasMessageById = id
    ? document.getElementById(`lew-message-id-${id}`)
    : false
  const messageElement = hasMessageById || document.createElement('div')

  messageElement.innerHTML = `${getIconInnerHTML({ type, strokeWidth: type === 'loading' ? 2.5 : undefined, loading: type === 'loading' })}<div class="lew-message-content">${content || e}</div>`

  if (!hasMessageById) {
    if (id) {
      messageElement.setAttribute('id', `lew-message-id-${id}`)
    }
    messageContainer?.appendChild(
      messageElement,
      messageContainer?.childNodes[0],
    )
  }
  else {
    if (id) {
      clearTimeout(LewMessage.timer[id])
    }
  }

  messageElement.setAttribute(
    'class',
    `lew-message lew-message-${type} lew-message-id-${id || 'default'}`,
  )

  setTimeout(() => {
    nextTick(() => {
      messageElement.setAttribute(
        'class',
        `lew-message lew-message-${type} lew-message-show`,
      )
      const timerId = id || `auto-${Date.now()}-${Math.random()}`
      LewMessage.timer[timerId] = setTimeout(
        () => {
          messageElement.setAttribute(
            'class',
            `lew-message lew-message-${type} lew-message-hidden`,
          )
          setTimeout(() => {
            if (messageElement)
              messageContainer?.removeChild(messageElement)
          }, 250)
        },
        duration === 0 ? 31536000000 : duration || 3000,
      )
    })
  }, 10)
}
function removeClass(element: any, className: any) {
  element.classList.remove(className)
}
function addClass(element: any, className: any) {
  element.classList.add(className)
}

LewMessage.message = ({ type, e }: MessageInternalOptions) => {
  if (!document.getElementById('lew-message')) {
    createMessageList()
    LewMessage.message({ type, e })
  }
  else {
    showMessage({ type, e })
  }
}

LewMessage.close = ({ id }: { id: string }) => {
  const messageElement = document.getElementById(`lew-message-id-${id}`)

  if (messageElement) {
    removeClass(messageElement, 'lew-message-show')
    addClass(messageElement, 'lew-message-hidden')
    setTimeout(() => {
      clearTimeout(LewMessage.timer[id])
      messageElement.remove()
    }, 350)
  }
}

LewMessage.request = async (
  { loadingMessage }: LewMessageRequestOptions,
  asyncFn: () => Promise<LewMessageRequestResult>,
) => {
  try {
    LewMessage.loading({
      id: 'lew-request-loading',
      content: loadingMessage,
      duration: 0,
    })

    const startTime = new Date().getTime()

    asyncFn()
      .then(
        async ({
          content = '请求成功！',
          duration = 3000,
          type = 'success',
        }: LewMessageRequestResult) => {
          const endTime = new Date().getTime()
          const delay = 250
          if (endTime - startTime < delay) {
            await new Promise(resolve =>
              setTimeout(resolve, delay - (endTime - startTime)),
            )
          }
          LewMessage.close({ id: 'lew-request-loading' })
          const messageMethod = LewMessage[type as keyof typeof LewMessage] as LewMessageMethod
          if (typeof messageMethod === 'function') {
            messageMethod({
              content,
              duration,
            })
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
      onClose: () => {
      },
    })
  }
}

function createMessage(type: LewMessageType) {
  return (e: string | LewMessageOptions) => {
    const options = typeof e === 'string' ? { content: e } : e
    LewMessage.message({ type, e: options })
  }
}

const messageTypes: Record<LewMessageType, LewMessageMethod> = {
  warning: createMessage('warning'),
  error: createMessage('error'),
  info: createMessage('info'),
  normal: createMessage('normal'),
  success: createMessage('success'),
  loading: createMessage('loading'),
}

Object.assign(LewMessage, messageTypes)

export default LewMessage
