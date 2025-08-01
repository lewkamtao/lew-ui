<script setup lang="ts">
import type { UploadFileItem, UploadStatus } from './props'
import { useClipboardItems } from '@vueuse/core'
import { LewFlex, LewMessage, LewTooltip, locale } from 'lew-ui'
import { any2px, formatBytes, getUniqueId, object2class } from 'lew-ui/utils'
import LewCommonIcon from 'lew-ui/utils/LewCommonIcon.vue'
import { cloneDeep, isFunction } from 'lodash-es'
import LewUploadByCard from './LewUploadByCard.vue'
import LewUploadByList from './LewUploadByList.vue'
import { uploadProps } from './props'

const props = defineProps(uploadProps)

const emit = defineEmits(['change', 'delete'])
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const { isSupported } = useClipboardItems({ read: true })

const tipFontSizeMap: Record<string, number> = {
  small: 14,
  medium: 14,
  large: 16,
}
const maxSizeFontSizeMap: Record<string, number> = {
  small: 12,
  medium: 12,
  large: 14,
}
const uploadIconFontSizeMap: ComputedRef<Record<string, number>> = computed(() => {
  return {
    small: props.viewMode === 'list' ? 28 : 22,
    medium: props.viewMode === 'list' ? 30 : 24,
    large: props.viewMode === 'list' ? 32 : 26,
  }
})
const uploadPaddingMap: ComputedRef<Record<string, string>> = computed(() => {
  return {
    small: props.viewMode === 'list' ? '10px 8px' : '14px',
    medium: props.viewMode === 'list' ? '14px 10px' : '16px',
    large: props.viewMode === 'list' ? '18px 12px' : '20px',
  }
})
const getCardSize: Record<string, number> = {
  small: 72,
  medium: 80,
  large: 88,
}

const inputClickRef = ref<HTMLInputElement | null>(null)
const inputPasteRef = ref<HTMLInputElement | null>(null)
const dropActive = ref(false)
const modelValue = defineModel<UploadFileItem[]>()
const isFocus = ref(false)

const formMethods: any = inject('formMethods', {})

const _uploadHelper = computed(() => {
  if (isFunction(props.uploadHelper)) {
    return props.uploadHelper
  }
  else if (props.uploadHelperId) {
    return formMethods[props.uploadHelperId]
  }
  return false
})

function addImageToList(files: any) {
  if ((files || []).length > 0) {
    const item = files.pop()
    const { size, type, name, lastModifiedDate, lastModified } = item
    let status: UploadStatus = 'pending'

    if (!checkFileAccept({ ...item, file: item })) {
      status = 'wrong_type'
    }
    if (size && size > props.maxFileSize) {
      status = 'wrong_size'
    }

    const fileItem = {
      key: getUniqueId(),
      status,
      size,
      type,
      name,
      lastModifiedDate,
      lastModified,
      file: item,
    }

    modelValue.value = [fileItem, ...cloneDeep(modelValue.value || [])]
    emit('change', modelValue.value)

    nextTick(() => {
      // 如果配置了uploadHelper且文件格式和大小都符合要求，则开始上传
      if (status === 'pending' && isFunction(_uploadHelper.value)) {
        setFileItem({
          key: fileItem.key,
          status: 'uploading',
          percent: 0,
        })
        _uploadHelper.value({
          fileItem: cloneDeep(fileItem),
          setFileItem,
        })
      }
      setTimeout(() => {
        if ((modelValue.value || []).length < props.limit) {
          addImageToList(files)
        }
      }, 250)
    })
  }
}

async function deleteFile(key: string) {
  const fileList = cloneDeep(modelValue.value) || []
  const index = (fileList || []).findIndex((e: UploadFileItem) => e.key === key)
  if (index >= 0) {
    const { status } = fileList[index]
    const fileItem = fileList[index]

    // 对于错误状态的文件，直接删除
    if (['wrong_type', 'wrong_size', 'pending'].includes(status || '')) {
      fileList.splice(index, 1)
      modelValue.value = fileList
      emit('delete', key)
      return
    }

    // 调用删除前的回调函数
    if (props.beforeDelete && isFunction(props.beforeDelete)) {
      try {
        const shouldDelete = await props.beforeDelete(fileItem)
        if (!shouldDelete) {
          return // 用户取消删除
        }
      }
      catch (error) {
        console.error('[LewUpload] beforeDelete callback error:', error)
        return // 出错时不删除
      }
    }

    // 执行删除
    fileList.splice(index, 1)
    modelValue.value = fileList
    emit('delete', key)
  }
}

function reUpload(key: string) {
  const index = (modelValue.value || []).findIndex(e => e.key === key)
  if (index >= 0) {
    const item = (modelValue.value || [])[index]
    if (isFunction(_uploadHelper.value)) {
      setFileItem({ key, percent: 0, status: 'uploading' })
      _uploadHelper.value({ fileItem: cloneDeep(item), setFileItem })
    }
  }
  else {
    LewMessage.error('文件不存在')
  }
}

