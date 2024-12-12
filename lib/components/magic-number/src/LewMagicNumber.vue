<script setup lang="ts">
import { any2px, numFormat } from 'lew-ui/utils'
import { magicNumberProps } from './props'

const props = defineProps(magicNumberProps)

const state = reactive({
  numberArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
})

const getValueArr = computed(() => {
  if (typeof props.value !== 'number') {
    throw new Error('LewMagicNumber props value 必须为number类型！')
  }

  if (props.sep) {
    return numFormat(props.value).split('')
  }
  return String(props.value).split('')
})

const getSize = computed(() => {
  const { size } = props
  return typeof size === 'string' ? parseInt(size) : size
})

const getMagicNumberStyle = computed(() => {
  return {
    height: any2px(getSize.value)
  }
})
const getItemStyle = computed(() => (item: string) => {
  const index = parseInt(item)
  return {
    transform: `translateY(-${getSize.value * index}px)`
  }
})
const getNumStyle = computed(() => {
  const { size } = props
  return {
    fontSize: any2px(size),
    lineHeight: any2px(getSize.value),
    height: any2px(getSize.value)
  }
})
</script>

<template>
  <div class="lew-magic-number" :style="getMagicNumberStyle">
    <div
      v-for="(item, index) in getValueArr"
      :key="index"
      :style="getItemStyle(item)"
      class="lew-magic-number-item"
    >
      <span v-if="item === '.' || item === ','" :style="getNumStyle"
        >{{ item }}
      </span>
      <span
        v-for="n in state.numberArr"
        v-else
        :key="n"
        class="lew-magic-number-num"
        :style="getNumStyle"
        v-text="n"
      ></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-magic-number {
  display: inline-flex;
  overflow: hidden;
  .lew-magic-number-item {
    display: inline-flex;
    flex-direction: column;
    transition: all var(--lew-form-transition-ease);
    .lew-magic-number-num {
      overflow: hidden;
      flex-shrink: 0;
      text-align: center;
    }
  }
}
</style>
