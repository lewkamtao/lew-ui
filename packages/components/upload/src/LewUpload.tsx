import { defineComponent, reactive, shallowRef, watch } from 'vue'
import uploadProps from './props'
import type {
  RenderIconOptions,
  UploadFile,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestOptions,
} from './upload.type'
import './styles/index.scss'
import { genUid } from '../../../utils'
import LewUploadDragger from './components/LewUploadDragger'

export default defineComponent({
  name: 'LewUpload',
  props: uploadProps,
  emits: ['update:fileList'],
  setup(props, { slots, emit }) {
    const inputRef = shallowRef<HTMLInputElement>()

    let proxyUploadFileList: UploadFile[]

    watch(
      props.fileList,
      (newVal) => {
        proxyUploadFileList = newVal
      },
      {
        immediate: true,
        deep: true,
      },
    )

    // 从fileList中移除对应文件
    function removeFile(file: UploadFile) {
      proxyUploadFileList.splice(proxyUploadFileList.indexOf(file), 1)
      emit('update:fileList', proxyUploadFileList)
    }

    // 上传
    function upload(proxyUploadFile: UploadFile) {
      // 上传进度
      const onProgress = (event: ProgressEvent) => {
        proxyUploadFile.status = 'uploading'
        proxyUploadFile.percent = (
          event as UploadProgressEvent
        ).percent
        props.onProgress(event, proxyUploadFile, proxyUploadFileList)
      }

      // 上传成功
      const onSuccess = (response: any) => {
        proxyUploadFile.status = 'success'
        proxyUploadFile.response = response
        emit('update:fileList', proxyUploadFileList)
        props.onChange(proxyUploadFile, proxyUploadFileList)
        props.onSuccess(response, proxyUploadFile, proxyUploadFileList)
      }

      // 上传错误
      const onFail = (error: Error) => {
        proxyUploadFile.status = 'fail'
        props.onChange(proxyUploadFile, proxyUploadFileList)
        props.onFail(error, proxyUploadFile, proxyUploadFileList)
        console.error(error)
      }

      const options: UploadRequestOptions = {
        action: props.action,
        method: props.method,
        data: props.data || {},
        name: props.name,
        file: proxyUploadFile.raw,
        headers: props.headers || {},
        onProgress,
        onSuccess,
        onFail,
      }

      props.httpRequest(options)
    }

    async function beforeUpload(file: UploadRawFile) {
      inputRef.value!.value = ''

      if (props.onBeforeUpload) {
        const result = await props.onBeforeUpload(
          file as unknown as UploadFile,
        )
        if (!result)
          return
      }

      const uploadFile: UploadFile = {
        name: file.name,
        percent: 0,
        status: 'ready',
        size: file.size,
        uid: file.uid,
        url: URL.createObjectURL(file),
        raw: file,
      }

      const proxyUploadFile = reactive<UploadFile>(uploadFile)

      proxyUploadFileList.push(proxyUploadFile)

      emit('update:fileList', proxyUploadFileList)

      props.onChange(proxyUploadFile, proxyUploadFileList)

      if (props.autoUpload)
        upload(proxyUploadFile)
    }

    function handleClick() {
      if (props.disabled)
        return
      inputRef.value!.click()
    }

    function handleChange(e: Event) {
      const files = Array.from((e.target as HTMLInputElement).files!)
      files.forEach((raw) => {
        const file = raw as UploadRawFile
        file.uid = genUid()
        beforeUpload(file)
      })
    }

    function handleRemove(file: UploadFile) {
      removeFile(file)
      props.onRemove(file, proxyUploadFileList)
    }

    function handlePreview(file: UploadFile) {
      if (file.status === 'success')
        props.onPreview(file)
    }

    function handleDragFiles(files: File[]) {
      files.forEach((raw) => {
        const file = raw as UploadRawFile
        file.uid = genUid()
        beforeUpload(file)
      })
    }

    function submit() {
      proxyUploadFileList.forEach((proxyUploadFile: UploadFile) => {
        if (proxyUploadFile.status === 'ready')
          upload(proxyUploadFile)
      })
    }

    // 渲染默认插槽
    function renderDefaultSlot() {
      return slots.default ? slots.default() : null
    }

    // 渲染tip插槽
    function renderTipSlot() {
      return slots.tip
        ? (
                <div class="lew-upload__tip">{slots.tip && slots.tip()}</div>
          )
        : null
    }

    // 渲染upload
    function renderUploader() {
      return (
                <div
                    class={['lew-upload', `lew-upload--${props.listType}`]}
                    onClick={handleClick}
                >
                    {props.drag
                      ? (
                        <LewUploadDragger
                            disabled={props.disabled}
                            onDragFiles={handleDragFiles}
                        >
                            {renderDefaultSlot()}
                        </LewUploadDragger>
                        )
                      : (
                          renderDefaultSlot()
                        )}
                    <input
                        class="lew-upload__input"
                        type="file"
                        ref={inputRef}
                        accept={props.accept}
                        multiple={props.multiple}
                        onChange={handleChange}
                    />
                </div>
      )
    }

    // 渲染图标
    function renderIcon({
      isRender,
      type,
      size,
      file,
      click,
    }: RenderIconOptions) {
      return isRender
        ? (
                <lew-icon
                    class={`lew-icon lew-icon--${type}`}
                    type={type}
                    size={size}
                    onClick={() => file && click && click(file)}
                />
          )
        : null
    }

    function renderFileListText() {
      return props.showFileList && props.fileList.length
        ? (
                <ul class="lew-upload-list lew-upload-list--text">
                    {props.fileList.map((file) => {
                      return (
                            <li class="lew-upload-list__item">
                                <div
                                    class="lew-upload-list__item-info"
                                    onClick={() => handlePreview(file)}
                                >
                                    {renderIcon({
                                      isRender: true,
                                      type: 'file-text',
                                      size: 14,
                                    })}
                                    <span class="lew-upload-list__item-filename">
                                        {file.name}
                                    </span>
                                </div>
                                <div
                                    class="lew-upload-list__item-status"
                                    v-show={file.status === 'success'}
                                >
                                    {renderIcon({
                                      isRender: true,
                                      type: 'check-circle',
                                      size: 14,
                                      file,
                                    })}
                                </div>
                                {renderIcon({
                                  isRender: !props.disabled,
                                  type: 'x',
                                  size: 14,
                                  file,
                                  click: handleRemove,
                                })}
                            </li>
                      )
                    })}
                </ul>
          )
        : null
    }

    function renderFileListPicture() {
      return props.showFileList && props.fileList.length
        ? (
                <ul class="lew-upload-list lew-upload-list--picture">
                    {props.fileList.map((file) => {
                      return (
                            <li class="lew-upload-list__item">
                                <img
                                    class="lew-upload-list__item-thumbnail"
                                    src={file.url}
                                />
                                <div
                                    class="lew-upload-list__item-info"
                                    onClick={() => handlePreview(file)}
                                >
                                    <span class="lew-upload-list__item-filename">
                                        {file.name}
                                    </span>
                                </div>
                                <div
                                    class="lew-upload-list__item-status"
                                    v-show={file.status === 'success'}
                                >
                                    {renderIcon({
                                      isRender: true,
                                      type: 'check',
                                      size: 14,
                                      file,
                                    })}
                                </div>
                                {renderIcon({
                                  isRender: !props.disabled,
                                  type: 'x',
                                  size: 14,
                                  file,
                                  click: handleRemove,
                                })}
                            </li>
                      )
                    })}
                </ul>
          )
        : null
    }

    function renderFileListPictureCard() {
      if (props.showFileList) {
        return props.fileList.length
          ? (
                    <ul class="lew-upload-list lew-upload-list--picture-card">
                        {props.fileList.map((file) => {
                          return (
                                <li class="lew-upload-list__item">
                                    <img
                                        class="lew-upload-list__item-thumbnail"
                                        src={file.url}
                                    />
                                    <div
                                        class="lew-upload-list__item-status"
                                        v-show={file.status === 'success'}
                                    >
                                        {renderIcon({
                                          isRender: true,
                                          type: 'check',
                                          size: 14,
                                        })}
                                    </div>
                                    <div class="lew-upload-list__item-actions">
                                        {renderIcon({
                                          isRender: file.status === 'success',
                                          type: 'eye',
                                          size: 20,
                                          file,
                                          click: handlePreview,
                                        })}
                                        {renderIcon({
                                          isRender: !props.disabled,
                                          type: 'trash-2',
                                          size: 20,
                                          file,
                                          click: handleRemove,
                                        })}
                                    </div>
                                </li>
                          )
                        })}
                        {renderUploader()}
                    </ul>
            )
          : null
      }

      return <>{renderUploader()}</>
    }

    return {
      props,
      renderUploader,
      renderFileListText,
      renderFileListPicture,
      renderFileListPictureCard,
      renderTipSlot,
      submit,
    }
  },
  render() {
    return (
            <>
                {this.props.listType === 'picture-card'
                    && this.renderFileListPictureCard()}
                {this.props.listType !== 'picture-card'
                    && this.renderUploader()}
                {this.renderTipSlot()}
                {this.props.listType === 'text' && this.renderFileListText()}
                {this.props.listType === 'picture'
                    && this.renderFileListPicture()}
            </>
    )
  },
})
