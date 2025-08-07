import type { LewSize, LewUploadFileItem } from 'lew-ui/types'
import type { ExtractPropTypes, PropType } from 'vue'
import validators, { validSizeList } from 'lew-ui/validators'

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
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewUpload',
      propName: 'size',
      values: validSizeList,
    }),
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
    type: Function as PropType<() => Promise<LewUploadFileItem[]>>,
    default: undefined,
    description: '自定义文件上传处理函数',
    validator: (value: any) => {
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
  beforeDelete: {
    type: Function as PropType<(fileItem: LewUploadFileItem) => Promise<boolean>>,
    default: undefined,
    description: '删除文件前的回调函数，返回 Promise<boolean> 或 boolean，true 表示继续删除',
    validator: (value: any) => {
      if (value !== undefined && typeof value !== 'function') {
        console.warn('[LewUpload] beforeDelete 必须是一个函数')
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
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewUpload',
      propName: 'size',
      values: validSizeList,
    }),
  },
}

export const uploadByCardProps = {
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    typeValues: validSizeList,
    validator: validators.enum({
      componentName: 'LewUpload',
      propName: 'size',
      values: validSizeList,
    }),
  },
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
