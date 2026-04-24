import type { LewComponentSource } from 'lew-ui'
import type { LewDialogPopokFooterButtonItem } from './components'

export interface LewDialogOptions {
  type?: LewDialogType
  icon?: LewComponentSource
  title?: LewComponentSource
  content?: LewComponentSource
  hideIcon?: boolean
  /** 自定义底部按钮列表；每项 `props` 透传 LewButton（`request` 处理异步）。Dialog 中 `request` 返回 `false` 可阻止关闭。不传则默认单个「确认」按钮。 */
  footerButtons?: LewDialogPopokFooterButtonItem[]
  closeOnClickOverlay?: boolean
  closeByEsc?: boolean
  /** 确认（`ok` 事件）：默认确认键或主操作在关闭前 */
  onOk?: () => void
  /** 关闭（`close` 事件）：可在此卸载/清理 */
  onClose?: () => void
}

export type LewDialogType = 'warning' | 'error' | 'info' | 'normal' | 'success'

export interface LewDialogMethod {
  (options: LewDialogOptions): void
}

export interface LewDialogInstance {
  name: string
  warning: LewDialogMethod
  error: LewDialogMethod
  info: LewDialogMethod
  normal: LewDialogMethod
  success: LewDialogMethod
}

export interface LewMessageOptions {
  id?: string
  content: string
  duration?: number
  onClose?: () => void
}

export interface LewMessageRequestOptions {
  loadingMessage: string
}

export interface LewMessageRequestResult {
  content?: string
  duration?: number
  type?: string
}

export interface LewMessageRequestErrorResult {
  content?: string
  duration?: number
}

export type LewMessageType = 'warning' | 'error' | 'info' | 'normal' | 'success' | 'loading'

export interface LewMessageMethod {
  (content: string | LewMessageOptions): void
}

export interface LewMessageCloseMethod {
  (options: { id: string }): void
}

export interface LewMessageRequestMethod {
  (
    options: LewMessageRequestOptions,
    asyncFn: () => Promise<LewMessageRequestResult>
  ): Promise<void>
}

export interface LewMessageInstance {
  name: string
  timer: Record<string, NodeJS.Timeout>
  warning: LewMessageMethod
  error: LewMessageMethod
  info: LewMessageMethod
  normal: LewMessageMethod
  success: LewMessageMethod
  loading: LewMessageMethod
  close: LewMessageCloseMethod
  request: LewMessageRequestMethod
  message: (options: { type: string, e: LewMessageOptions }) => void
  [key: string]: any // 添加索引签名以支持动态访问方法
}

export interface LewNotificationOptions {
  title: string
  content: string
  duration?: number
  showProgress?: boolean
  width?: number | string
}

export interface LewNotificationResult {
  close: () => void
}

export interface LewNotificationMethod {
  (options: LewNotificationOptions): LewNotificationResult
}

export type LewNotificationType = 'warning' | 'info' | 'normal' | 'success' | 'error'

export interface LewNotificationInstance {
  name: string
  warning: LewNotificationMethod
  info: LewNotificationMethod
  normal: LewNotificationMethod
  success: LewNotificationMethod
  error: LewNotificationMethod
}
