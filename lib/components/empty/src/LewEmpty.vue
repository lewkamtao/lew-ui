<script lang="ts" setup>
import { emptyProps } from './props';
import { any2px } from 'lew-ui/utils';

const props = defineProps(emptyProps);

let src = new URL(`../icon/icon_${props.type}.svg`, import.meta.url).href;

const emptyStyleObject = computed(() => {
  const { width, height, padding } = props;
  return {
    width: any2px(width),
    height: any2px(height),
    padding: padding,
  };
});
</script>

<template>
  <div class="lew-empty-container" :style="emptyStyleObject">
    <img :src="src" alt="" srcset="" class="lew-empty-icon" />
    <div
      :style="{
        fontSize: any2px(fontSize),
      }"
      class="lew-empty-title"
    >
      {{ title }}
    </div>
  </div>
</template>

<style lang="scss">
.lew-empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  .lew-empty-icon {
    width: 100%;
    height: auto;
  }
  .lew-empty-title {
    color: var(--lew-text-color-5);
  }
}
.lew-dark {
  .lew-empty-container {
    .lew-empty-icon {
      opacity: 0.6;
    }
  }
}
</style>
