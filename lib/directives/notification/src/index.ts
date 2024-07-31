import '../styles/index.scss'
import { useTimeoutFn } from '@vueuse/core'
import { getStatusIcon } from 'lew-ui/utils'

export type NotificationParamsTyped = {
  title: string
  content: string
  delay?: number
}

export type NotificationFn = (options: NotificationParamsTyped) => void

export interface NotificationInstance {
  name: string
  warning: NotificationFn
  info: NotificationFn
  normal: NotificationFn
  success: NotificationFn
  error: NotificationFn
}

const warning = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
  notification('warning', title, content, delay)
}

const error = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
  notification('error', title, content, delay)
}

const info = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
  notification('info', title, content, delay)
}

const normal = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
  notification('normal', title, content, delay)
}

const success = ({ title, content, delay = 3000 }: NotificationParamsTyped) => {
  notification('success', title, content, delay)
}

const createMessageList = () => {
  const div: HTMLDivElement = document.createElement('div')
  div.setAttribute('id', 'lew-notification')
  document.body.appendChild(div)
}

const notification = (type: string, title: string, content: string, delay: number) => {
  if (!document.getElementById('lew-notification')) {
    createMessageList()
    notification(type, title, content, delay)
  } else {
    add(type, title, content, delay)
  }
}

const add = (type: string, title: string, content: string, delay: number) => {
  const LewMessageDom = document.getElementById('lew-notification')
  const newMessage = document.createElement('div')
  newMessage.innerHTML = `
                <div class="lew-notification-box"> 
                    <div class="lew-notification-icon">
                      ${getStatusIcon(type)}
                    </div>
                    <div class="lew-notification-body">
                      <div class="lew-notification-title">${title}</div>
                     	 ${content ? `<div class="lew-notification-content">${content}</div>` : ''}
                    </div> 
                    <div class="lew-notification-close-icon">
						${getStatusIcon('close')}
                    </div>
                </div>
    `
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LewMessageDom?.insertBefore(newMessage, LewMessageDom?.childNodes[0])

  newMessage.setAttribute('class', `lew-notification lew-notification-${type}`)

  let timer: (() => void) | undefined
  let lock = false // 加上锁 避免 点击关闭和鼠标移出事件重叠 bug

  function startTimer() {
    if (delay > 0) {
      ;({ stop: timer } = useTimeoutFn(() => {
        handleClose()
      }, delay))
    }
  }

  function clearTimer() {
    timer?.()
  }

  function handleClose() {
    if (lock) {
      return
    }
    lock = true

    newMessage.setAttribute(
      'class',
      `lew-notification lew-notification-${type} lew-notification-hidden`
    )
    if (newMessage) {
      if (LewMessageDom) {
        setTimeout(() => {
          LewMessageDom.removeChild(newMessage)
        }, 250)
      }
    }
  }

  newMessage.children[0].children[2].addEventListener('click', handleClose)
  newMessage.addEventListener('mouseenter', clearTimer)
  newMessage.addEventListener('mouseleave', startTimer)

  setTimeout(() => {
    lock = false
    newMessage.setAttribute('class', `lew-notification lew-notification-${type} lew-notificatishow`)
    delay > 0 && startTimer()
  }, 10)
}

export const LewNotification = {
  name: 'LewNotification',
  warning,
  info,
  normal,
  success,
  error
}

export type LewNotification = {
  name: string
  warning: NotificationFn
  info: NotificationFn
  normal: NotificationFn
  success: NotificationFn
  error: NotificationFn
}
