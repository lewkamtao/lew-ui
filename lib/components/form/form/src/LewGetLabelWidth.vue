<script setup lang="ts">
import type { LewSize } from "lew-ui";
import { LewFlex } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import { any2px, getFormItemRequired } from "lew-ui/utils";
import { requiredIconSizeMap, tipsIconSizeMap } from "./props";
import RequiredIcon from "./RequiredIcon.vue";

defineProps({
  size: {
    type: String as PropType<LewSize>,
    default: "medium",
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

function getWidth() {
  return formLabelRef.value?.offsetWidth;
}

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
    <LewFlex
      v-for="(item, index) in options"
      :key="index"
      gap="5px"
      :style="{
        fontSize: `var(--lew-form-font-size-${size})`,
      }"
    >
      <RequiredIcon
        v-if="getFormItemRequired(item) && item.label"
        :size="requiredIconSizeMap[size]"
      />
      {{ item.label }}
      <CommonIcon
        v-if="item.tips"
        :size="tipsIconSizeMap[size]"
        type="normal"
        color="black"
      />
    </LewFlex>
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
  left: -100vw;
  top: -100vh;
}
</style>
