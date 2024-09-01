<script setup lang="ts">
import { useMagicKeys, useDebounceFn } from '@vueuse/core'
import { object2class, any2px } from 'lew-ui/utils'
import { LewIcon, LewDropdown, LewFlex, LewMessage, LewTooltip } from 'lew-ui'
import { inputProps } from './props'

const { enter } = useMagicKeys()
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const emit = defineEmits(['clear', 'blur', 'focus', 'change', 'input', 'ok'])
const props = defineProps(inputProps)
const modelValue = defineModel({ required: true })
const prefixesValue = defineModel('prefixesValue')
const suffixValue = defineModel('suffixValue')

const lewInputRef = ref()
const lewInputCountRef = ref()
const isCopy = ref(false)
const _type = ref(props.type)
const isFocus = ref(false)
const state = reactive({
  prefixesDropdown: 'hide',
  suffixDropdown: 'hide'
})

let timer: NodeJS.Timeout | null = null

watch(
  () => props.type,
  (v) => {
    if (v === 'password') {
      _type.value = 'password'
    }
  }
)

const clear = () => {
  modelValue.value = undefined
  emit('clear')
}

const toFocus = () => lewInputRef.value?.focus()

const showPasswordFn = () => {
  _type.value = _type.value === 'text' ? 'password' : 'text'
}

const focus = (e: FocusEvent) => {
  if (props.selectByFocus) {
    ;(e.currentTarget as HTMLInputElement)?.select()
  }
  emit('focus')
  isFocus.value = true
}

const blur = () => {
  emit('blur', modelValue)
  isFocus.value = false
}

const getIconSize = computed(
  () =>
    ({
      small: 13,
      medium: 14,
      large: 16
    })[props.size]
)

const getInputStyle = computed(() => {
  const { clearable, showCount } = props
  const countWidth = lewInputCountRef.value?.offsetWidth || 0
  return {
    width: `calc(100% - ${clearable ? 20 + countWidth + (showCount ? 12 : 0) : 0}px)`
  }
})

const getType = computed(() => (props.type === 'password' ? _type.value : props.type))

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, align, autoWidth } = props
  return object2class('lew-input-view', { size, readonly, disabled, align, autoWidth })
})

const prefixesChange = (item: { value: string }) => {
  prefixesValue.value = item.value
}

const suffixChange = (item: { value: string }) => {
  suffixValue.value = item.value
}

const getPrefixesLabel = computed(() => {
  return props.prefixesOptions.find((e) => e.value === prefixesValue.value)?.label || ''
})

const getSuffixLabel = computed(() => {
  return props.suffixOptions.find((e) => e.value === suffixValue.value)?.label || ''
})

const copy = () => {
  const textarea = document.createElement('textarea')
  textarea.style.cssText = 'position:fixed;top:-200vh;'
  textarea.value = modelValue.value as string

  document.body.appendChild(textarea)
  textarea.select()

  if (document.execCommand('copy')) {
    LewMessage.success('复制成功！')
    isCopy.value = true
    timer = setTimeout(() => {
      isCopy.value = false
    }, 2000)
  } else {
    LewMessage.error('复制失败！')
  }

  document.body.removeChild(textarea)
}

if (props.okByEnter) {
  watch(enter, (v) => {
    if (v && isFocus.value) {
      ok()
    }
  })
}

const ok = useDebounceFn(() => {
  emit('ok', modelValue.value)
}, 250)

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

defineExpose({ toFocus })
</script>

