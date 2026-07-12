import type {
  LewDialogInstance,
  LewMessageInstance,
  LewNotificationInstance,
} from './methods'

declare module 'vue' {
  interface ComponentCustomProperties {
    LewMessage: LewMessageInstance
    LewDialog: LewDialogInstance
    LewNotification: LewNotificationInstance
  }
}

export {}
