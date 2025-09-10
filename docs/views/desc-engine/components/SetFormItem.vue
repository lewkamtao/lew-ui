<script setup lang="ts">
import {
  LewDatePicker,
  LewInput,
  LewInputNumber,
  LewInputTable,
  LewSelect,
  LewSwitch,
  LewTabs,
  LewTextarea,
} from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px } from 'lew-ui/utils'
import SetOptionModal from './SetOptionModal.vue'

const props = defineProps({
  as: {
    type: String,
    default: 'input',
  },
  label: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  componentWidth: {
    type: [String, Number],
  },
  direction: {
    type: String,
    default: 'x',
  },
  props: {
    type: Object,
  },
  tips: {
    type: String,
  },
})

const modelValue = defineModel()

const asMap: Record<string, any> = {
  'input': LewInput,
  'textarea': LewTextarea,
  'select': LewSelect,
  'date-picker': LewDatePicker,
  'tabs': LewTabs,
  'switch': LewSwitch,
  'input-number': LewInputNumber,
  'set-option-modal': SetOptionModal,
  'input-table': LewInputTable,
}
</script>

<template>
  <div x="start" class="set-form-item" :class="[`set-form-item-${direction}`]">
    <lew-flex v-if="as" x="start" gap="5px" class="set-form-item-label">
      {{ label || "标签" }}
      <CommonIcon
        v-if="props?.tips"
        v-tooltip="{ content: props?.tips }"
        class="set-form-item-tips"
        :size="14"
        type="tips"
      />
    </lew-flex>
    <div
      :style="{ width: any2px(props?.componentWidth) }"
      class="lew-form-item-main"
    >
      <component
        :is="asMap[as]"
        v-model="modelValue"
        v-bind="{ ...props.props, size: 'small' }"
      />
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 34px;
    width: 160px;
    flex-shrink: 0;
  }
}
.set-form-item:last-child {
  border-bottom: none;
}

.set-form-item-y {
  flex-direction: column;
  gap: 10px;
  .lew-form-item-main {
    width: 100%;
  }
}
</style>
