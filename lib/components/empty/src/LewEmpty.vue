<script lang="ts" setup>
import { emptyProps } from './props'
import { any2px } from 'lew-ui/utils'

const props = defineProps(emptyProps)

let src = new URL(`../icon/icon_${props.type}.svg`, import.meta.url).href

const emptyStyleObject = computed(() => {
  const { width, height, padding } = props
  return {
    width: any2px(width),
    height: any2px(height),
    padding: padding
  }
})
</script>

<template>
  <div class="lew-empty" :style="emptyStyleObject">
    <img :src="src" alt="" srcset="" />
    <div
      :style="{
        fontSize: any2px(fontSize)
      }"
      class="title"
    >
      {{ title }}
    </div>
  </div>
</template>

<style lang="scss">
.lew-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  img {
    width: 100%;
    height: auto;
  }
  .title {
    color: var(--lew-text-color-8);
  }
}
.lew-dark {
  .lew-empty {
    img {
      opacity: 0.6;
    }
  }
}
</style>
