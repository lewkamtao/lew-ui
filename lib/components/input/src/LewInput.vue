<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { object2class, any2px } from 'lew-ui/utils'
import { LewIcon, LewDropdown, LewFlex, LewMessage, LewTooltip } from 'lew-ui'
import { inputProps } from './props'
import { cloneDeep } from 'lodash-es'

const { enter } = useMagicKeys()
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const emit = defineEmits(['clear', 'blur', 'focus', 'change', 'input', 'ok'])

const props = defineProps(inputProps)
const modelValue: Ref<string | undefined> = defineModel({ required: true })
const prefixesValue: Ref<string | undefined> = defineModel('prefixesValue')
const suffixValue: Ref<string | undefined> = defineModel('suffixValue')
const lewInputRef = ref()
const isCopy = ref<boolean>(false)
let timer: any = null
const _type = ref(props.type)
const state = reactive({
  prefixesDropdown: 'hide',
  suffixDropdown: 'hide',
  isFocus: false
})

watch(
  () => props.type,
  (v) => {
    if (v === 'password') {
      _type.value = 'password'
    }
  }
)

const updateValue = () => {
  if (
    props.maxLength &&
    props.renderCount(modelValue.value) >= Number(props.maxLength) &&
    modelValue.value
  ) {
    modelValue.value = cloneDeep(modelValue.value.slice(0, Number(props.maxLength)))
  }
}

let isFirst = true
const inputFn = () => {
  updateValue()
  if (!isFirst) {
    emit('input', modelValue.value)
  }
  isFirst = false
}

const clear = (): void => {
  modelValue.value = undefined
  emit('clear')
}

const toFocus = () => {
  lewInputRef.value?.focus()
}

const showPasswordFn = (): void => {
  if (_type.value === 'text') {
    _type.value = 'password'
  } else {
    _type.value = 'text'
  }
}

const getCheckNumStr = computed(() => {
  if (props.showCount && props.maxLength) {
    return `${props.renderCount(modelValue.value)} / ${props.maxLength}`
  }
  if (props.showCount) {
    return props.renderCount(modelValue.value)
  }
  return false
})

const focus = (e: any) => {
  if (props.focusSelect) {
    e?.currentTarget?.select()
  }
  emit('focus')
  state.isFocus = true
}

const blur = () => {
  emit('blur', modelValue)
  state.isFocus = false
}

const getIconSize = computed(() => {
  const size: any = {
    small: 13,
    medium: 14,
    large: 16
  }
  return size[props.size]
})

const getType = computed(() => {
  if (props.type === 'password') {
    return _type.value
  }
  return props.type
})

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, align, autoWidth } = props
  return object2class('lew-input-view', {
    size,
    readonly,
    disabled,
    align,
    autoWidth
  })
})

const prefixesChange = (item: any) => {
  prefixesValue.value = item.value
}
const suffixChange = (item: any) => {
  suffixValue.value = item.value
}
const getPrefixesLabel = computed(() => {
  const item: any = props.prefixesOptions.find((e: any) => e.value === prefixesValue.value)
  return item?.label || ''
})
const getSuffixLabel = computed(() => {
  const item: any = props.suffixOptions.find((e: any) => e.value === suffixValue.value)
  return item?.label || ''
})

const copy = () => {
  const textarea = document.createElement('textarea')
  textarea.style.position = 'fixed'
  textarea.style.top = '-200vh'
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
    if (v && state.isFocus) {
      emit('ok', modelValue.value)
    }
  })
}

onUnmounted(() => {
  clearTimeout(timer)
})
defineExpose({ toFocus })
</script>

