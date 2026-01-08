<script setup lang="ts">
import type { LewContextMenusOption } from 'lew-ui'
import { useMagicKeys } from '@vueuse/core'
import { LewDropdown, LewFlex, LewMessage, LewTooltip, locale } from 'lew-ui'
import CloseIcon from 'lew-ui/_components/CloseIcon.vue'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { inputEmits } from './emits'
import { inputProps } from './props'

// Props & Emits
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

// Models
const modelValue = defineModel<string | undefined>({ required: true })
const prefixValue = defineModel<string | undefined>('prefixValue')
const suffixValue = defineModel<string | undefined>('suffixValue')

// Constants
const COPY_SUCCESS_DELAY = 2000

// Refs
const lewInputRef = ref<HTMLInputElement>()
const lewInputCountRef = ref<HTMLElement>()
const isCopy = ref(false)
const _type = ref(props.type)
const isFocus = ref(false)
const state = reactive({
  prefixesDropdown: 'hide',
  suffixDropdown: 'hide',
})

let timer: NodeJS.Timeout | null = null

// Initialize tooltip directive
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

// Computed
const getIconSize = computed(
  () =>
    ({
      small: 14,
      medium: 15,
      large: 16,
    }[props.size]),
)

// 右侧图标显示状态计算
const showCloseIcon = computed(() => {
  return props.clearable && modelValue.value && !props.readonly
})

const showPasswordIcon = computed(() => {
  return props.showPassword && props.type === 'password'
})

const showCopyIcon = computed(() => {
  return (
    props.copyable
    && props.readonly
    && modelValue.value
    && !props.suffix
    && !showCloseIcon.value
    && !showPasswordIcon.value
  )
})

const rightIconCount = computed(() => {
  let count = 0
  if (showCloseIcon.value)
    count++
  if (showPasswordIcon.value)
    count++
  if (showCopyIcon.value)
    count++
  return count
})

const getInputViewStyle = computed(() => {
  return {
    width: props.autoWidth ? 'auto' : any2px(props.width),
  }
})

const getPrefixesDropdownStyle = computed(() => {
  return {
    fontSize: `var(--lew-form-font-size-${props.size})`,
  }
})

const getSuffixDropdownStyle = computed(() => {
  return {
    fontSize: `var(--lew-form-font-size-${props.size})`,
  }
})

const getInputBoxStyle = computed(() => {
  return {
    minWidth: any2px(props.minWidth),
  }
})

const getInputStyle = computed(() => {
  const { showCount } = props
  const countWidth = lewInputCountRef.value?.offsetWidth || 0
  // 每个图标大约占 20px（图标本身 + gap），如果有多个图标需要累加
  const iconWidth = rightIconCount.value * 20
  // 如果有 count，需要额外空间（12px 间距）
  const countSpace = showCount && modelValue.value ? countWidth + 12 : 0
  // 如果有图标或 count，需要额外空间（10px 右侧 padding）
  const rightSpace = rightIconCount.value > 0 || countSpace > 0 ? 10 : 0
  return {
    width: `calc(100% - ${iconWidth + countSpace + rightSpace}px)`,
  }
})

const getType = computed(() =>
  props.type === 'password' ? _type.value : props.type,
)

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, align, autoWidth } = props
  return object2class('lew-input-view', {
    size,
    readonly,
    disabled,
    align,
    autoWidth,
  })
})

const getPrefixesLabel = computed(() => {
  return (
    props.prefixesOptions.find(e => e.value === prefixValue.value)?.label
    || ''
  )
})

const getSuffixLabel = computed(() => {
  return (
    props.suffixOptions.find(e => e.value === suffixValue.value)?.label || ''
  )
})

const computedPrefixesOptions = computed(() => {
  return props.prefixesOptions.map((e) => {
    return {
      ...e,
      onClick: () => {
        prefixValue.value = e.value
      },
    }
  })
})

const computedSuffixOptions = computed(() => {
  return props.suffixOptions.map((e) => {
    return {
      ...e,
      onClick: () => {
        suffixValue.value = e.value
      },
    }
  })
})

// Methods
function clear() {
  modelValue.value = undefined
  emit('clear')
  emit('change', undefined)
}

function focus() {
  lewInputRef.value?.focus()
}

function blur() {
  lewInputRef.value?.blur()
}