<template>
  <div class="lew-input-view" :class="getInputClassNames">
    <div
      v-if="prefixes"
      v-tooltip="{
        content: prefixesTooltip,
        trigger: 'mouseenter'
      }"
      class="lew-input-prefixes"
    >
      <div v-if="prefixes === 'text'">
        {{ prefixesValue }}
      </div>
      <div v-if="prefixes === 'icon'" class="lew-input-prefixes-icon">
        <lew-icon :size="getIconSize" :type="prefixesValue as string" />
      </div>
      <div v-if="prefixes === 'select'" class="lew-input-prefixes-select">
        <lew-dropdown
          placement="bottom"
          trigger="click"
          :options="prefixesOptions"
          @change="prefixesChange"
          @show="state.prefixesDropdown = 'show'"
          @hide="state.prefixesDropdown = 'hide'"
        >
          <lew-flex
            gap="5px"
            x="start"
            class="lew-input-prefixes-dropdown"
            :class="{
              'lew-input-prefixes-dropdown-open': state.prefixesDropdown === 'show'
            }"
          >
            <div>
              {{ getPrefixesLabel }}
            </div>
            <lew-icon :size="getIconSize" type="chevron-down" class="icon-select" />
          </lew-flex>
        </lew-dropdown>
      </div>
    </div>
    <div
      v-if="copyable && readonly && modelValue && !suffix"
      class="lew-input-copy-btn"
      @click="copy"
    >
      <lew-icon
        :size="getIconSize"
        :type="isCopy ? 'check' : 'copy'"
        :class="{ 'lew-input-copy-btn-check': isCopy }"
      />
    </div>
    <div
      class="lew-input-box"
      :style="{
        minWidth: any2px(minWidth)
      }"
    >
      <input
        ref="lewInputRef"
        v-model="modelValue"
        class="lew-input"
        :style="getInputStyle"
        autocomplete="new-password"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="getType"
        :readonly="readonly"
        :maxlength="maxLength"
        onkeypress="if(window.event.keyCode==13) this.blur()"
        @input="emit('input', modelValue)"
        @change="emit('change', modelValue)"
        @blur="blur"
        @focus="focus"
      />
      <label v-if="autoWidth" class="lew-input-auto-width">
        {{ modelValue }}
      </label>
      <label v-if="autoWidth && clearable" class="lew-input-auto-width-clear"> </label>
      <div v-if="showPassword || clearable || showCount" class="lew-input-controls">
        <div
          ref="lewInputCountRef"
          v-if="modelValue && showCount"
          class="lew-input-count"
          :class="{
            'lew-input-count-clearable': clearable && modelValue
          }"
        >
          {{ typeof modelValue === 'string' ? modelValue.length : 0
          }}{{ maxLength ? ' / ' + maxLength : '' }}
        </div>
        <div
          v-if="showPassword && type === 'password'"
          class="lew-input-show-password"
          @mousedown.prevent=""
          @click="showPasswordFn"
        >
          <lew-icon v-show="_type === 'text'" :size="getIconSize" type="eye" />
          <lew-icon v-show="_type === 'password'" :size="getIconSize" type="eye-off" />
        </div>
        <transition name="lew-form-icon-ani">
          <lew-icon
            v-if="clearable && modelValue && !readonly"
            class="lew-form-icon-clear"
            :class="{
              'lew-form-icon-clear-focus': isFocus
            }"
            :size="getIconSize"
            type="x"
            @mousedown.prevent=""
            @click="clear"
          />
        </transition>
      </div>
    </div>

    <div
      v-if="suffix"
      v-tooltip="{
        content: suffixTooltip,
        trigger: suffixTooltip ? 'mouseenter' : ''
      }"
      class="lew-input-suffix"
    >
      <div v-if="suffix === 'text'">{{ suffixValue }}</div>
      <div v-if="suffix === 'icon'" class="lew-input-suffix-icon">
        <lew-icon :size="getIconSize" :type="suffixValue as string" />
      </div>
      <div v-if="suffix === 'select'" class="lew-input-suffix-select">
        <lew-dropdown
          placement="bottom"
          trigger="click"
          :options="suffixOptions"
          @change="suffixChange"
          @show="state.suffixDropdown = 'show'"
          @hide="state.suffixDropdown = 'hide'"
        >
          <lew-flex
            gap="5px"
            x="start"
            class="lew-input-suffix-dropdown"
            :class="{
              'lew-input-suffix-dropdown-open': state.suffixDropdown === 'show'
            }"
          >
            <div>{{ getSuffixLabel }}</div>
            <lew-icon :size="getIconSize" type="chevron-down" class="icon-select" />
          </lew-flex>
        </lew-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-view {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  transition: var(--lew-form-transition-ease);
  box-sizing: border-box;
  outline: 0px var(--lew-form-border-color) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  box-shadow: var(--lew-form-box-shadow);
  overflow: hidden;

  .lew-input-box {
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    flex: 1;
    .lew-input {
      height: 100%;
    }
  }
  .lew-input-copy-btn {
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: var(--lew-form-icon-opacity);
    pointer-events: all;
  }

  .lew-input-copy-btn:hover {
    opacity: var(--lew-form-icon-opacity-hover);
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    position: relative;
    white-space: nowrap;
    user-select: none;
    display: inline-flex;
    align-items: center;

    .icon-select {
      transition: var(--lew-form-transition-bezier);
    }

    .icon-select-up {
      transform: rotate(180deg);
    }
  }
  .lew-input-prefixes::after {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1px;
    content: '';
    transition: var(--lew-form-transition-ease);
    background: var(--lew-bgcolor-4);
  }
  .lew-input-suffix::before {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 1px;
    content: '';
    transition: var(--lew-form-transition-ease);
    background: var(--lew-bgcolor-4);
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
    width: 100%;
    text-overflow: ellipsis;
    border: none;
    background: none;
    color: var(--lew-text-color-1);
    outline: none;
    box-sizing: border-box;
    overflow: hidden;
  }

  .lew-input:invalid {
    text-decoration: line-through;
  }

  .lew-input::placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-input-controls {
    display: inline-flex;
    align-items: center;
    z-index: 9;

    > div {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      padding: 0px 4px;
    }

    .lew-input-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      opacity: var(--lew-form-icon-opacity);
      transition: transform 0.25s;
      z-index: 2;
    }

    .lew-input-show-password {
      opacity: var(--lew-form-icon-opacity);
      transition: all 0.25s;
      cursor: pointer;
    }

    .lew-input-show-password:hover {
      opacity: var(--lew-form-icon-opacity-hover);
    }
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
    transform: translateY(-50%);
    left: 0px;
    display: inline-block;
    width: 100%;
  }

  .lew-input-auto-width {
    width: auto;
    min-width: 60px;
    height: 1px;
    visibility: hidden;
    box-sizing: border-box;
  }

  .lew-input-box {
    padding: 0px;
  }
}