<template>
  <div class="lew-input-view" :class="getInputClassNames" :style="{ minWidth: any2px(minWidth) }">
    <div
      v-if="prefixes"
      v-tooltip="{
        content: prefixesTooltip,
        trigger: 'mouseenter'
      }"
      class="lew-input-prefixes"
    >
      <lew-text-trim
        v-if="prefixes === 'text'"
        :text="prefixesValue"
        class="lew-input-prefixes-text"
      />
      <div v-if="prefixes === 'icon'" class="lew-input-prefixes-icon">
        <lew-icon :size="getIconSize" :type="prefixesValue" />
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
            <lew-text-trim :text="getPrefixesLabel" class="lew-input-prefixes-text" />
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
    <div class="lew-input-box">
      <input
        ref="lewInputRef"
        v-model="modelValue"
        class="lew-input"
        autocomplete="new-password"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="getType"
        :readonly="readonly"
        onkeypress="if(window.event.keyCode==13) this.blur()"
        @input="inputFn"
        @change="emit('change', modelValue)"
        @blur="blur"
        @focus="focus"
      />
      <label v-if="autoWidth" class="lew-input-auto-width">
        {{ modelValue }}
      </label>
      <div v-if="showPassword || clearable || showCount" class="lew-input-controls">
        <div
          v-if="getCheckNumStr"
          class="lew-input-count"
          :class="{
            'lew-input-count-clearable': clearable && modelValue
          }"
        >
          {{ getCheckNumStr }}
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
              'lew-form-icon-clear-focus': state.isFocus
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
      <lew-text-trim v-if="suffix === 'text'" :text="suffixValue" class="lew-input-suffix-text" />
      <div v-if="suffix === 'icon'" class="lew-input-suffix-icon">
        <lew-icon :size="getIconSize" :type="suffixValue" />
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
            <lew-text-trim :text="getSuffixLabel" class="lew-input-suffix-text" />
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
  transition: var(--lew-form-transition);
  box-sizing: border-box;
  outline: 0px var(--lew-form-border-color) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  overflow: hidden;

  .lew-input-box {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    .lew-input {
      height: 100%;
	  margin-left: -5px;
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
  .lew-input-prefixes {
    border-right: var(--lew-bgcolor-4) 1px dashed;
  }
  .lew-input-suffix {
    border-left: var(--lew-bgcolor-4) 1px dashed;
  }
  .lew-input-prefixes,
  .lew-input-suffix {
    white-space: nowrap;
    user-select: none;
    display: inline-flex;
    align-items: center;

    .icon-select {
      transition: var(--lew-form-transition);
    }

    .icon-select-up {
      transform: rotate(180deg);
    }
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
  }

  .lew-input {
    overflow: hidden;
  }

  .lew-input::placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-input-controls {
    display: inline-flex;
    align-items: center;

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
    min-width: 45px;
    height: 100%;
    visibility: hidden;
    box-sizing: border-box;
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
  .lew-input-prefixes-text,
  .lew-input-suffix-text {
    font-size: var(--lew-form-font-size-small);
    max-width: 80px;
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
    height: var(--lew-form-item-height-small);
    font-size: var(--lew-form-font-size-small);
    line-height: var(--lew-form-input-line-height-small);
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
    max-width: 100px;
  }
  .lew-input-copy-btn {
    right: 9px;
  }
  .lew-input-prefixes-text,
  .lew-input-suffix-text {
    font-size: var(--lew-form-font-size-medium);
    max-width: 100px;
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
    height: var(--lew-form-item-height-medium);
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
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
  .lew-input-prefixes-text,
  .lew-input-suffix-text {
    font-size: var(--lew-form-font-size-large);
    max-width: 120px;
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
    height: var(--lew-form-item-height-large);
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
  }
}

.lew-input-view-size-small.lew-input-view-autoWidth {
  .lew-input {
    left: 7px;
    width: calc(100% - 14px);
  }
}
.lew-input-view-size-medium.lew-input-view-autoWidth {
  .lew-input {
    left: 9px;
    width: calc(100% - 18px);
  }
}
.lew-input-view-size-large.lew-input-view-autoWidth {
  .lew-input {
    left: 12px;
    width: calc(100% - 24px);
  }
}

.lew-input-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
  .lew-input-prefixes {
    border-right: var(--lew-bgcolor-8) 1px dashed;
  }
  .lew-input-suffix {
    border-left: var(--lew-bgcolor-8) 1px dashed;
  }
}

.lew-input-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-ouline);
  background-color: var(--lew-form-bgcolor-focus);
  .lew-input-prefixes {
    border-right: var(--lew-bgcolor-8) 1px dashed;
  }
  .lew-input-suffix {
    border-left: var(--lew-bgcolor-8) 1px dashed;
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
