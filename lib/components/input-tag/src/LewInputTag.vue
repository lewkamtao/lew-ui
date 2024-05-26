<script setup lang="ts">
import { inputTagProps } from './props'
import { LewInput, LewTag } from 'lew-ui'
import { cloneDeep } from 'lodash-es'
import { object2class } from 'lew-ui/utils'

const emit = defineEmits(['close', 'change'])

const props = defineProps(inputTagProps)
const tagsValue: Ref<string[] | undefined> = defineModel()
const inputValue = ref()
const lewInputRef = ref()
const isFocus = ref(false)
let isEnter = false

const openInput = () => {
  isFocus.value = true
  nextTick(() => {
    lewInputRef.value.toFocus()
  })
  document.onkeydown = function (event) {
    if (!inputValue.value) {
      if (event.keyCode === 8 || event.keyCode === 46) {
        if (tagsValue.value && tagsValue.value.length > 0) {
          tagsValue.value.splice(tagsValue.value.length - 1, 1)
          emit('change', cloneDeep(tagsValue.value))
        }
      }
    } else if (event.keyCode === 13) {
      isEnter = true
    }
  }
}

const blurFn = () => {
  document.onkeydown = null
  isFocus.value = false
  if (props.allowDuplicates) {
    addTag()
  } else {
    if (!(tagsValue.value || []).includes(inputValue.value)) {
      addTag()
    }
  }
  if (isEnter) {
    openInput()
  }
  isEnter = false
}

const addTag = () => {
  let _value = tagsValue.value || []
  if (inputValue.value) {
    _value.push(inputValue.value)
    inputValue.value = ''
    tagsValue.value = _value
    emit('change', _value)
  }
}

const autoWidthDelay = ref(false)

const delTag = (index: number) => {
  tagsValue.value && tagsValue.value.splice(index, 1)
  if (tagsValue.value && tagsValue.value.length === 0) {
    autoWidthDelay.value = true
    setTimeout(() => {
      autoWidthDelay.value = false
    }, 550)
  }
  emit('change', tagsValue.value)
  emit('close', tagsValue.value)
}

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, clearable } = props
  return object2class('lew-input-tag-view', {
    size,
    readonly,
    disabled,
    clearable
  })
})
</script>

<template>
  <div class="lew-input-tag-view" @click="openInput" :class="getInputClassNames">
    <div :style="{ padding: (tagsValue || []).length > 0 ? '5px' : '' }" class="lew-input-tag-box">
      <TransitionGroup name="list">
        <lew-tag
          v-for="(item, index) in tagsValue"
          :key="index"
          type="light"
          closable
          @close="delTag(index)"
          >{{ item }}
        </lew-tag>
      </TransitionGroup>
      <lew-input
        v-if="isFocus || (tagsValue || []).length === 0"
        ref="lewInputRef"
        v-model="inputValue"
        class="lew-input-tag"
        :size="size"
        :readonly="!isFocus"
        :placeholder="(tagsValue || []).length > 0 ? '' : placeholder"
        @blur="blurFn"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-tag-view {
  display: inline-flex;
  align-items: center;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  box-sizing: border-box;
  outline: 0px var(--lew-form-border-color) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  transition: var(--lew-form-transition);
  overflow: hidden;
  width: 100%;
  cursor: text;
  :deep() {
    .lew-tag {
      background-color: #fff !important;
    }
  }

  .lew-input-tag-box {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    box-sizing: border-box;
    transition: var(--lew-form-transition);
    :deep() {
      .lew-input-view {
        border-radius: 0px !important;
      }
    }
  }
  .lew-input-tag {
    flex-shrink: 1;
    border: none !important;
    outline: none !important;
    background: none !important;
    margin-left: 2px;
    overflow: hidden;
    width: auto !important;
    :deep() {
      .lew-input-view {
        border-radius: 0px !important;
      }
      .lew-input-box {
        padding: 0px !important;
      }
      input {
        height: 26px;
        left: 0px !important;
      }
    }
  }
}

.lew-input-tag-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}
.lew-input-tag-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-ouline);
  background-color: var(--lew-form-bgcolor-focus);

  :deep() {
    .lew-tag {
      background-color: var(--lew-color-primary-light) !important;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.15s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}

.lew-input-tag-view-size-small {
  .lew-input-tag-box {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
    min-height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-input-line-height-small);
  }
  .lew-input-tag {
    height: 20px;
  }
  :deep() {
    .lew-tag {
      height: 20px;
    }
  }
}

.lew-input-tag-view-size-medium {
  .lew-input-tag-box {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
    min-height: var(--lew-form-item-height-medium);
  }
  .lew-input-tag {
    height: 24px;
  }
  :deep() {
    .lew-tag {
      height: 24px;
    }
  }
}

.lew-input-tag-view-size-large {
  .lew-input-tag-box {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
    min-height: var(--lew-form-item-height-large);
  }
  .lew-input-tag {
    height: 28px;
  }
  :deep() {
    .lew-tag {
      height: 28px;
    }
  }
}
</style>
