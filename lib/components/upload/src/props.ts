import type { ExtractPropTypes } from 'vue'

export type UploadStatus = 'success' | 'fail' | 'uploading' | 'pending'

export type FileItem = {
  id: string
  name: string
  url?: string
  status: UploadStatus
  percent: number
  file: File
  size: number
  response?: any
}
export const uploadProps = {
  'default-file-list': {
    type: Array as PropType<FileItem[]>,
    default: () => [],
    description: '默认文件列表'
  },
  size: {
    type: String,
    default: 'medium',
    description: '尺寸'
  },
  accept: {
    type: String,
    default: '',
    description: '接受上传的文件类型'
  },
  limit: {
    type: Number,
    default: 0,
    description: '最大上传数量'
  },
  'list-type': {
    type: String,
    default: 'list', // list card
    description: '列表类型'
  },
  uploadHandle: {
    type: Function,
    default: () => {},
    description: '上传文件的处理函数'
  }
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
