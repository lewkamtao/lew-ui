export const uploadEmits = {
  'change': (files: any[]) => files,
  'delete': (file: any) => file,
} as const

export const uploadByCardEmits = {
  'reUpload': (file: any) => file,
  'deleteFile': (file: any) => file,
} as const

export const uploadByListEmits = {
  'reUpload': (file: any) => file,
  'deleteFile': (file: any) => file,
} as const

export type LewUploadEmits = typeof uploadEmits
export type LewUploadByCardEmits = typeof uploadByCardEmits
export type LewUploadByListEmits = typeof uploadByListEmits
