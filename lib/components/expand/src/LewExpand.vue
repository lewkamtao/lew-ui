<script setup lang="ts">
import { any2px } from 'lew-ui/utils'
import { LewFlex } from 'lew-ui'
import { expandProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'

const props = defineProps(expandProps)

// 收起高度
const expandRef = ref()
let collapseHeight = ref(props.collapseHeight)
let collapse = ref(false)
let expandHeight = ref(0)

onMounted(() => {
  if (expandRef.value) {
    expandHeight.value = expandRef.value.offsetHeight - 40
    collapse.value = true
  }
})
</script>

<template>
  <div
    ref="expandRef"
    class="lew-expand-wrapper"
    :style="{
      height: collapse ? any2px(collapseHeight) : any2px(expandHeight),
      paddingBottom: collapse ? '0px' : '40px'
    }"
  >
    <slot />
    <lew-flex
      @click="collapse = !collapse"
      gap="5"
      v-if="collapseHeight"
      class="lew-expand-btn"
    >
      <Icon
        :style="{ transform: collapse ? 'rotate(0deg)' : 'rotate(180deg)' }"
        class="lew-expand-icon"
        type="chevron-down"
        :size="14"
      ></Icon>
      {{ collapse ? '展开更多' : '收起' }}
    </lew-flex>
  </div>
</template>

<style lang="scss" scoped>
.lew-expand-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: var(--lew-form-transition-ease);
  .lew-expand-btn {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 9;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
    text-align: center;
    background-image: var(--lew-expand-control-bg-gradient);
    cursor: pointer;
    .lew-expand-icon {
      transition: var(--lew-form-transition-ease);
    }
  }
}
</style>
