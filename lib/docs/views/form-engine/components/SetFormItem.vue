<script setup lang="ts">
import { any2px } from 'lew-ui/utils'
import { LewInput, LewSelect, LewDatePicker, LewTabs, LewSwitch, LewTextarea } from 'lew-ui'
import LewInputNumber from 'lew-ui/components/input-number/src/LewInputNumber.vue'

const props = defineProps({
  as: {
    type: String,
    default: 'input'
  },
  label: {
    type: String,
    default: ''
  },
  field: {
    type: String,
    default: ''
  },
  componentWidth: {
    type: [String, Number]
  },
  props: {
    type: Object
  },
  tips: {
    type: String
  }
})

const modelValue = defineModel()

const asMap: Record<string, any> = {
  input: LewInput,
  textarea: LewTextarea,
  select: LewSelect,
  'date-picker': LewDatePicker,
  tabs: LewTabs,
  switch: LewSwitch,
  'input-number': LewInputNumber
}
</script>

<template>
  <div class="set-form-item">
    <lew-flex x="start" gap="5" class="set-form-item-label" v-if="as">
      {{ label || '标签' }}
      <lew-icon
        class="set-form-item-tips"
        v-if="props?.tips"
        size="14"
        type="info"
        v-tooltip="{ content: props?.tips }"
      ></lew-icon>
    </lew-flex>
    <div :style="{ width: any2px(props?.componentWidth) }" class="lew-form-item-main">
      <component v-model="modelValue" :is="asMap[as]" v-bind="{ ...props.props, size: 'small' }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.set-form-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  user-select: none;
  border-bottom: 1px var(--lew-form-bgcolor) solid;
  padding-bottom: 10px;
  .set-form-item-label {
    white-space: nowrap;
    margin-top: 7px;
    .set-form-item-tips {
      cursor: pointer;
    }
  }
  .lew-form-item-main {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 34px;
  }
}
.set-form-item:last-child {
  border-bottom: none;
}
</style>