.lew-input-view-size-small {
  .lew-input-box {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-input-line-height-small);
  }
  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-input-line-height-small);
  }
  .lew-input-copy-btn {
    right: 7px;
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 7px;
  }

  .lew-input {
    font-size: var(--lew-form-font-size-small);
    height: var(--lew-form-item-height-small);
  }

  .lew-input-controls {
    height: var(--lew-form-item-height-small);

    .lew-input-count {
      font-size: 12px;
    }

    .lew-input-count-clearable {
      transform: translateX(-18px);
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-small);
    line-height: var(--lew-form-input-line-height-small);
  }
  .lew-input-auto-width-clear {
    width: 18px;
  }
}

.lew-input-view-size-medium {
  .lew-input-box {
    padding: var(--lew-form-input-padding-medium);
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
    height: var(--lew-form-item-height-medium);
  }
  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    line-height: var(--lew-form-input-line-height-medium);
    height: var(--lew-form-item-height-medium);
  }
  .lew-input-copy-btn {
    right: 9px;
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 9px;
  }
  .lew-input {
    font-size: var(--lew-form-font-size-medium);
    height: var(--lew-form-item-height-medium);
  }
  .lew-input-controls {
    height: var(--lew-form-item-height-medium);

    .lew-input-count {
      font-size: 13px;
    }

    .lew-input-count-clearable {
      transform: translateX(-18px);
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
  }
  .lew-input-auto-width-clear {
    width: 20px;
  }
}

.lew-input-view-size-large {
  .lew-input-box {
    padding: var(--lew-form-input-padding-large);
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
    height: var(--lew-form-item-height-large);
  }
  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    line-height: var(--lew-form-input-line-height-large);
    height: var(--lew-form-item-height-large);
  }
  .lew-input-copy-btn {
    right: 12px;
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 12px;
  }
  .lew-input {
    font-size: var(--lew-form-font-size-large);
    height: var(--lew-form-item-height-large);
  }
  .lew-input-controls {
    height: var(--lew-form-item-height-large);

    .lew-input-count {
      font-size: 14px;
    }

    .lew-input-count-clearable {
      transform: translateX(-18px);
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
  }
  .lew-input-auto-width-clear {
    width: 22px;
  }
}

.lew-input-view-size-small.lew-input-view-autoWidth {
  .lew-input {
    padding: var(--lew-form-input-padding-small);
    width: calc(100% - 12px);
  }
}
.lew-input-view-size-medium.lew-input-view-autoWidth {
  .lew-input {
    padding: var(--lew-form-input-padding-medium);
    width: calc(100% - 18px);
  }
}
.lew-input-view-size-large.lew-input-view-autoWidth {
  .lew-input {
    padding: var(--lew-form-input-padding-large);
    width: calc(100% - 24px);
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
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-outline);
  background-color: var(--lew-form-bgcolor-focus);
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
  pointer-events: none; //鼠标点击不可修改
}

.lew-input-view-disabled:hover {
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
  background-color: var(--lew-form-bgcolor);
}

.lew-input-view-disabled:active {
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
  background-color: var(--lew-form-bgcolor);
}

.lew-input-view-disabled:focus-within {
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
  background-color: var(--lew-form-bgcolor);
}
</style>