function showPasswordFn() {
  _type.value = _type.value === 'text' ? 'password' : 'text'
}

function _focus(e: FocusEvent) {
  if (props.selectByFocus) {
    (e.currentTarget as HTMLInputElement)?.select()
  }
  emit('focus', e)
  isFocus.value = true
}

function _blur(e: FocusEvent) {
  emit('blur', e)
  isFocus.value = false
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('input', target.value)
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

function prefixesChange(item: LewContextMenusOption) {
  prefixValue.value = item.value
}

function suffixChange(item: LewContextMenusOption) {
  suffixValue.value = item.value
}

function copy() {
  const textarea = document.createElement('textarea')
  textarea.style.cssText = 'position:fixed;top:-200vh;'
  textarea.value = modelValue.value as string

  document.body.appendChild(textarea)
  textarea.select()

  if (document.execCommand('copy')) {
    LewMessage.success(locale.t('input.copySuccess'))
    isCopy.value = true
    timer = setTimeout(() => {
      isCopy.value = false
    }, COPY_SUCCESS_DELAY)
  }
  else {
    LewMessage.error(locale.t('input.copyFailed'))
  }

  document.body.removeChild(textarea)
}

// Watchers
watch(
  () => props.type,
  (v) => {
    if (v === 'password') {
      _type.value = 'password'
    }
  },
)

if (props.okByEnter) {
  const { enter } = useMagicKeys()
  watch(enter, (v) => {
    if (v && isFocus.value) {
      lewInputRef.value?.blur()
      emit('ok', modelValue.value)
    }
  })
}

// Lifecycle
onUnmounted(() => {
  if (timer)
    clearTimeout(timer)
})

// Expose
defineExpose({ focus, blur })
</script>

<template>
  <div
    class="lew-input-view"
    :class="getInputClassNames"
    :style="getInputViewStyle"
  >
    <div
      v-if="prefixes"
      v-tooltip="{
        content: prefixesTooltip,
        trigger: 'mouseenter',
      }"
      class="lew-input-prefixes"
    >
      <div v-if="prefixes === 'text'">
        {{ prefixValue }}
      </div>
      <div v-if="prefixes === 'icon'" class="lew-input-prefixes-icon">
        <CommonIcon :size="getIconSize" :type="prefixValue" />
      </div>
      <div v-if="prefixes === 'select'" class="lew-input-prefixes-select">
        <LewDropdown
          placement="bottom"
          trigger="click"
          :options="computedPrefixesOptions"
          @change="prefixesChange"
          @show="state.prefixesDropdown = 'show'"
          @hide="state.prefixesDropdown = 'hide'"
        >
          <LewFlex
            gap="5px"
            x="start"
            class="lew-input-prefixes-dropdown"
            :class="{
              'lew-input-prefixes-dropdown-open':
                state.prefixesDropdown === 'show',
            }"
            :style="getPrefixesDropdownStyle"
          >
            <div>
              {{ getPrefixesLabel }}
            </div>
            <CommonIcon
              :size="getIconSize"
              type="chevron-down"
              class="icon-select"
            />
          </LewFlex>
        </LewDropdown>
      </div>
    </div>
    <div class="lew-input-box" :style="getInputBoxStyle">
      <input
        ref="lewInputRef"
        v-model="modelValue"
        class="lew-input"
        :style="getInputStyle"
        autocomplete="new-password"
        :disabled="disabled"
        :placeholder="placeholder ? placeholder : locale.t('input.placeholder')"
        :type="getType"
        :readonly="readonly"
        :maxlength="maxLength"
        @input="handleInput"
        @change="handleChange"
        @blur="_blur"
        @focus="_focus"
      >
      <label v-if="autoWidth" class="lew-input-auto-width">
        {{ modelValue }}
      </label>
      <label v-if="autoWidth && clearable" class="lew-input-auto-width-clear" />
      <div
        v-if="
          showCloseIcon ||
            showPasswordIcon ||
            showCopyIcon ||
            (modelValue && showCount)
        "
        class="lew-input-controls"
      >
        <div
          v-if="modelValue && showCount"
          ref="lewInputCountRef"
          class="lew-input-count"
        >
          {{ typeof modelValue === "string" ? modelValue.length : 0
          }}{{ maxLength ? ` / ${maxLength}` : "" }}
        </div>
        <CloseIcon
          v-if="showCloseIcon"
          :size="size"
          class="lew-form-icon-close"
          @click.stop="clear"
        />
        <template v-if="showPasswordIcon">
          <CommonIcon
            v-show="_type === 'text'"
            :size="getIconSize"
            type="eye"
            class="lew-input-icon-action"
            @mousedown.prevent=""
            @click="showPasswordFn"
          />
          <CommonIcon
            v-show="_type === 'password'"
            :size="getIconSize"
            type="eye_off"
            class="lew-input-icon-action"
            @mousedown.prevent=""
            @click="showPasswordFn"
          />
        </template>
        <CommonIcon
          v-if="showCopyIcon"
          :size="getIconSize"
          :type="isCopy ? 'check' : 'copy'"
          class="lew-input-icon-action"
          :class="{ 'lew-input-copy-btn-check': isCopy }"
          @click.stop="copy"
        />
      </div>
    </div>

    <div
      v-if="suffix"
      v-tooltip="{
        content: suffixTooltip,
        trigger: suffixTooltip ? 'mouseenter' : '',
      }"
      class="lew-input-suffix"
    >
      <div v-if="suffix === 'text'">
        {{ suffixValue }}
      </div>
      <div v-if="suffix === 'icon'" class="lew-input-suffix-icon">
        <CommonIcon :size="getIconSize" :type="suffixValue" />
      </div>
      <div v-if="suffix === 'select'" class="lew-input-suffix-select">
        <LewDropdown
          placement="bottom"
          trigger="click"
          :options="computedSuffixOptions"
          @change="suffixChange"
          @show="state.suffixDropdown = 'show'"
          @hide="state.suffixDropdown = 'hide'"
        >
          <LewFlex
            gap="5px"
            x="start"
            class="lew-input-suffix-dropdown"
            :class="{
              'lew-input-suffix-dropdown-open': state.suffixDropdown === 'show',
            }"
            :style="getSuffixDropdownStyle"
          >
            <div>{{ getSuffixLabel }}</div>
            <CommonIcon
              :size="getIconSize"
              type="chevron-down"
              class="icon-select"
            />
          </LewFlex>
        </LewDropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-view {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  border-radius: var(--lew-border-radius-small);
  box-shadow: var(--lew-form-box-shadow);
  transition:
    background-color var(--lew-form-transition-ease),
    border-color var(--lew-form-transition-ease);

  .lew-input-box {
    position: relative;
    display: inline-flex;
    flex: 1;
    flex-shrink: 0;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .lew-input {
      height: 100%;
    }
  }

  // 右侧控制容器（合并了 count 和图标）
  .lew-input-controls {
    position: absolute;
    top: 50%;
    right: 14px;
    z-index: 9;
    display: flex;
    align-items: center;
    gap: 4px;
    transform: translateY(-50%);
    // 覆盖父元素的 pointer-events: none，确保按钮可点击
    pointer-events: auto;
    .lew-form-icon-close {
      margin-right: -4px;
    }

    .lew-input-count {
      z-index: 2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      opacity: var(--lew-form-icon-opacity);
      transition: transform 0.25s;
    }

    .lew-input-icon-action {
      opacity: var(--lew-form-icon-opacity);
      cursor: pointer;
      transition: opacity var(--lew-form-transition-ease);
    }

    .lew-input-icon-action:hover {
      opacity: var(--lew-form-icon-opacity-hover);
    }
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    user-select: none;

    .icon-select {
      transition: transform var(--lew-form-transition-bezier);
    }

    .icon-select-up {
      transform: rotate(180deg);
    }
  }

  .lew-input-prefixes::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: var(--lew-bgcolor-4);
    content: '';
    transition: background-color var(--lew-form-transition-ease);
  }

  .lew-input-suffix::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background: var(--lew-bgcolor-4);
    content: '';
    transition: background-color var(--lew-form-transition-ease);
  }

  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    cursor: pointer;
  }

  .lew-input-prefixes-dropdown-open,
  .lew-input-suffix-dropdown-open {
    opacity: 0.4;

    .icon-select {
      transform: rotate(180deg);
    }
  }

  .lew-input-prefixes-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .lew-input-suffix-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .lew-input {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    color: var(--lew-text-color-1);
    text-overflow: ellipsis;
    background: none;
    border: none;
    outline: none;
  }

  .lew-input:invalid {
    text-decoration: line-through;
  }

  .lew-input::placeholder {
    color: rgb(165, 165, 165);
  }
}

