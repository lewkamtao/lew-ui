<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { uploadProps } from './props'
import type { FileItem, UploadStatus } from './props'
import { any2px, getUUId, formatBytes } from 'lew-ui/utils'

const tipFontSizeMap: Record<string, number> = {
  small: 12,
  medium: 14,
  large: 16
}
const fileIconSizeMap: Record<string, number> = {
  small: 14,
  medium: 16,
  large: 18
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
const deleteBtnSizeMap: Record<string, number> = {
  small: 16,
  medium: 18,
  large: 20
}

const statusMap: Record<UploadStatus, string> = {
  success: '上传完成',
  fail: '上传失败',
  uploading: '上传中',
  pending: '等待上传'
}

const statusColorMap: Record<UploadStatus, string> = {
  success: 'green',
  fail: 'red',
  uploading: 'blue',
  pending: 'mint'
}
const statusIconMap: Record<UploadStatus, string> = {
  success: 'check',
  fail: 'alert-circle',
  uploading: 'loader',
  pending: 'coffee'
}

const props = defineProps(uploadProps)
const fileList = ref<FileItem[]>([])
const emit = defineEmits(['change'])
const inputRef = ref<HTMLInputElement | null>(null)

const change = (e: any) => {
  const files = e.target.files

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
    props.uploadHandle({ ...e, updateStatus, updateProgress })
  })
}

const updateProgress = ({ id, percent }: { id: string; percent: number }) => {
  const index = fileList.value.findIndex((e) => e.id === id)
  if (index >= 0) {
    let _percent = percent
    if (_percent > 100) _percent = 100
    if (_percent < 0) _percent = 0
    fileList.value[index].percent = _percent
  }
}

const updateStatus = ({ id, status }: { id: string; status: UploadStatus }) => {
  const index = fileList.value.findIndex((e) => e.id === id)
  if (index >= 0) {
    fileList.value[index].status = status
  }
}

const deleteFile = ({ id }: { id: string }) => {
  LewDialog.error({
    title: '移除文件',
    okText: '移除',
    content: '你是否要移除该文件，此操作会立即生效，请谨慎操作！',
    closeOnClickOverlay: true,
    closeByEsc: true,
    ok: () => {
      const _fileList = cloneDeep(fileList.value)
      const index = _fileList.findIndex((e) => e.id === id)
      _fileList.splice(index, 1)
      fileList.value = _fileList
      return true
    }
  })
}
</script>

<template>
  <lew-flex class="lew-upload-wrapper" direction="y" gap="0">
    <label style="width: 100%">
      <lew-flex
        direction="y"
        x="center"
        y="center"
        class="lew-upload"
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
          点击 或 拖动文件到此处
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
      <input ref="inputRef" type="file" multiple v-show="false" @input.stop @change.stop="change" />
    </label>

    <lew-flex direction="y" class="lew-upload-file-list" gap="10">
      <lew-flex
        class="lew-upload-file-item"
        :style="{
          padding: `var(--lew-form-upload-item-padding-${size})`
        }"
        direction="y"
        v-for="item in fileList"
        gap="0"
        :key="item.id"
      >
        <lew-flex
          @click.stop="deleteFile({ id: item.id })"
          x="center"
          y="center"
          :style="{ width: deleteBtnSizeMap[size] + 'px', height: deleteBtnSizeMap[size] + 'px' }"
          class="lew-upload-delete-btn"
        >
          <lew-icon :size="tipFontSizeMap[size]" type="x"></lew-icon>
        </lew-flex>
        <lew-flex mode="between" gap="5" y="center">
          <lew-flex
            :style="{
              width: 'calc(100% - 30px)'
            }"
            y="center"
            gap="5"
          >
            <lew-icon class="lew-upload-file-icon" :size="fileIconSizeMap[size]" type="file" />
            <lew-text-trim
              :text="item.name"
              :style="{
                fontSize: `${any2px(fileNameFontSizeMap[size])}`
              }"
              class="lew-upload-file-name"
            >
            </lew-text-trim>
          </lew-flex>
        </lew-flex>
        <lew-flex
          class="lew-upload-progress"
          :class="{ 'lew-upload-progress-uploading': item.status === 'uploading' }"
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
</template>

<style lang="scss" scoped>
.lew-upload-wrapper {
  min-width: 320px;
  .lew-upload {
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
  .lew-upload:hover {
    border-color: var(--lew-form-border-color-focus);
    background-color: var(--lew-color-blue-light);
  }
  .lew-upload:active {
    border-color: var(--lew-form-border-color-focus);
    background-color: var(--lew-form-bgcolor-focus);
  }
  .lew-upload-file-list {
    margin-top: 10px;
    .lew-upload-file-item {
      position: relative;
      background-color: var(--lew-bgcolor-0);
      border: 1px var(--lew-bgcolor-3) solid;
      border-radius: var(--lew-border-radius-small);
      box-shadow: 0px 1px 5px rgba($color: #000000, $alpha: 0.07);
      box-sizing: border-box;
      .lew-upload-delete-btn {
        position: absolute;
        right: -7px;
        top: -7px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        border-radius: var(--lew-border-radius-small);
        background-color: var(--lew-color-red);
        transition: var(--lew-form-transition);
        color: var(--lew-color-white);
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
          transform: scale(1.1);
        }
        &:active {
          transform: scale(1);
        }
      }
      .lew-upload-file-icon {
        color: var(--lew-text-color-2);
      }
      .lew-upload-file-name {
        width: calc(100% - 20px);
        color: var(--lew-text-color-2);
      }
      .lew-upload-progress {
        position: relative;
        height: 0px;
        display: flex;
        align-items: center;
        transition: all 0.25s;
        overflow: hidden;
        opacity: 0;

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

      .lew-upload-progress-uploading {
        height: 20px;
        opacity: 1;
      }

      .lew-upload-footer {
        font-size: 14px;
        color: var(--lew-text-color-6);
      }
    }
  }
}
</style>
