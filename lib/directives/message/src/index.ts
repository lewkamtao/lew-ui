import { getStatusIcon } from 'lew-ui/utils'
import '../styles/index.scss'
import { t } from 'vitest/dist/index-4a906fa4'

type MessageFnOptions = {
  id: string
  content: string
  duration: number
  onClose: Function
}

type MessageOptions = {
  type: string
  e: MessageFnOptions
}

const createMessageList = () => {
  const messageContainer = document.createElement('div')
  messageContainer.setAttribute('id', 'lew-message')
  document.body.appendChild(messageContainer)
}

const showMessage = ({ type, e }: MessageOptions) => {
  const messageContainer: any = document.getElementById('lew-message')
  const hasMessageById = e.id ? document.getElementById(`message-id-${e.id}`) : false
  const messageElement = hasMessageById || document.createElement('div')
  messageElement.innerHTML = `${getStatusIcon(type)}<div class="content">${e.content || e}</div>`

  if (!hasMessageById) {
    if (e.id) {
      messageElement.setAttribute('id', `message-id-${e.id}`)
    }
    messageContainer?.appendChild(messageElement, messageContainer?.childNodes[0])
  } else {
    clearTimeout(LewMessage.timer[e.id])
  }

  messageElement.setAttribute('class', `message message-${type} message-id-${e.id}`)

  setTimeout(() => {
    messageElement.setAttribute('class', `message message-${type} message-show`)
    LewMessage.timer[e.id] = setTimeout(() => {
      messageElement.setAttribute('class', `message message-${type} message-hidden`)
      setTimeout(() => {
        if (messageElement) messageContainer?.removeChild(messageElement)
      }, 350)
    }, e.duration || 3000)
  }, 10)
}
const removeClass = (element: any, className: any) => {
  element.classList.remove(className)
}
const addClass = (element: any, className: any) => {
  element.classList.add(className)
}

const LewMessage: any = {
  name: 'LewMessage',

  message: ({ type, e }: MessageOptions) => {
    if (!document.getElementById('lew-message')) {
      createMessageList()
      LewMessage.message({ type, e })
    } else {
      showMessage({ type, e })
    }
  },

  close: ({ id }: { id: string }) => {
    const messageElement = document.getElementById(`message-id-${id}`)

    if (messageElement) {
      removeClass(messageElement, 'message-show')
      addClass(messageElement, 'message-hidden')
      setTimeout(() => {
        clearTimeout(LewMessage.timer[id])
        messageElement.remove()
      }, 350)
    }
  },

  request: async ({ loadingMessage }: { loadingMessage: string }, asyncFn: Function) => {
    try {
      // 显示loading消息
      LewMessage.loading({
        id: 'request-loading',
        content: loadingMessage,
        duration: 0
      })

      // 执行异步方法
      asyncFn()
        .then(
          ({
            content = '请求成功！',
            duration = 3000,
            type = 'success'
          }: {
            content: string
            duration: number
            type?: string
          }) => {
            // 隐藏loading消息
            LewMessage.close({ id: 'request-loading' })

            // 显示success消息
            LewMessage[type]({
              content,
              duration
            })
          }
        )
        .catch(
          ({ content = '加载失败！', duration = 3000 }: { content: string; duration: number }) => {
            // 隐藏loading消息
            LewMessage.close({ id: 'request-loading' })
            // 显示success消息
            LewMessage.error({
              id: 'request-fail',
              content,
              duration
            })
          }
        )
    } catch (error) {
      // 处理异步方法执行出错的情况
      LewMessage.error({
        id: 'request-loading',
        content: 'An error occurred',
        duration: 3000,
        onClose: () => {
          // 可以选择性地处理错误消息关闭时的逻辑
        }
      })
    }
  },

  timer: {} as any
}

LewMessage.warning = (e: MessageFnOptions) => LewMessage.message({ type: 'warning', e })
LewMessage.error = (e: MessageFnOptions) => LewMessage.message({ type: 'error', e })
LewMessage.info = (e: MessageFnOptions) => LewMessage.message({ type: 'info', e })
LewMessage.normal = (e: MessageFnOptions) => LewMessage.message({ type: 'normal', e })
LewMessage.success = (e: MessageFnOptions) => LewMessage.message({ type: 'success', e })
LewMessage.loading = (e: MessageFnOptions) => LewMessage.message({ type: 'loading', e })

export default LewMessage