function clickUpload(e: any) {
  const files = e.target.files
  addImageToList(Array.from(files))
  // 清空
  nextTick(() => {
    if (inputClickRef.value) {
      inputClickRef.value.value = ''
    }
  })
}
// 拖拽上传
function dropUpload(e: any) {
  const files = e.dataTransfer.files
  dropActive.value = false
  e.stopPropagation()
  e.preventDefault()
  addImageToList(Array.from(files))
}

// 监听粘贴操作
function pasteUpload(e: any) {
  const items = e.clipboardData.items //  获取剪贴板中的数据
  if (items.length > 0) {
    //  判断剪贴板中是否是文件
    const files = Array.from(items)
      .filter((item: any) => {
        return item.kind === 'file'
      })
      .map((e: any) => {
        return e.getAsFile()
      })
    addImageToList(files)
  }
}

// 定义判断文件是否符合accept规则的方法
function checkFileAccept(fileItem: UploadFileItem) {
  const acceptedFiles = props.accept
  const file = fileItem.file
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',')
    const fileName = file.name || ''
    const mimeType = (file.type || '').toLowerCase()
    const baseMimeType = mimeType.replace(/\/.*$/, '')
    return acceptedFilesArray.some((type) => {
      const validType = type.trim().toLowerCase()
      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType)
      }
      else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '')
      }
      return mimeType === validType
    })
  }
  return true
}

const dropRef = ref()

onMounted(() => {
  // 拖拽接听
  const drop = dropRef.value.$el
  drop.addEventListener('drop', dropUpload, false)
  let timer: any = ''
  drop.addEventListener('dragleave', (e: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      e.stopPropagation()
      e.preventDefault()
      dropActive.value = false
    }, 0)
  })

  drop.addEventListener('dragover', (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    dropActive.value = true
  })
})

function setFileItem(item: UploadFileItem) {
  const { key, percent } = item
  const fileList = cloneDeep(modelValue.value) || []
  const index = (fileList || []).findIndex((e: UploadFileItem) => e.key === key)
  let _percent = percent || 0
  if (index >= 0) {
    if (percent) {
      if (_percent > 100)
        _percent = 100
      if (_percent < 0)
        _percent = 0
      fileList[index].percent = _percent
    }
    else {
      _percent = fileList[index].percent as number
    }
    fileList[index] = { ...fileList[index], ...item, percent: _percent }
  }
  modelValue.value = fileList
}

const getUploadLabelClass = computed(() => {
  const { disabled, readonly, viewMode } = props
  return object2class('lew-upload-label', { disabled, readonly, viewMode })
})

const getTips = computed(() => {
  const { tips, maxFileSize, accept, limit } = props
  if (tips) {
    return tips
  }
  else {
    const tips = []
    if (accept) {
      tips.push(locale.t('upload.accept', { accept }))
    }
    if (limit) {
      tips.push(locale.t('upload.limit', { limit }))
    }
    if (maxFileSize) {
      tips.push(
        locale.t('upload.maxFileSize', {
          maxFileSize: formatBytes(maxFileSize),
        }),
      )
    }
    return `${tips.join('，')}。`
  }
})
</script>

<template>
  <LewFlex
    class="lew-upload-wrapper"
    :direction="viewMode === 'list' ? 'y' : 'x'"
    gap="10"
    :style="{
      width: viewMode === 'list' ? '100%' : 'auto',
    }"
  >
    <LewUploadByCard
      v-if="viewMode === 'card'"
      v-model="modelValue"
      :size
      @re-upload="reUpload"
      @delete-file="deleteFile"
    />
    <label
      v-show="(modelValue || []).length < limit"
      class="lew-upload-label"
      :class="getUploadLabelClass"
      :style="{
        width: viewMode === 'list' ? '100%' : `${any2px(getCardSize[size])}`,
        height: viewMode === 'list' ? 'auto' : `${any2px(getCardSize[size])}`,
      }"
      @mouseenter="inputPasteRef?.focus()"
      @mouseleave="inputPasteRef?.blur()"
    >
      <LewFlex
        ref="dropRef"
        direction="y"
        x="center"
        y="center"
        class="lew-upload"
        :class="{ 'lew-upload-drop-active': dropActive }"
        :style="{
          padding: uploadPaddingMap[size],
        }"
        gap="5"
      >
        <LewCommonIcon
          :stroke-width="1.5"
          class="lew-upload-icon"
          :size="uploadIconFontSizeMap[size]"
          type="upload-cloud"
        />

        <div
          v-if="viewMode === 'list'"
          :style="{
            fontSize: `${any2px(tipFontSizeMap[size])}`,
          }"
          class="lew-upload-tip"
        >
          {{
            dropActive
              ? locale.t("upload.dropActive")
              : `${locale.t("upload.click")}${
                isSupported && isFocus ? locale.t("upload.paste") : ""
              }${locale.t("upload.drag")}`
          }}
        </div>
        <div
          v-if="viewMode === 'list'"
          :style="{
            fontSize: `${any2px(maxSizeFontSizeMap[size])}`,
          }"
          class="lew-upload-max-size"
        >
          {{ getTips }}
        </div>
        <input
          ref="inputClickRef"
          class="lew-upload-input"
          type="file"
          :multiple="multiple"
          :accept="accept"
          @change.stop="clickUpload"
        >
        <input
          ref="inputPasteRef"
          class="lew-upload-input"
          type="text"
          @paste="pasteUpload"
          @focus="isFocus = true"
          @blur="isFocus = false"
        ></LewFlex>
    </label>
    <LewUploadByList
      v-if="viewMode === 'list'"
      v-model="modelValue"
      :size
      @re-upload="reUpload"
      @delete-file="deleteFile"
    />
  </LewFlex>
