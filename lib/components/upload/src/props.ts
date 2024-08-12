import type { ExtractPropTypes } from 'vue'
import type { FormSize } from 'lew-ui'
export type UploadStatus =
  | 'success'
  | 'fail'
  | 'uploading'
  | 'pending'
  | 'complete'
  | 'wrong_type'
  | 'wrong_size'

export type UploadFileItem = {
  id: string
  name?: string
  url?: string
  status?: UploadStatus
  percent?: number
  file?: File
  size?: number
  type?: string
  lastModifiedDate?: any
  lastModified?: any
}

export const uploadProps = {
  size: {
    type: String as PropType<FormSize>,
    default: 'medium',
    description: '尺寸'
  },
  accept: {
    type: String,
    default: '',
    description: '接受上传的文件类型'
  },
  maxFileSize: {
    type: Number,
    default: 1024 * 1024 * 10,
    description: '最大上传文件大小'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否只读'
  },
  tips: {
    type: String,
    default: '',
    description: '是否只读'
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '是否多选'
  },
  limit: {
    type: Number,
    default: 1,
    description: '最大上传数量'
  },
  listType: {
    type: String,
    default: 'list', // list card
    description: '列表类型'
  },
  uploadHelper: {
    type: Function || undefined,
    default: `(fileItem,setFileItem) => void`,
    description: '上传文件的处理方法'
  }
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
