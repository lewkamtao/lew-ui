import type { ExtractPropTypes } from 'vue'
import type { LewSize } from 'lew-ui'
import { validSizes } from 'lew-ui/constants'
export type UploadStatus =
  | 'success'
  | 'fail'
  | 'uploading'
  | 'complete'
  | 'wrong_type'
  | 'wrong_size'
  | 'pending'

export type UploadFileItem = {
  key: string
  name?: string
  url?: string
  status?: UploadStatus
  percent?: number
  file?: File
  size?: number
  type?: string
  lastModifiedDate?: string
  lastModified?: number
}

export const uploadProps = {
  accept: {
    type: String,
    default: '',
    description: '允许上传的文件类型',
  },
  immediate: {
    type: Boolean,
    default: true,
    description: '是否在选择文件后立即上传，为false时仅保存文件信息不上传',
  },
  multiple: {
    type: Boolean,
    default: false,
    description: '是否允许多文件上传',
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用上传功能',
  },
  readonly: {
    type: Boolean,
    default: false,
    description: '是否为只读模式',
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
    },
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
    },
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
    },
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
    },
  },
  uploadHelper: {
    type: Function,
    default: undefined,
    description: '自定义文件上传处理函数',
    validator: (value: Function) => {
      if (typeof value !== 'function') {
        console.warn('[LewUpload] uploadHelper 必须是一个函数')
        return false
      }
      return true
    },
  },
  uploadHelperId: {
    type: String,
    default: '',
    hidden: true,
    description: '上传函数的标识',
  },
  viewMode: {
    type: String,
    default: 'list',
    description: '列表类型',
    validator: (value: string) => {
      if (!['list', 'card'].includes(value)) {
        console.warn('[LewUpload] viewMode 必须是 list 或 card')
        return false
      }
      return true
    },
  },
}

export const uploadByListProps = {
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
    },
  },
}

export const uploadByCardProps = {
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
    },
  },
}

export const statusConfig: Record<
  UploadStatus,
  { text: string; color: string }
> = {
  pending: { text: '待上传', color: 'gray' },
  success: { text: '上传成功', color: 'green' },
  fail: { text: '上传失败', color: 'red' },
  uploading: { text: '上传中', color: 'blue' },
  complete: { text: '已上传', color: 'gray' },
  wrong_type: { text: '非法格式', color: 'red' },
  wrong_size: { text: '文件大小超出限制', color: 'red' },
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
