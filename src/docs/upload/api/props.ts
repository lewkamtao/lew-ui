export default {
  title: 'Props',
  columnsKey: 'props',
  data: [
    {
      name: 'file-list / v-model:file-list',
      description: '默认上传文件',
      type: 'UploadFile[]',
      default: '[]',
    },
    {
      name: 'accept',
      description: '接受上传的文件类型',
      type: 'string',
      default: '\'-\'',
    },
    {
      name: 'multiple',
      description: '是否支持多选上传',
      type: 'boolean',
      default: 'false',
    },
    {
      name: 'name',
      description: '上传的文件字段名',
      type: 'string',
      default: '"file"',
    },
    {
      name: 'action',
      description: '请求URL',
      type: 'string',
      default: '-',
    },
    {
      name: 'method',
      description: '设置上传请求方法',
      type: 'string',
      default: '"post"',
    },
    {
      name: 'headers',
      description: '上传的请求头部',
      type: 'Headers | Record<string, any>',
      default: '-',
    },
    {
      name: 'data',
      description: '上传时附带的额外参数',
      type: 'string',
      default: '-',
    },
    {
      name: 'show-file-ist',
      description: '是否显示已上传文件列表',
      type: 'boolean',
      default: 'true',
    },
    {
      name: 'drag',
      description: '是否启用拖拽上传',
      type: 'boolean',
      default: 'false',
    },
    {
      name: 'disabled',
      description: '是否禁用',
      type: 'boolean',
      default: 'false',
    },
    {
      name: 'list-type',
      description: '请求URL',
      type: '\'text\' | \'picture\' | \'picture-card\'',
      default: '-',
    },
    {
      name: 'auto-upload',
      description: '是否自动上传',
      type: 'boolean',
      default: 'true',
    },
    {
      name: 'http-request',
      description: '覆盖默认的上传行为，自定义上传文件的请求',
      type: '(options: UploadRequestOptions) => void',
      default: '-',
    },
    {
      name: 'on-before-upload',
      description:
                '文件上传前钩子，若返回 false 或者返回 Promise 且被 reject，则停止上传。',
      type: '(file: UploadFile) => boolean | Promise<boolean>',
      default: '-',
    },
    {
      name: 'on-change',
      description:
                '文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用',
      type: '(file: UploadFile, fileList: UploadFile[]) => void',
      default: '-',
    },
    {
      name: 'on-progress',
      description: '文件上传进度的钩子',
      type: '(event: ProgressEvent, file: UploadFile, fileList: UploadFile[]) => void',
      default: '-',
    },
    {
      name: 'on-success',
      description: '文件上传成功时的钩子',
      type: '(response: any, file: UploadFile, fileList: UploadFile[]) => void',
      default: '-',
    },
    {
      name: 'on-fail',
      description: '文件上传失败时的钩子',
      type: '(error: Error, file: UploadFile, fileList: UploadFile[]) => void',
      default: '-',
    },
    {
      name: 'on-remove',
      description: '文件从文件列表移除时的钩子',
      type: '(file: UploadFile, fileList: UploadFile[]) => void',
      default: '-',
    },
    {
      name: 'on-preview',
      description: '预览文件列表中已上传的文件时的钩子',
      type: '(file: UploadFile) => void',
      default: '-',
    },
  ],
}
