<script setup lang="ts">
import { LewFlex, LewPopover, LewTag, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  valueLayout: {
    type: String,
    default: 'text',
  },
  valueTextSplit: {
    type: String,
    default: ',',
  },
  width: {
    type: String,
    default: '100%',
  },
  formatItems: {
    type: null,
  },
  isFocus: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['clear', 'delete'])
const lewSelectRef = ref()
const lewPopoverValueRef = ref()
const selectWidth = ref()

const modelValue: any = defineModel()

function updateWidths() {
  if (lewSelectRef.value) {
    selectWidth.value = lewSelectRef.value.clientWidth
  }
}

let resizeObserver: ResizeObserver | null = null

function clearHandle() {
  emit('clear')
}

function deleteTag(value: string) {
  emit('delete', value)
}

const getSelectClassName = computed(() => {
  let { clearable, size, disabled, readonly } = props
  clearable = clearable && (modelValue.value || []).length > 0
  return object2class('lew-select', {
    clearable,
    size,
    disabled,
    readonly,
  })
})

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16,
  }
  return size[props.size]
})

onMounted(() => {
  updateWidths()
  // 设置 ResizeObserver 监听宽度变化
  if (lewSelectRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateWidths()
    })
    resizeObserver.observe(lewSelectRef.value)
  }
})

