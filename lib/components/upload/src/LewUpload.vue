<script setup lang="ts">
import { cloneDeep, isFunction } from 'lodash'
import { uploadProps } from './props'
import type { UploadFileItem, UploadStatus } from './props'
import { any2px, getUUId, formatBytes, getFileIcon, object2class } from 'lew-ui/utils'
import { useClipboardItems } from '@vueuse/core'
const { isSupported } = useClipboardItems({ read: true })
const tipFontSizeMap: Record<string, number> = {
  small: 12,
  medium: 14,
  large: 16
}
const fileIconSizeMap: Record<string, number> = {
  small: 28,
  medium: 36,
  large: 44
}
const uploadItemPaddingMap: Record<string, number> = {
  small: 8,
  medium: 10,
  large: 12
}
const maxSizeFontSizeMap: Record<string, number> = {
  small: 10,
  medium: 12,
  large: 14
}
const footerFontSizeMap: Record<string, number> = {
  small: 10,
  medium: 12,
  large: 14
}
const fileNameFontSizeMap: Record<string, number> = {
  small: 12,
  medium: 14,
  large: 16
}
const uploadIconFontSizeMap: Record<string, number> = {
  small: 25,
  medium: 35,
  large: 45
}
const rightTopBtnSizeMap: Record<string, number> = {
  small: 16,
  medium: 18,
  large: 20
}

const rightTopBtnIconSizeMap: Record<string, number> = {
  small: 10,
  medium: 12,
  large: 14
}

const rightTopBorderRadiusMap: Record<string, number> = {
  small: 7,
  medium: 7.8,
  large: 8.5
}

const statusMap: Record<UploadStatus, string> = {
  success: '上传成功',
  fail: '上传失败',
  uploading: '上传中',
  pending: '等待上传',
  complete: '已上传',
  wrong_type: '非法格式',
  wrong_size: '文件大小超出限制'
}

const statusColorMap: Record<UploadStatus, string> = {
  success: 'green',
  fail: 'red',
  uploading: 'blue',
  pending: 'mint',
  complete: 'gray',
  wrong_type: 'red',
  wrong_size: 'red'
}
const statusIconMap: Record<UploadStatus, string> = {
  success: 'check',
  fail: 'alert-circle',
  uploading: 'loader',
  pending: 'coffee',
  complete: 'check',
  wrong_type: 'alert-circle',
  wrong_size: 'alert-circle'
}

const props = defineProps(uploadProps)
const emit = defineEmits(['change'])
const inputClickRef = ref<HTMLInputElement | null>(null)
const inputPasteRef = ref<HTMLInputElement | null>(null)
const dropActive = ref(false)
const modelValue = defineModel<UploadFileItem[]>()
const isFocus = ref(false)

