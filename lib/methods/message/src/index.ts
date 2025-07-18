import { getIconInnerHTML } from 'lew-ui/utils'
import '../styles/index.scss'

interface MessageFnOptions {
  id: string
  content: string
  duration: number
  onClose: Function
}

interface MessageOptions {
  type: string
  e: MessageFnOptions
}

function createMessageList() {
  const messageContainer = document.createElement('div')
  messageContainer.setAttribute('id', 'lew-message')
  document.body.appendChild(messageContainer)
}

function showMessage({ type, e }: MessageOptions) {
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
    clearTimeout(LewMessage.timer[id])
  }

  messageElement.setAttribute(
    'class',
    `lew-message lew-message-${type} lew-message-id-${id}`,
  )

  setTimeout(() => {
    nextTick(() => {
      messageElement.setAttribute(
        'class',
        `lew-message lew-message-${type} lew-message-show`,
      )
      LewMessage.timer[id] = setTimeout(
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

const LewMessage: any = {
  name: 'LewMessage',

  message: ({ type, e }: MessageOptions) => {
    if (!document.getElementById('lew-message')) {
      createMessageList()
      LewMessage.message({ type, e })
    }
    else {
      showMessage({ type, e })
    }
  },

  close: ({ id }: { id: string }) => {
    const messageElement = document.getElementById(`lew-message-id-${id}`)

    if (messageElement) {
      removeClass(messageElement, 'lew-message-show')
      addClass(messageElement, 'lew-message-hidden')
      setTimeout(() => {
        clearTimeout(LewMessage.timer[id])
        messageElement.remove()
      }, 350)
    }
  },

  request: async (
    { loadingMessage }: { loadingMessage: string },
    asyncFn: Function,
  ) => {
    try {
      // 显示loading消息
      LewMessage.loading({
        id: 'lew-request-loading',
        content: loadingMessage,
        duration: 0,
      })

      const startTime = new Date().getTime()

      // 执行异步方法
      asyncFn()
        .then(
          async ({
            content = '请求成功！',
            duration = 3000,
            type = 'success',
          }: {
            content: string
            duration: number
            type?: string
          }) => {
            // 最小延迟 250ms 保持动画流畅
            const endTime = new Date().getTime()
            const delay = 250
            if (endTime - startTime < delay) {
              await new Promise(resolve =>
                setTimeout(resolve, delay - (endTime - startTime)),
              )
            }
            LewMessage.close({ id: 'lew-request-loading' })
            // 显示success消息
            LewMessage[type]({
              content,
              duration,
            })
          },
        )
        .catch(
          ({
            content = '加载失败！',
            duration = 3000,
          }: {
            content: string
            duration: number
          }) => {
            // 隐藏loading消息
            LewMessage.close({ id: 'lew-request-loading' })
            // 显示success消息
            LewMessage.error({
              id: 'lew-request-fail',
              content,
              duration,
            })
          },
        )
    }
    catch (error) {
      // 处理异步方法执行出错的情况
      LewMessage.error({
        id: 'lew-request-loading',
        content: 'An error occurred',
        duration: 3000,
        onClose: () => {
          // 可以选择性地处理错误消息关闭时的逻辑
        },
      })
    }
  },

  timer: {} as any,
}

LewMessage.warning = (e: MessageFnOptions) =>
  LewMessage.message({ type: 'warning', e })
LewMessage.error = (e: MessageFnOptions) =>
  LewMessage.message({ type: 'error', e })
LewMessage.info = (e: MessageFnOptions) =>
  LewMessage.message({ type: 'info', e })
LewMessage.normal = (e: MessageFnOptions) =>
  LewMessage.message({ type: 'normal', e })
LewMessage.success = (e: MessageFnOptions) =>
  LewMessage.message({ type: 'success', e })
LewMessage.loading = (e: MessageFnOptions) =>
  LewMessage.message({ type: 'loading', e })

export default LewMessage
