<script setup lang="ts">
import { numFormat } from 'lew-ui/utils'
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

const getMagicNumberStyle = computed(() => {
  const { size } = props
  return `height:${size}px;`
})
const getItemStyle = computed(() => (item: string) => {
  const { size } = props
  const index = parseInt(item)
  return `transform: translateY(-${size * index}px)`
})
const getNumStyle = computed(() => {
  const { size } = props
  return `font-size:${size}px; line-height:${size}px; height:${size}px;`
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
      <span v-if="item === '.' || item === ','" :style="getNumStyle">{{ item }} </span>
      <span
        v-for="n in state.numberArr"
        v-else
        :key="n"
        class="lew-magic-number-num"
        :style="getNumStyle"
        v-text="n"
      />
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
    transition: transform 0.35s;
    .lew-magic-number-num {
      overflow: hidden;
      flex-shrink: 0;
      text-align: center;
    }
  }
}
</style>
