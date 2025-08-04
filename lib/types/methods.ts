export interface LewDialogOptions {
  title: string
  content: string
  ok?: () => Promise<boolean>
  cancel?: () => Promise<boolean>
  okText?: string
  cancelText?: string
  closeOnClickOverlay?: boolean
  closeByEsc?: boolean
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
