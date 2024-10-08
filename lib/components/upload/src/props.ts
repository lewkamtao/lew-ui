import type { ExtractPropTypes } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'
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
  lastModifiedDate?: Date
  lastModified?: number
}

export const uploadProps = {
  accept: {
    type: String,
    default: '',
    description: '允许上传的文件类型'
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '是否允许多文件上传'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用上传功能'
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否为只读模式'
  },
  limit: {
    type: Number,
    default: 1,
    description: '最大上传文件数量',
    validator: (value: number) => {
      if (value < 1) {
        console.warn('[LewUpload] limit 必须大于等于 1')
        return false
      }
      return true
    }
  },
  maxFileSize: {
    type: Number,
    default: 1024 * 1024 * 10,
    description: '单个文件的最大尺寸（字节）',
    validator: (value: number) => {
      if (value <= 0) {
        console.warn('[LewUpload] maxFileSize 必须大于 0')
        return false
      }
      return true
    }
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '上传组件的尺寸',
    validator: (value: LewSize) => {
      if (!validSizes.includes(value)) {
        console.warn('[LewUpload] size 必须是 small、medium 或 large')
        return false
      }
      return true
    }
  },
  tips: {
    type: String,
    default: '',
    description: '自定义提示信息',
    validator: (value: string) => {
      if (value.length > 100) {
        console.warn('[LewUpload] tips 长度不应超过 100 个字符')
        return false
      }
      return true
    }
  },
  uploadHelper: {
    type: Function,
    default: () => Promise.resolve(),
    description: '自定义文件上传处理函数',
    validator: (value: Function) => {
      if (typeof value !== 'function') {
        console.warn('[LewUpload] uploadHelper 必须是一个函数')
        return false
      }
      return true
    }
  }
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
