<script setup lang="ts">
import { uploadByListProps, statusConfig } from './props';
import type { UploadFileItem } from './props';
import { LewFlex, LewTag, LewImage, LewTextTrim, LewTooltip } from 'lew-ui';
import type { LewColor } from 'lew-ui';
import {
  any2px,
  getUniqueId,
  formatBytes,
  getFileIcon,
  checkUrlIsImage,
} from 'lew-ui/utils';
import Icon from 'lew-ui/utils/Icon.vue';

// 获取app
const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip);
}

const previewGroupKey = getUniqueId();

const fileIconSizeMap: Record<string, number> = {
  small: 30,
  medium: 36,
  large: 44,
};

const uploadItemPaddingMap: Record<string, number> = {
  small: 8,
  medium: 10,
  large: 12,
};

const footerFontSizeMap: Record<string, number> = {
  small: 11,
  medium: 12,
  large: 14,
};
const fileNameFontSizeMap: Record<string, number> = {
  small: 13,
  medium: 14,
  large: 16,
};

const rightTopBtnSizeMap: Record<string, number> = {
  small: 16,
  medium: 18,
  large: 20,
};

const rightTopBtnIconSizeMap: Record<string, number> = {
  small: 10,
  medium: 12,
  large: 14,
};

const rightTopBorderRadiusMap: Record<string, number> = {
  small: 7,
  medium: 7.8,
  large: 8.5,
};

defineProps(uploadByListProps);

const emit = defineEmits(['reUpload', 'deleteFile']);
const modelValue = defineModel<UploadFileItem[]>();

const getFileName = computed(() => (item: UploadFileItem) => {
  return item.name || getLastValueAfterSlash(item.url);
});

// 定义提取最后一个/后面的所有值方法
const getLastValueAfterSlash = (url: string = '') => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
};

const getStatus = computed(() => (item: UploadFileItem) => {
  return statusConfig[item.status || 'complete'];
});
</script>

<template>
  <lew-flex
    v-show="(modelValue || []).length > 0"
    direction="y"
    class="lew-upload-file-list"
    gap="10"
  >
    <transition-group name="lew-upload-list">
      <lew-flex
        v-for="item in modelValue"
        :key="item.key || item.url"
        class="lew-upload-file-item"
        mode="between"
        gap="8"
        :style="{
          padding: uploadItemPaddingMap[size] + 'px',
        }"
      >
        <lew-flex
          :style="{
            width: `${fileIconSizeMap[size]}px`,
            height: `${fileIconSizeMap[size]}px`,
          }"
          class="lew-upload-icon-wrapper"
        >
          <lew-image
            v-if="checkUrlIsImage(item.url)"
            width="100%"
            height="100%"
            :previewGroupKey="previewGroupKey"
            class="lew-upload-file-image"
            :src="item.url"
          />
          <img
            v-else
            class="lew-upload-file-icon"
            :src="getFileIcon(item.name as string)"
          />
        </lew-flex>
        <lew-flex
          class="lew-upload-file-info"
          :style="{ width: `calc(100% - ${fileIconSizeMap[size]}px - 8px)` }"
          direction="y"
          gap="0"
        >
          <lew-flex
            v-if="item.status === 'fail'"
            @click.stop="emit('reUpload', item.key)"
            x="center"
            y="center"
            :style="{
              width: rightTopBtnSizeMap[size] + 'px',
              height: rightTopBtnSizeMap[size] + 'px',
              borderRadius: rightTopBorderRadiusMap[size] + 'px',
            }"
            class="lew-upload-reupload-btn"
          >
            <Icon :size="rightTopBtnIconSizeMap[size]" type="rotate-cw" />
          </lew-flex>

          <lew-flex
            @click.stop="emit('deleteFile', item.key)"
            x="center"
            y="center"
            :style="{
              width: rightTopBtnSizeMap[size] + 'px',
              height: rightTopBtnSizeMap[size] + 'px',
              borderRadius: rightTopBorderRadiusMap[size] + 'px',
            }"
            class="lew-upload-delete-btn"
          >
            <Icon :size="rightTopBtnIconSizeMap[size]" type="close"></Icon>
          </lew-flex>
          <lew-flex mode="between" gap="5" y="center">
            <lew-flex y="center" x="start" gap="5">
              <lew-text-trim
                :text="getFileName(item)"
                :style="{
                  width: `calc(100% - 30px)`,
                  fontSize: `${any2px(fileNameFontSizeMap[size])}`,
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
                :style="{
                  width: `${item.percent > 100 ? 100 : item.percent}%`,
                }"
                class="lew-upload-progress-bar-upload"
              >
              </span>
            </lew-flex>
          </lew-flex>
          <lew-flex mode="between" y="center" class="lew-upload-footer">
            <span
              :style="{
                fontSize: `${any2px(footerFontSizeMap[size])}`,
              }"
            >
              <template
                v-if="item.status === 'uploading' && item.percent && item.size"
              >
                {{ formatBytes((item.percent / 100) * item.size) + ' / ' }}
              </template>
              <span v-if="item.size"> {{ formatBytes(item.size) }}</span>
            </span>
            <lew-flex style="max-width: 200px" y="center" x="end">
              <lew-tag
                v-if="item.status && item.status !== 'pending'"
                type="light"
                size="small"
                :key="item.status"
                :color="getStatus(item).color as LewColor"
              >
                <template #left>
                  <Icon
                    :size="12"
                    :type="item.status"
                    dark
                    :loading="item.status === 'uploading'"
                  />
                </template>
                {{ getStatus(item).text }}
              </lew-tag>
            </lew-flex>
          </lew-flex>
        </lew-flex>
      </lew-flex>
    </transition-group>
  </lew-flex>
</template>

<style lang="scss" scoped>
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

.lew-upload-list-move,
.lew-upload-list-enter-active,
.lew-upload-list-leave-active {
  transition: all var(--lew-form-transition-bezier);
}

.lew-upload-list-enter-from,
.lew-upload-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.lew-upload-list-leave-active {
  position: absolute !important;
}
</style>