</template>

<style lang="scss" scoped>
.lew-upload-wrapper {
  display: flex;
  flex-wrap: wrap;
  .lew-upload {
    position: relative;
    width: 100%;
    border: 1px var(--lew-form-border-color-hover) dashed;
    background-color: var(--lew-form-bgcolor);
    border-radius: var(--lew-border-radius-small);
    box-sizing: border-box;
    transition: all var(--lew-form-transition-ease);
    cursor: pointer;
    box-shadow: var(--lew-form-box-shadow);
    .lew-upload-icon {
      color: var(--lew-color-primary);
      transition: all var(--lew-form-transition-ease);
    }
    .lew-upload-tip {
      transition: all var(--lew-form-transition-ease);
    }
    .lew-upload-max-size {
      color: var(--lew-text-color-5);
      transition: all var(--lew-form-transition-ease);
    }
    .lew-upload-input {
      position: fixed;
      opacity: 0;
      z-index: -99;
    }
  }
  .lew-upload-label {
    user-select: none;
    min-width: 280px;
    width: 100%;
    flex-shrink: 0;
    transition: all var(--lew-form-transition-ease);
  }
  .lew-upload-label-readonly {
    user-select: text;
    pointer-events: none; //鼠标点击不可修改
  }

  .lew-upload-label-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
  }
  .lew-upload-label-viewMode-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-width: auto;
  }
  .lew-upload {
    width: 100%;
    height: 100%;
  }
  // 防止拖拽时出现闪烁
  .lew-upload::after {
    position: absolute;
    left: 0px;
    top: 0px;
    content: '';
    z-index: 9;
    width: 100%;
    height: 100%;
  }
  .lew-upload:hover {
    border-color: var(--lew-form-border-color-focus);
    background-color: var(--lew-color-blue-light);
  }
  .lew-upload-drop-active {
    border-color: var(--lew-form-border-color-focus);
    background-color: var(--lew-color-blue-light);
  }
  .lew-upload:active {
    border-color: var(--lew-form-border-color-focus);
    background-color: var(--lew-form-bgcolor-focus);
  }
  .lew-upload-file-list {
    position: relative;
    .lew-upload-file-item {
      position: relative;
      background-color: var(--lew-bgcolor-0);
      border: 1px var(--lew-bgcolor-3) solid;
      border-radius: var(--lew-border-radius-small);
      box-shadow: 0px 1px 5px rgba($color: #000000, $alpha: 0.07);
      box-sizing: border-box;

      .lew-upload-reupload-btn,
      .lew-upload-delete-btn {
        position: absolute;
        top: -7px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        transition: all var(--lew-form-transition-ease);
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
          transform: scale(1.1);
        }
        &:active {
          transform: scale(1);
        }
      }

      .lew-upload-reupload-btn {
        right: 24px;
        background-color: var(--lew-color-blue);
        color: var(--lew-color-white);
      }
      .lew-upload-delete-btn {
        right: -7px;
        background-color: var(--lew-color-red);
        color: var(--lew-color-white);
      }

      .lew-upload-icon-wrapper {
        padding: 2px;
        box-sizing: border-box;
        .lew-upload-file-icon {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
        }
        .lew-upload-file-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 4px;
          overflow: hidden;
          background-color: var(--lew-bgcolor-2);
        }
      }

      .lew-upload-file-name {
        width: 100%;
        color: var(--lew-text-color-2);
      }
      .lew-upload-progress {
        position: relative;
        height: 14px;
        display: flex;
        align-items: center;
        overflow: hidden;
        animation: progressCompleted 0.25s;
        animation-fill-mode: forwards;
        animation-play-state: paused;
        animation-delay: 500ms;

        @keyframes progressCompleted {
          0% {
            opacity: 1;
            height: 14px;
          }
          100% {
            opacity: 0;
            height: 0px;
          }
        }

        .lew-upload-progress-box {
          height: 14px;
        }

        .lew-upload-progress-bar {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 4px;
          background-color: var(--lew-bgcolor-4);
          border-radius: 2px;
        }
        .lew-upload-progress-bar-upload {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
          transition: all 0.2s;
          height: 4px;
          border-radius: 2px;
          background-color: var(--lew-color-primary);
        }
      }

      .lew-upload-progress-success {
        animation-play-state: running;
      }
      .lew-upload-progress-fail {
        .lew-upload-progress-bar-upload {
          background-color: var(--lew-color-red);
        }
      }

      .lew-upload-footer {
        font-size: 14px;
        white-space: nowrap;
        color: var(--lew-text-color-6);
      }
    }
    .lew-upload-file-item-invalid {
      opacity: 0.5;
    }
  }
}
</style>