onUnmounted(() => {
  // 清理 ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

defineExpose({
  clearHandle,
})

const showClearButton = computed(() => {
  return props.clearable && (modelValue.value || []).length > 0 && !props.readonly
})

const hasSelectedItems = computed(() => {
  return (modelValue.value || []).length > 0
})

const showPlaceholder = computed(() => {
  return (modelValue.value || []).length === 0
})

const selectedItemsText = computed(() => {
  if (!hasSelectedItems.value)
    return ''
  return props.formatItems.map((item: any) => item.label).join(props.valueTextSplit)
})

const clearButtonIconClass = computed(() => {
  return {}
})

const placeholderText = computed(() => {
  return props.placeholder || locale.t('selectMultiple.placeholder')
})

const textValueStyle = computed(() => {
  return {
    width: `calc(${selectWidth.value - 24}px)`,
  }
})

const placeholderStyle = computed(() => {
  return {}
})

const showTagLayout = computed(() => {
  return props.valueLayout === 'tag'
})

// 新增计算属性：选择器图标类名
const selectIconClass = computed(() => {
  return {
    'lew-icon-select-hide': showClearButton.value,
  }
})
</script>

<template>
  <div
    ref="lewSelectRef"
    class="lew-select"
    :class="getSelectClassName"
    :style="{ width: any2px(width) }"
  >
    <div v-if="loading" class="lew-icon-loading-box">
      <CommonIcon :size="getIconSize" :loading="loading" type="loading" />
    </div>
    <CommonIcon
      v-else
      :size="getIconSize"
      type="chevron-down"
      class="lew-icon-select"
      :class="selectIconClass"
    />
    <transition name="lew-form-icon-ani">
      <CommonIcon
        v-if="showClearButton"
        :size="getIconSize"
        type="close"
        class="lew-form-icon-close"
        :class="clearButtonIconClass"
        @click.stop="clearHandle"
      />
    </transition>
    <template v-if="hasSelectedItems">
      <LewFlex
        v-if="showTagLayout"
        x="start"
        y="center"
        style="padding: 4.5px"
        gap="4px"
        wrap
        class="lew-value"
      >
        <transition-group name="list">
          <LewTag
            v-for="item in formatItems"
            :key="item.value"
            type="light"
            :size="props.size as any"
            :closeable="!disabled && !readonly"
            @close="deleteTag(item.value)"
          >
            {{ item.label }}
          </LewTag>
        </transition-group>
      </LewFlex>
      <template v-else>
        <LewPopover
          ref="lewPopoverValueRef"
          trigger="hover"
          popover-body-class-name="lew-select-multiple-popover-tag"
          placement="top-start"
          :delay="[250, 250]"
          style="width: 100%"
          :trigger-width="width"
        >
          <template #trigger>
            <div :style="textValueStyle" class="lew-select-multiple-text-value">
              {{ selectedItemsText }}
            </div>
          </template>
          <template #popover-body>
            <LewFlex
              x="start"
              y="center"
              gap="5px"
              wrap
              :style="{
                maxWidth: any2px(selectWidth),
              }"
              class="lew-select-multiple-tag-value"
            >
              <LewTag
                v-for="item in formatItems"
                :key="item.value"
                type="light"
                :size="props.size as any"
                :closeable="!disabled && !readonly"
                @close="deleteTag(item.value)"
              >
                {{ item.label }}
              </LewTag>
            </LewFlex>
          </template>
        </LewPopover>
      </template>
    </template>
    <div v-show="showPlaceholder" :style="placeholderStyle" class="lew-placeholder">
      {{ placeholderText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-select {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  transition: all var(--lew-form-transition-ease);
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  box-shadow: var(--lew-form-box-shadow);

  .lew-icon-loading-box {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }

  .lew-icon-select {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%) rotate(0deg);
    transition: all var(--lew-form-transition-bezier);
    opacity: var(--lew-form-icon-opacity);

    &-hide {
      opacity: 0;
      transform: translate(100%, -50%);
    }
  }

  .lew-placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-select-label-multiple {
    width: 100%;
    display: flex;
    align-items: center;

    .lew-popover {
      display: flex;
      align-items: center;

      > div {
        display: flex;
        align-items: center;
      }
    }
  }

  :deep() {
    .lew-tag {
      background-color: var(--lew-bgcolor-0) !important;
    }
  }

  .lew-placeholder {
    width: calc(100% - 24px);
    transition: all 0.2s;
    height: 100%;
  }

  .lew-value {
    display: flex;
    align-items: center;
    width: calc(100% - 24px);
    transition: all 0.2s;
    min-height: 100%;
    padding: 2px 0;
    box-sizing: border-box;
  }

  .lew-select-multiple-text-value {
    height: 30px;
    line-height: 30px;
  }

  .lew-placeholder,
  .lew-select-multiple-text-value {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
  }

  &:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  &:active {
    background-color: var(--lew-form-bgcolor-active);
  }
}

.lew-select-size {
  &-small {
    min-height: var(--lew-form-item-height-small);

    .lew-placeholder,
    .lew-select-multiple-text-value {
      font-size: var(--lew-form-font-size-small);
      margin-left: 10px;
      padding-right: 26px;
      line-height: calc(var(--lew-form-item-height-small) - (var(--lew-form-border-width) * 2));
    }

    .lew-value {
      padding: 1px 0;
    }
  }

  &-medium {
    min-height: var(--lew-form-item-height-medium);

    .lew-placeholder,
    .lew-select-multiple-text-value {
      font-size: var(--lew-form-font-size-medium);
      margin-left: 12px;
      padding-right: 28px;
      line-height: calc(var(--lew-form-item-height-medium) - (var(--lew-form-border-width) * 2));
    }

    .lew-value {
      padding: 2px 0;
    }
  }

  &-large {
    min-height: var(--lew-form-item-height-large);

    .lew-placeholder,
    .lew-select-multiple-text-value {
      font-size: var(--lew-form-font-size-large);
      margin-left: 14px;
      padding-right: 30px;
      line-height: calc(var(--lew-form-item-height-large) - (var(--lew-form-border-width) * 2));
    }

    .lew-value {
      padding: 3px 0;
    }
  }
}

.lew-select-focus {
  background-color: var(--lew-form-bgcolor-focus);
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  :deep() {
    .lew-tag {
      background-color: var(--lew-color-primary-light) !important;
    }
  }

  .lew-icon-select {
    transform: translateY(-50%) rotate(180deg);
    color: var(--lew-text-color-1);

    &-hide {
      opacity: 0;
      transform: translate(100%, -50%) rotate(180deg);
    }
  }
}

.lew-select-focus:hover {
  background-color: var(--lew-form-bgcolor-focus);
}

.lew-select-readonly {
  pointer-events: none;

  .lew-select {
    user-select: text;
  }
}

.lew-select-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;

  &:hover {
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  }
}

.lew-select-init-loading {
  pointer-events: none;
  cursor: wait;

  .lew-placeholder,
  .lew-select-multiple-text-value {
    cursor: wait;
  }
}

.list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all var(--lew-form-transition-bezier);
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(-5px);
  }

  &-leave-to {
    opacity: 0;
    transform: scaleX(0);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