.lew-input-view-align-left {
  .lew-input {
    text-align: left;
  }
}

.lew-input-view-align-center {
  .lew-input {
    text-align: center;
  }
}

.lew-input-view-align-right {
  .lew-input {
    text-align: right;
  }
}

.lew-input-view-autoWidth {
  position: relative;
  width: auto;

  .lew-input {
    position: absolute;
    top: 50%;
    left: 0px;
    display: inline-block;
    width: 100%;
    transform: translateY(-50%);
  }

  .lew-input-auto-width {
    box-sizing: border-box;
    width: auto;
    min-width: 60px;
    height: 1px;
    visibility: hidden;
  }

  .lew-input-box {
    padding: 0px;
  }
}

.lew-input-view-size-small {
  height: var(--lew-form-item-height-small);
  line-height: var(--lew-form-input-line-height-small);

  .lew-input-box {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
  }

  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-input-line-height-small);
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 7px;
  }

  .lew-input {
    height: var(--lew-form-item-height-small);
    font-size: var(--lew-form-font-size-small);
  }

  .lew-input-controls {
    height: var(--lew-form-item-height-small);

    .lew-input-count {
      font-size: 12px;
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-small);
    line-height: var(--lew-form-input-line-height-small);
  }

  .lew-input-auto-width-close {
    width: 18px;
  }
}