const addImageToList = (files: any) => {
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
      id: getUUId(),
      status,
      size,
      type,
      name,
      lastModifiedDate,
      lastModified,
      file: item
    }
    modelValue.value = [fileItem, ...cloneDeep(modelValue.value || [])]
    nextTick(() => {
      if (fileItem.status === 'pending') {
        isFunction(props.uploadHelper)
          ? props.uploadHelper({ fileItem: cloneDeep(fileItem), setFileItem })
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

const reUpload = (id: string) => {
  const index = (modelValue.value || []).findIndex((e) => e.id === id)
  if (index >= 0) {
    const item = (modelValue.value || [])[index]
    setFileItem({ id, percent: 0, status: 'uploading' })
    isFunction(props.uploadHelper)
      ? props.uploadHelper({ fileItem: cloneDeep(item), setFileItem })
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
  const index = (fileList || []).findIndex((e) => e.id === id)
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

const deleteFile = (id: string) => {
  let fileList = cloneDeep(modelValue.value) || []
  const index = (fileList || []).findIndex((e) => e.id === id)
  if (index >= 0) {
    const { status } = fileList[index]
    if (['wrong_type', 'wrong_size'].includes(status || '')) {
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

const checkUrlIsImg = (url: string = '') => {
  // 图片正则
  const reg = /\.(jpg|jpeg|png|webp|bmp|gif)$/i
  return reg.test(url)
}

const getFileName = computed(() => (item: UploadFileItem) => {
  return item.name || getLastValueAfterSlash(item.url)
})

// 定义提取最后一个/后面的所有值方法
const getLastValueAfterSlash = (url: string = '') => {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 1]
}

const getUploadLabelClass = computed(() => {
  const { disabled, readonly } = props
  return object2class('lew-upload-label', { disabled, readonly })
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
      tips.push(`至多上传 ${limit} 个文件`)
    }
    if (maxFileSize) {
      tips.push(`文件大小不能超过 ${formatBytes(maxFileSize)}`)
    }
    return tips.join('，') + '。'
  }
})
</script>

<template>
  <lew-flex class="lew-upload-wrapper" direction="y" gap="10">
    <label
      v-show="(modelValue || []).length < limit"
      @mouseenter="inputPasteRef?.focus()"
      @mouseleave="inputPasteRef?.blur()"
      class="lew-upload-label"
      :class="getUploadLabelClass"
      style="width: 100%"
    >
      <lew-flex
        ref="dropRef"
        direction="y"
        x="center"
        y="center"
        class="lew-upload"
        :class="{ 'lew-upload-drop-active': dropActive }"
        :style="{
          padding: `var(--lew-form-upload-padding-${size})`
        }"
        gap="5"
      >
        <lew-icon
          stroke-width="1.5"
          class="lew-upload-icon"
          :size="uploadIconFontSizeMap[size]"
          type="upload-cloud" />

        <div
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

    <lew-alert
      v-if="!isFunction(uploadHelper)"
      :list="[
        {
          type: 'error',
          title: 'uploadHelper Error: 未配置上传方法'
        }
      ]"
    >
    </lew-alert>

    <lew-flex
      v-show="(modelValue || []).length > 0"
      direction="y"
      class="lew-upload-file-list"
      gap="10"
    >
      <transition-group name="upload-list">
        <lew-flex
          v-for="item in modelValue"
          :key="item.id"
          class="lew-upload-file-item"
          mode="between"
          gap="8"
          :style="{
            padding: uploadItemPaddingMap[size] + 'px'
          }"
        >
          <lew-flex
            :style="{ width: `${fileIconSizeMap[size]}px`, height: `${fileIconSizeMap[size]}px` }"
            class="lew-upload-icon-wrapper"
          >
            <img v-if="checkUrlIsImg(item.url)" class="lew-upload-file-image" :src="item.url" />
            <img v-else class="lew-upload-file-icon" :src="getFileIcon(item.name as string)" />
          </lew-flex>
          <lew-flex
            class="lew-upload-file-info"
            :style="{ width: `calc(100% - ${fileIconSizeMap[size]}px - 8px)` }"
            direction="y"
            gap="0"
          >
            <lew-flex
              v-tooltip="{
                content: '重新上传',
                trigger: 'mouseenter'
              }"
              v-if="item.status === 'fail'"
              @click.stop="reUpload(item.id)"
              x="center"
              y="center"
              :style="{
                width: rightTopBtnSizeMap[size] + 'px',
                height: rightTopBtnSizeMap[size] + 'px',
                borderRadius: rightTopBorderRadiusMap[size] + 'px'
              }"
              class="lew-upload-reupload-btn"
            >
              <lew-icon :size="rightTopBtnIconSizeMap[size]" type="rotate-cw" />
            </lew-flex>

            <lew-flex
              v-tooltip="{
                content: '移除文件',
                trigger: 'mouseenter'
              }"
              @click.stop="deleteFile(item.id)"
              x="center"
              y="center"
              :style="{
                width: rightTopBtnSizeMap[size] + 'px',
                height: rightTopBtnSizeMap[size] + 'px',
                borderRadius: rightTopBorderRadiusMap[size] + 'px'
              }"
              class="lew-upload-delete-btn"
            >
              <lew-icon :size="rightTopBtnIconSizeMap[size]" type="x"></lew-icon>
            </lew-flex>
            <lew-flex mode="between" gap="5" y="center">
              <lew-flex y="center" x="start" gap="5">
                <lew-text-trim
                  :text="getFileName(item)"
                  :style="{
                    width: `calc(100% - 60px)`,
                    fontSize: `${any2px(fileNameFontSizeMap[size])}`
                  }"
                  class="lew-upload-file-name"
                />
              </lew-flex>
            </lew-flex>
            <lew-flex
              v-if="item.percent"
              class="lew-upload-progress"
              :class="[`lew-upload-progress-${item.status}`]"
            >
              <lew-flex y="center" class="lew-upload-progress-box">
                <span class="lew-upload-progress-bar"></span>
                <span
                  :style="{ width: `${item.percent > 100 ? 100 : item.percent}%` }"
                  class="lew-upload-progress-bar-upload"
                >
                </span>
              </lew-flex>
            </lew-flex>
            <lew-flex mode="between" y="center" class="lew-upload-footer">
              <span
                :style="{
                  fontSize: `${any2px(footerFontSizeMap[size])}`
                }"
              >
                <template v-if="item.status === 'uploading' && item.percent && item.size">
                  {{ formatBytes((item.percent / 100) * item.size) + ' / ' }}
                </template>
                <span v-if="item.size"> {{ formatBytes(item.size) }}</span>
              </span>
              <lew-flex style="max-width: 200px" y="center" x="end">
                <lew-tag
                  type="light"
                  size="small"
                  :color="statusColorMap[item.status || 'complete']"
                >
                  <template #left>
                    <lew-icon
                      size="12"
                      :type="statusIconMap[item.status || 'complete']"
                      :animation="item.status === 'uploading' ? 'spin' : ''"
                    />
                  </template>
                  {{ statusMap[item.status || 'complete'] }}
                </lew-tag>
              </lew-flex>
            </lew-flex>
          </lew-flex>
        </lew-flex>
      </transition-group>
    </lew-flex>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-upload-wrapper {
  min-width: 280px;
  .lew-upload {
    position: relative;
    width: 100%;
    border: var(--lew-form-border-width) var(--lew-form-border-color-hover) dashed;
    background-color: var(--lew-form-bgcolor);
    border-radius: var(--lew-border-radius-small);
    box-sizing: border-box;
    transition: var(--lew-form-transition);
    cursor: pointer;

    .lew-upload-icon {
      color: var(--lew-color-primary-dark);
      transition: var(--lew-form-transition);
    }
    .click-upload {
      color: var(--lew-color-primary-dark);
      border-bottom: 2px var(--lew-color-primary-dark) solid;
    }
    .lew-upload-tip {
      transition: var(--lew-form-transition);
    }
    .lew-upload-max-size {
      color: var(--lew-text-color-8);
      transition: var(--lew-form-transition);
    }
    .lew-upload-input {
      position: fixed;
      left: -100vw;
      opacity: 0;
      z-index: -99;
    }
  }
  .lew-upload-label {
    user-select: none;
  }
  .lew-upload-label-readonly {
    user-select: text;
    pointer-events: none; //鼠标点击不可修改
  }

  .lew-upload-label-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
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
        transition: var(--lew-form-transition);
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

.upload-list-move,
.upload-list-enter-active,
.upload-list-leave-active {
  transition: all 0.25s cubic-bezier(0.55, 0, 0.1, 1);
}

.upload-list-enter-from,
.upload-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.upload-list-leave-active {
  position: absolute !important;
}
</style>
