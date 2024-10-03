<script setup lang="ts">
import { uploadProps } from './props'
import type { UploadFileItem, UploadStatus } from './props'
import LewUploadByList from './LewUploadByList.vue'
import LewUploadByCard from './LewUploadByCard.vue'
import { LewFlex, LewAlert, LewTooltip, LewDialog } from 'lew-ui'
import { any2px, getUniqueId, formatBytes, object2class } from 'lew-ui/utils'
import { useClipboardItems } from '@vueuse/core'
import { cloneDeep, isFunction } from 'lodash-es'
import Icon from 'lew-ui/utils/Icon.vue'

const props = defineProps(uploadProps)

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const { isSupported } = useClipboardItems({ read: true })

const tipFontSizeMap: Record<string, number> = {
  small: 14,
  medium: 14,
  large: 16
}
const maxSizeFontSizeMap: Record<string, number> = {
  small: 12,
  medium: 12,
  large: 14
}
const uploadIconFontSizeMap: Record<string, number> = {
  small: props.viewMode === 'list' ? 32 : 24,
  medium: props.viewMode === 'list' ? 35 : 26,
  large: props.viewMode === 'list' ? 45 : 28
}
const uploadPaddingMap: Record<string, string> = {
  small: props.viewMode === 'list' ? '10px 8px' : '14px',
  medium: props.viewMode === 'list' ? '14px 10px' : '16px',
  large: props.viewMode === 'list' ? '18px 12px' : '20px'
}

const getCardSize: Record<string, number> = {
  small: 72,
  medium: 80,
  large: 88
}

const emit = defineEmits(['change'])
const inputClickRef = ref<HTMLInputElement | null>(null)
const inputPasteRef = ref<HTMLInputElement | null>(null)
const dropActive = ref(false)
const modelValue = defineModel<UploadFileItem[]>()
const isFocus = ref(false)

const formMethods: any = inject('formMethods', {})

let _uploadHelper = computed(() => {
  if (isFunction(props.uploadHelper)) {
    return props.uploadHelper
  } else if (props.uploadHelperId) {
    return formMethods[props.uploadHelperId]
  }
  return false
})

const addImageToList = (files: any) => {
  if ((files || []).length > 0) {
    const item = files.pop()
    const { size, type, name, lastModifiedDate, lastModified } = item
    let status: UploadStatus = 'wrong_config'
    if (!checkFileAccept({ ...item, file: item })) {
      status = 'wrong_type'
    }
    if (size && size > props.maxFileSize) {
      status = 'wrong_size'
    }
    const fileItem = {
      id: getUniqueId(),
      status,
      size,
      type,
      name,
      lastModifiedDate,
      lastModified,
      file: item
    }
    modelValue.value = [fileItem, ...cloneDeep(modelValue.value || [])]
    emit('change', modelValue.value)
    nextTick(() => {
      if (fileItem.status === 'wrong_config') {
        isFunction(_uploadHelper.value)
          ? _uploadHelper.value({ fileItem: cloneDeep(fileItem), setFileItem })
          : LewMessage.error('未配置上传 uploadHelper')
      }
      setTimeout(() => {
        if ((modelValue.value || []).length < props.limit) {
          addImageToList(files)
        }
      }, 250)
    })
  }
}

const deleteFile = (id: string) => {
  let fileList = cloneDeep(modelValue.value) || []
  const index = (fileList || []).findIndex((e: UploadFileItem) => e.id === id)
  if (index >= 0) {
    const { status } = fileList[index]
    if (['wrong_type', 'wrong_size', 'wrong_config'].includes(status || '')) {
      fileList.splice(index, 1)
      modelValue.value = fileList
    } else {
      LewDialog.error({
        title: '移除文件',
        okText: '移除',
        content: '你是否要移除该文件，此操作会立即生效，请谨慎操作！',
        closeOnClickOverlay: true,
        closeByEsc: true,
        ok: () => {
          fileList.splice(index, 1)
          modelValue.value = fileList
          return true
        }
      })
    }
  }
}

const reUpload = (id: string) => {
  const index = (modelValue.value || []).findIndex((e) => e.id === id)
  if (index >= 0) {
    const item = (modelValue.value || [])[index]
    setFileItem({ id, percent: 0, status: 'uploading' })
    isFunction(_uploadHelper.value)
      ? _uploadHelper.value({ fileItem: cloneDeep(item), setFileItem })
      : LewMessage.error('未配置上传 uploadHelper')
  } else {
    LewMessage.error('文件不存在')
  }
}

