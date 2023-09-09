import type { PropType } from 'vue';
import type { UploadProps } from './upload.type';
import { http } from './http';

const uploadProps = {
    /**
     * 默认上传文件
     */
    fileList: {
        type: Array as PropType<UploadProps['fileList']>,
        default: () => [],
    },
    /**
     * 接受上传的文件类型
     */
    accept: {
        type: String,
        default: '',
    },
    /**
     * 是否支持多选上传
     */
    multiple: {
        type: Boolean,
        default: false,
    },
    /**
     * 上传的文件字段名
     */
    name: {
        type: String,
        default: 'file',
    },
    /**
     * 请求URL
     */
    action: {
        type: String,
        default: '',
    },
    /**
     * 设置上传请求方法
     */
    method: {
        type: String as PropType<UploadProps['method']>,
        default: 'post',
    },
    /**
     * 上传的请求头部
     */
    headers: {
        type: Object as PropType<UploadProps['headers']>,
    },
    /**
     * 上传时附带的额外参数
     */
    data: {
        type: Object as PropType<UploadProps['data']>,
    },
    /**
     * 是否显示已上传文件列表
     */
    showFileList: {
        type: Boolean,
        default: true,
    },
    /**
     * 是否启用拖拽上传
     */
    drag: {
        type: Boolean,
        default: false,
    },
    /**
     * 是否禁用
     */
    disabled: {
        type: Boolean,
        default: false,
    },
    /**
     * 文件列表的样式
     */
    listType: {
        type: String as PropType<UploadProps['listType']>,
        default: 'text',
    },
    /**
     * 是否自动上传
     */
    autoUpload: {
        type: Boolean,
        default: true,
    },
    /**
     * 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求
     */
    httpRequest: {
        type: Function as PropType<UploadProps['httpRequest']>,
        default: http,
    },
    /**
     * 文件上传前钩子，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    onBeforeUpload: {
        type: Function as PropType<UploadProps['onBeforeUpload']>,
    },
    /**
     * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     */
    onChange: {
        type: Function as PropType<UploadProps['onChange']>,
        default: () => {},
    },
    /**
     * 文件上传进度的钩子
     */
    onProgress: {
        type: Function as PropType<UploadProps['onProgress']>,
        default: () => {},
    },
    /**
     * 文件上传成功时的钩子
     */
    onSuccess: {
        type: Function as PropType<UploadProps['onSuccess']>,
        default: () => {},
    },
    /**
     * 文件上传失败时的钩子
     */
    onFail: {
        type: Function as PropType<UploadProps['onFail']>,
        default: () => {},
    },
    /**
     * 文件从文件列表移除时的钩子
     */
    onRemove: {
        type: Function as PropType<UploadProps['onRemove']>,
        default: () => {},
    },
    /**
     * 点击文件列表中已上传的文件时的钩子
     */
    onPreview: {
        type: Function as PropType<UploadProps['onPreview']>,
        default: () => {},
    },
};

export default uploadProps;
