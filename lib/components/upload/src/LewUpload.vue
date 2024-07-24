<script setup lang="ts">
import { cloneDeep, isNumber } from 'lodash'
import { uploadProps } from './props'
import type { FileItem, UploadStatus } from './props'
import { any2px, getUUId, formatBytes, getFileIcon } from 'lew-ui/utils'
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
  complete: '已上传'
}

const statusColorMap: Record<UploadStatus, string> = {
  success: 'green',
  fail: 'red',
  uploading: 'blue',
  pending: 'mint',
  complete: 'gray'
}
const statusIconMap: Record<UploadStatus, string> = {
  success: 'check',
  fail: 'alert-circle',
  uploading: 'loader',
  pending: 'coffee',
  complete: 'check'
}

const props = defineProps(uploadProps)
const fileList = ref<FileItem[]>([])
const emit = defineEmits(['change'])
const inputRef = ref<HTMLInputElement | null>(null)
const dropActive = ref(false)

const addImageToList = (files: any) => {
  let _files: FileItem[] = Array.from(files).map((file: any) => {
    return {
      id: getUUId(),
      name: file.name,
      status: 'pending',
      percent: 0,
      size: file.size,
      file
    }
  })

  // 清空
  if (inputRef.value) {
    inputRef.value.value = ''
  }

  fileList.value = [..._files, ...cloneDeep(fileList.value)]
  _files.forEach((e) => {
    props.uploadHandle({ ...e, setFileItem })
  })
}

const reUpload = (id: string) => {
  const index = fileList.value.findIndex((e) => e.id === id)
  if (index >= 0) {
    const item = fileList.value[index]
    setFileItem({ id, percent: 0, status: 'uploading' })
    props.uploadHandle({ ...item, setFileItem })
  } else {
    LewMessage.error('文件不存在')
  }
}

const clickUpload = (e: any) => {
  const files = e.target.files
  addImageToList(files)
}
// 拖拽上传
const dropUpload = (e: any) => {
  let files = e.dataTransfer.files
  dropActive.value = false
  e.stopPropagation()
  e.preventDefault()
  addImageToList(files)
}

// 监听粘贴操作
const pasteUpload = (e: any) => {
  const items = e.clipboardData.items //  获取剪贴板中的数据
  let files: any = null //  用来保存 files 对象
  if (items.length > 0) {
    //  判断剪贴板中是否是文件
    if (items[0].kind == 'file') {
      files = items[0].getAsFile()
      addImageToList([files])
    }
  }
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

const setFileItem = ({
  id,
  percent,
  status,
  url
}: {
  id: string
  percent?: number
  status?: UploadStatus
  url?: string
}) => {
  const index = fileList.value.findIndex((e) => e.id === id)
  if (index >= 0) {
    if (percent) {
      let _percent = percent
      if (_percent > 100) _percent = 100
      if (_percent < 0) _percent = 0
      fileList.value[index].percent = _percent
    }
    if (status) {
      fileList.value[index].status = status
    }
    if (url) {
      fileList.value[index].url = url
    }
  }
}

const deleteFile = (id: string) => {
  LewDialog.error({
    title: '移除文件',
    okText: '移除',
    content: '你是否要移除该文件，此操作会立即生效，请谨慎操作！',
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      const index = fileList.value.findIndex((e) => e.id === id)
      fileList.value.splice(index, 1)
      return true
    }
  })
}

const checkUrlIsImg = (url?: string = '') => {
  // 图片正则
  const reg = /\.(jpg|jpeg|png|webp|bmp|gif)$/i
  return reg.test(url)
}
</script>

<template>
  <lew-flex class="lew-upload-wrapper" direction="y" gap="10">
    <label style="width: 100%">
      <lew-flex
        ref="dropRef"
        @paste="pasteUpload"
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
          stroke-width="1.4"
          class="lew-upload-icon"
          :size="uploadIconFontSizeMap[size]"
          type="upload-cloud"
        />

        <div
          :style="{
            fontSize: `${any2px(tipFontSizeMap[size])}`
          }"
          class="lew-upload-tip"
        >
          {{ dropActive ? '松开鼠标上传文件' : '点击、粘贴、拖拽文件到此处' }}
        </div>
        <div
          :style="{
            fontSize: `${any2px(maxSizeFontSizeMap[size])}`
          }"
          class="lew-upload-max-size"
        >
          最大不可超过 100M
        </div>
      </lew-flex>
      <input
        ref="inputRef"
        type="file"
        multiple
        v-show="false"
        @input.stop
        @change.stop="clickUpload"
      />
    </label>

    <lew-flex v-show="fileList.length > 0" direction="y" class="lew-upload-file-list" gap="10">
      <transition-group name="upload-list">
        <lew-flex
          v-for="item in fileList"
          :key="item.id"
          class="lew-upload-file-item"
          mode="between"
          gap="8"
          :style="{
            padding: `var(--lew-form-upload-item-padding-${size})`
          }"
        >
          <lew-flex
            :style="{ width: `${fileIconSizeMap[size]}px`, height: `${fileIconSizeMap[size]}px` }"
            class="lew-upload-icon-wrapper"
          >
            <img v-if="checkUrlIsImg(item.url)" class="lew-upload-file-icon" :src="item.url" />
            <img v-else class="lew-upload-file-icon" :src="getFileIcon(item.name)" />
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
                  :text="item.name"
                  :style="{
                    width: `calc(100% - 20px)`,
                    fontSize: `${any2px(fileNameFontSizeMap[size])}`
                  }"
                  class="lew-upload-file-name"
                />
              </lew-flex>
            </lew-flex>
            <lew-flex
              class="lew-upload-progress"
              :class="{ 'lew-upload-progress-complete': item.status === 'success' }"
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
                <template v-if="item.status === 'uploading'">
                  {{ formatBytes((item.percent / 100) * item.size) + ' / ' }}
                </template>
                {{ formatBytes(item.size) }}
              </span>
              <lew-flex style="max-width: 200px" y="center" x="end">
                <lew-tag type="light" size="small" :color="statusColorMap[item.status]">
                  <template #left>
                    <lew-icon
                      size="12"
                      :type="statusIconMap[item.status]"
                      :animation="item.status === 'uploading' ? 'spin' : ''"
                    />
                  </template>
                  {{ statusMap[item.status] }}
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
      }

      .lew-upload-file-name {
        width: 100%;
        color: var(--lew-text-color-2);
      }
      .lew-upload-progress {
        position: relative;
        height: 20px;
        display: flex;
        align-items: center;
        overflow: hidden;
        animation: progressCompleted 0.25s;
        animation-fill-mode: forwards;
        animation-play-state: paused;
        animation-delay: 1000ms;

        @keyframes progressCompleted {
          0% {
            opacity: 1;
            height: 20px;
          }
          100% {
            opacity: 0;
            height: 0px;
          }
        }

        .lew-upload-progress-box {
          height: 20px;
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

      .lew-upload-progress-complete {
        animation-play-state: running;
      }

      .lew-upload-footer {
        font-size: 14px;
        white-space: nowrap;
        color: var(--lew-text-color-6);
      }
    }
  }
}
</style>
<style>
.upload-list-move,
.upload-list-enter-active,
.upload-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
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