.lew-input-view-size-medium {
  height: var(--lew-form-item-height-medium);
  line-height: var(--lew-form-input-line-height-medium);

  .lew-input-box {
    padding: var(--lew-form-input-padding-medium);
    font-size: var(--lew-form-font-size-medium);
  }

  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    height: var(--lew-form-item-height-medium);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 9px;
  }

  .lew-input {
    height: var(--lew-form-item-height-medium);
    font-size: var(--lew-form-font-size-medium);
  }

  .lew-input-controls {
    height: var(--lew-form-item-height-medium);

    .lew-input-count {
      font-size: 13px;
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-input-auto-width-close {
    width: 20px;
  }
}

.lew-input-view-size-large {
  height: var(--lew-form-item-height-large);
  line-height: var(--lew-form-input-line-height-large);

  .lew-input-box {
    padding: var(--lew-form-input-padding-large);
    font-size: var(--lew-form-font-size-large);
  }

  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    height: var(--lew-form-item-height-large);
    line-height: var(--lew-form-input-line-height-large);
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 12px;
  }

  .lew-input {
    height: var(--lew-form-item-height-large);
    font-size: var(--lew-form-font-size-large);
  }

  .lew-input-controls {
    height: var(--lew-form-item-height-large);

    .lew-input-count {
      font-size: 14px;
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
  }

  .lew-input-auto-width-close {
    width: 22px;
  }
}

.lew-input-view-size-small.lew-input-view-autoWidth {
  .lew-input {
    width: calc(100% - 12px);
    padding: var(--lew-form-input-padding-small);
  }
}

.lew-input-view-size-medium.lew-input-view-autoWidth {
  .lew-input {
    width: calc(100% - 18px);
    padding: var(--lew-form-input-padding-medium);
  }
}

.lew-input-view-size-large.lew-input-view-autoWidth {
  .lew-input {
    width: calc(100% - 24px);
    padding: var(--lew-form-input-padding-large);
  }
}

.lew-input-view:hover {
  background-color: var(--lew-form-bgcolor-hover);

  .lew-input-prefixes::after {
    background: var(--lew-bgcolor-6);
  }

  .lew-input-suffix::before {
    background: var(--lew-bgcolor-6);
  }
}

.lew-input-view:focus-within {
  background-color: var(--lew-form-bgcolor-focus);
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  .lew-input-prefixes::after {
    background: var(--lew-bgcolor-4);
  }

  .lew-input-suffix::before {
    background: var(--lew-bgcolor-4);
  }
}

.lew-input-view-readonly {
  pointer-events: none;
}

.lew-input-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}

.lew-input-view-disabled:hover {
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
}

.lew-input-view-disabled:active {
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
}

.lew-input-view-disabled:focus-within {
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
}
</style>
