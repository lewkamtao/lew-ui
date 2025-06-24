<script setup lang="ts">
import RequiredIcon from './RequiredIcon.vue';
import { requiredIconSizeMap, tipsIconSizeMap } from './props';
import type { LewSize } from 'lew-ui';
import { LewFlex } from 'lew-ui';
import Icon from 'lew-ui/utils/Icon.vue';
import { any2px } from 'lew-ui/utils';
defineProps({
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
  },
  padding: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array as PropType<any>,
  },
});

const formLabelRef = ref<HTMLDivElement>();

const getWidth = () => {
  return formLabelRef.value?.offsetWidth;
};

defineExpose({
  getWidth,
});
</script>

<template>
  <div
    ref="formLabelRef"
    class="lew-get-label-width-box"
    :style="{ padding: any2px(padding) }"
  >
    <lew-flex
      gap="5"
      :style="{
        fontSize: `var(--lew-form-font-size-${size})`,
      }"
      v-for="(item, index) in options"
      :key="index"
    >
      <RequiredIcon
        :size="requiredIconSizeMap[size]"
        v-if="item.required && item.label"
      />
      {{ item.label }}
      <Icon
        v-if="item.tips"
        :size="tipsIconSizeMap[size]"
        type="normal"
        color="black"
      ></Icon>
    </lew-flex>
  </div>
</template>

<style lang="scss" scoped>
.lew-get-label-width-box {
  position: fixed;
  width: auto;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: -99;
  opacity: 0;
}
</style>