const clickUpload = (e: any) => {
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
const dropUpload = (e: any) => {
  let files = e.dataTransfer.files
  dropActive.value = false
  e.stopPropagation()
  e.preventDefault()
  addImageToList(Array.from(files))
}

// 监听粘贴操作
const pasteUpload = (e: any) => {
  const items = e.clipboardData.items //  获取剪贴板中的数据
  if (items.length > 0) {
    //  判断剪贴板中是否是文件
    let files = Array.from(items)
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
const checkFileAccept = (fileItem: UploadFileItem) => {
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
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '')
      }
      return mimeType === validType
    })
  }
  return true
}

let dropRef = ref()

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

const setFileItem = (item: UploadFileItem) => {
  const { id, percent } = item
  let fileList = cloneDeep(modelValue.value) || []
  const index = (fileList || []).findIndex((e: UploadFileItem) => e.id === id)
  let _percent = percent || 0
  if (index >= 0) {
    if (percent) {
      if (_percent > 100) _percent = 100
      if (_percent < 0) _percent = 0
      fileList[index].percent = _percent
    } else {
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
  } else {
    let tips = []
    if (accept) {
      tips.push(`支持 ${accept}`)
    }
    if (limit) {
      tips.push(`最多上传 ${limit} 个文件`)
    }
    if (maxFileSize) {
      tips.push(`文件大小限制 ${formatBytes(maxFileSize)}`)
    }
    return tips.join('，') + '。'
  }
})
</script>

<template>
  <lew-flex
    class="lew-upload-wrapper"
    :direction="viewMode === 'list' ? 'y' : 'x'"
    gap="10"
    :style="{
      width: viewMode === 'list' ? '100%' : 'auto'
    }"
  >
    <lew-upload-by-card
      v-if="viewMode === 'card'"
      :size
      v-model="modelValue"
      @re-upload="reUpload"
      @delete-file="deleteFile"
    />
    <label
      v-show="(modelValue || []).length < limit"
      @mouseenter="inputPasteRef?.focus()"
      @mouseleave="inputPasteRef?.blur()"
      class="lew-upload-label"
      :class="getUploadLabelClass"
      :style="{
        width: viewMode === 'list' ? '100%' : `${any2px(getCardSize[size])}`,
        height: viewMode === 'list' ? 'auto' : `${any2px(getCardSize[size])}`
      }"
    >
      <lew-flex
        ref="dropRef"
        direction="y"
        x="center"
        y="center"
        class="lew-upload"
        :class="{ 'lew-upload-drop-active': dropActive }"
        :style="{
          padding: uploadPaddingMap[size]
        }"
        gap="5"
      >
        <Icon
          :stroke-width="1.5"
          class="lew-upload-icon"
          :size="uploadIconFontSizeMap[size]"
          type="upload-cloud" />

        <div
          v-if="viewMode === 'list'"
          :style="{
            fontSize: `${any2px(tipFontSizeMap[size])}`
          }"
          class="lew-upload-tip"
        >
          {{
            dropActive
              ? '松开鼠标上传文件'
              : `点击、${isSupported && isFocus ? 'Ctrl + V 粘贴、' : ''}拖拽文件到此处`
          }}
        </div>
        <div
          v-if="viewMode === 'list'"
          :style="{
            fontSize: `${any2px(maxSizeFontSizeMap[size])}`
          }"
          class="lew-upload-max-size"
        >
          {{ getTips }}
        </div>
        <input
          class="lew-upload-input"
          ref="inputClickRef"
          type="file"
          :multiple="multiple"
          :accept="accept"
          @change.stop="clickUpload" />
        <input
          class="lew-upload-input"
          ref="inputPasteRef"
          @paste="pasteUpload"
          @focus="isFocus = true"
          @blur="isFocus = false"
          type="text"
      /></lew-flex>
    </label>
    <lew-upload-by-list
      v-if="viewMode === 'list'"
      :size
      v-model="modelValue"
      @re-upload="reUpload"
      @delete-file="deleteFile"
    />
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-upload-wrapper {
  display: flex;
  flex-wrap: wrap;
  .lew-upload {
    position: relative;
    width: 100%;
    border: var(--lew-form-border-width) var(--lew-bgcolor-5) dashed;
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
