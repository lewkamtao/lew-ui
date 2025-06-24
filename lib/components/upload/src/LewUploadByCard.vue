<script setup lang="ts">
import { uploadByCardProps, statusConfig } from './props';
import type { UploadFileItem } from './props';
import { LewFlex, LewImage, LewTooltip, LewColor } from 'lew-ui';
import {
  any2px,
  getUniqueId,
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
const getCardSize: Record<string, number> = {
  small: 72,
  medium: 80,
  large: 88,
};

const getStatus = computed(() => (item: UploadFileItem) => {
  return statusConfig[item.status || 'complete'];
});

defineProps(uploadByCardProps);

const emit = defineEmits(['reUpload', 'deleteFile']);
const modelValue = defineModel<UploadFileItem[]>();
</script>

<template>
  <lew-flex
    v-show="(modelValue || []).length > 0"
    wrap
    class="lew-upload-file-card"
    gap="10"
  >
    <transition-group name="lew-upload-card">
      <lew-flex
        v-for="item in modelValue"
        :key="item.key || item.url"
        class="lew-upload-file-item"
        mode="between"
        gap="8"
        :style="{
          width: `${any2px(getCardSize[size])}`,
          height: `${any2px(getCardSize[size])}`,
        }"
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
          v-else-if="
            item.status &&
            !['complete', 'success', 'none', 'uploading'].includes(
              item.status as string
            )
          "
          v-tooltip="{
            content: getStatus(item).text,
            trigger: 'mouseenter',
          }"
          x="center"
          y="center"
          :style="{
            width: rightTopBtnSizeMap[size] + 'px',
            height: rightTopBtnSizeMap[size] + 'px',
            borderRadius: rightTopBorderRadiusMap[size] + 'px',
          }"
          class="lew-upload-tips-tag"
        >
          <Icon
            :size="rightTopBtnIconSizeMap[size]"
            type="tips"
            :color="getStatus(item).color as LewColor"
          />
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
        <lew-flex class="lew-upload-icon-wrapper">
          <lew-flex
            class="lew-upload-icon-box"
            x="center"
            y="center"
            :style="{
              transform: item.status === 'uploading' ? 'translateY(-7px)' : '',
            }"
          >
            <lew-image
              v-if="checkUrlIsImage(item.url)"
              :previewGroupKey="previewGroupKey"
              object-fit="contain"
              width="100%"
              height="100%"
              class="lew-upload-file-image"
              :src="item.url"
            />
            <img
              :style="{
                width: `${fileIconSizeMap[size]}px`,
                height: `${fileIconSizeMap[size]}px`,
              }"
              v-else
              class="lew-upload-file-icon"
              :src="getFileIcon(item.name as string)"
            />
          </lew-flex>
        </lew-flex>
        <transition name="fade">
          <lew-flex
            v-if="item.status === 'uploading'"
            class="lew-upload-progress"
            x="start"
          >
            <lew-flex
              class="lew-upload-progress-line"
              :style="{
                width: `${(item.percent || 0) > 100 ? 100 : item.percent}%`,
                background: 'var(--lew-color-blue)',
              }"
            >
            </lew-flex>
            <lew-flex class="lew-upload-progress-line-bg"> </lew-flex>
          </lew-flex>
        </transition>
      </lew-flex>
    </transition-group>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-upload-file-card {
  position: relative;
  .lew-upload-file-item {
    position: relative;
    border: 1px var(--lew-bgcolor-3) solid;
    box-shadow: 0px 1px 5px rgba($color: #000000, $alpha: 0.07);
    box-sizing: border-box;
    border-radius: var(--lew-border-radius-small);
    .lew-upload-progress {
      position: absolute;
      bottom: 14px;
      height: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 20px);
      z-index: 33;
      box-sizing: border-box;
      transition: all var(--lew-form-transition-ease);
      .lew-upload-progress-line {
        z-index: 9;
        border-radius: 2px;
        height: 4px;
        transition: var(--lew-form-transition-ease);
      }
      .lew-upload-progress-line-bg {
        position: absolute;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
        z-index: 7;
        border-radius: 2px;
        height: 4px;
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
    }

    .lew-upload-reupload-btn,
    .lew-upload-delete-btn,
    .lew-upload-tips-tag {
      position: absolute;
      top: -7px;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      transition: all var(--lew-form-transition-ease);
      cursor: pointer;
      border: 1px var(--lew-bgcolor-3) solid;
      box-shadow: 0px 1px 5px rgba($color: #000000, $alpha: 0.07);
      z-index: 9;
      &:hover {
        transform: scale(1.1);
      }
      &:active {
        transform: scale(1);
      }
    }
    .lew-upload-tips-tag {
      right: 18px;
      background-color: var(--lew-bgcolor-0);
      color: var(--lew-color-white);
    }
    .lew-upload-reupload-btn {
      right: 18px;
      background-color: var(--lew-color-blue);
      color: var(--lew-color-white);
    }
    .lew-upload-delete-btn {
      right: -7px;
      background-color: var(--lew-color-red);
      color: var(--lew-color-white);
    }

    .lew-upload-icon-wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      transition: all var(--lew-form-transition-ease);
      border-radius: var(--lew-border-radius-small);
      overflow: hidden;
      background-color: var(--lew-bgcolor-0);

      .lew-upload-file-icon {
        border-radius: 4px;
        overflow: hidden;
      }
      .lew-upload-file-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 4px;
        overflow: hidden;
      }
    }
    :deep() {
      .lew-image-wrapper {
        background-color: var(--lew-bgcolor-0);
      }
    }
  }
  .lew-upload-icon-box {
    width: 100%;
    height: 100%;
    transition: all var(--lew-form-transition-ease);
  }
}

.lew-upload-card-move,
.lew-upload-card-enter-active,
.lew-upload-card-leave-active {
  transition: all var(--lew-form-transition-bezier);
}

.lew-upload-card-enter-from,
.lew-upload-card-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.lew-upload-card-leave-active {
  position: absolute !important;
}
</style>
