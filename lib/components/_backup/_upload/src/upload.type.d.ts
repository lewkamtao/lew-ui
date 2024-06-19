export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadRawFile extends File {
  uid: number
}

export interface UploadFile {
  name: string
  percent: number
  status: UploadStatus
  size: number
  response?: any
  url: string
  uid: number
  raw: UploadRawFile
}

export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, string | Blob | [string | Blob, string]>
  name: string
  file: File
  headers: Headers | Record<string, string | number | null | undefined>
  onProgress: (event: ProgressEvent) => void
  onSuccess: (response: unknown) => void
  onFail: (error: Error) => void
}

export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadProps {
  fileList: UploadFile[]
  accept: string
  multiple: boolean
  name: string
  action: string
  method: 'post' | 'get' | 'POST' | 'GET'
  listType: 'text' | 'picture' | 'picture-card'
  headers: Headers | Record<string, string>
  data: Record<string, any>
  showFileList: boolean
  disabled: boolean
  drag: boolean
  autoUpload: boolean
  httpRequest: (options: UploadRequestOptions) => void
  onBeforeUpload: (file: UploadFile) => boolean | Promise<boolean>
  onChange: (file: UploadFile, fileList: UploadFile[]) => void
  onProgress: (event: ProgressEvent, file: UploadFile, fileList: UploadFile[]) => void
  onSuccess: (response: any, file: UploadFile, fileList: UploadFile[]) => void
  onFail: (error: Error, file: UploadFile, fileList: UploadFile[]) => void
  onRemove: (file: UploadFile, fileList: UploadFile[]) => void
  onPreview: (file: UploadFile) => void
}

export interface RenderIconOptions {
  isRender: boolean
  type: string
  size: number
  file?: UploadFile
  click?: (file: UploadFile) => void
}
