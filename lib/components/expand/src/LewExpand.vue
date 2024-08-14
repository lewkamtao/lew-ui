<script setup lang="ts">
import { any2px } from 'lew-ui/utils'
import { expandProps } from './props'

const props = defineProps(expandProps)

// 收起高度
const expandRef = ref()
let collapseHeight = ref(props.collapseHeight)
let collapse = ref(false)
let expandHeight = ref(0)

onMounted(() => {
  if (expandRef.value) {
    expandHeight.value = expandRef.value.offsetHeight
    collapse.value = true
  }
})

const form: any = defineModel({ default: {} })
</script>

<template>
  <div
    ref="expandRef"
    class="expand-wrapper"
    :style="{
      height: collapse ? any2px(collapseHeight) : any2px(expandHeight)
    }"
  >
    <slot />
    <div @click="collapse = !collapse" v-if="collapseHeight" class="expand-btn">
      {{ collapse ? '展开更多' : '收起' }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.expand-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: all 0.25s;
  .expand-btn {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 9;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 50px;
    line-height: 30px;
    text-align: center;
    background-image: var(--lew-expand-control-bg-gradient);
    cursor: pointer;
  }
}
</style>
