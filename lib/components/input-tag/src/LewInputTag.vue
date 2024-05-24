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

let delDownTimer: any
let delDownCheck = 0

const openInput = () => {
  isFocus.value = true
  nextTick(() => {
    lewInputRef.value.toFocus()
  })
  document.onkeydown = function (event) {
    if (inputValue.value === '') {
      if (event.keyCode === 8 || event.keyCode === 46) {
        clearTimeout(delDownTimer)
        delDownTimer = setTimeout(() => {
          delDownCheck = 0
        }, 500)
        delDownCheck += 1
        if (delDownCheck >= 2 && tagsValue.value && tagsValue.value.length > 0) {
          tagsValue.value.splice(tagsValue.value.length - 1, 1)
          emit('change', cloneDeep(tagsValue.value))
          delDownCheck = 0
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
  addTag()
  if (isEnter) {
    openInput()
  }
  isEnter = false
}

const addTag = () => {
  let _value = tagsValue.value || []
  if (inputValue.value) {
    _value.push(inputValue.value)
  }
  inputValue.value = ''
  tagsValue.value = _value
  emit('change', _value)
}

const delTag = (index: number) => {
  tagsValue.value && tagsValue.value.splice(index, 1)
  emit('change', tagsValue.value)
  emit('close', tagsValue.value)
}

const getInputClassNames = computed(() => {
  const { size, readonly, disabled } = props
  return object2class('lew-input-tag-view', {
    size,
    readonly,
    disabled
  })
})
</script>

<template>
  <div class="lew-input-tag-view" @click="openInput" :class="getInputClassNames">
    <div class="lew-input-tag-box">
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
        ref="lewInputRef"
        v-model="inputValue"
        class="lew-input-tag"
        size="small"
        :readonly="!isFocus"
        autoWidth
        placeholder=""
        @blur="blurFn"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-tag-view {
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  box-sizing: border-box;
  outline: 0px var(--lew-form-border-color) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  transition: var(--lew-form-transition);
  cursor: text;
  .lew-input-tag-box {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    box-sizing: border-box;
    padding-left: 4px;
  }
  .lew-input-tag {
    height: 26px;
    flex-shrink: 1;
    border: none !important;
    outline: none !important;
    background: none !important;
    :deep() {
      input {
        height: 26px;
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
    font-size: var(--lew-form-font-size-small);
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-input-line-height-small);
  }
}

.lew-input-tag-view-size-medium {
  .lew-input-tag-box {
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
    height: var(--lew-form-item-height-medium);
  }
}

.lew-input-tag-view-size-large {
  .lew-input-tag-box {
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
    height: var(--lew-form-item-height-large);
  }
}
</style>
