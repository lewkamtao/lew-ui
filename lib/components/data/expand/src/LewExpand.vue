<script setup lang="ts">
import { LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px } from 'lew-ui/utils'
import { expandProps } from './props'

const props = defineProps(expandProps)

// 收起高度
const expandRef = ref()
const collapseHeight = ref(props.collapseHeight)
const collapse = ref(false)
const expandHeight = ref(0)

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
      paddingBottom: collapse ? '0px' : '40px',
    }"
  >
    <slot />
    <LewFlex
      v-if="collapseHeight"
      gap="5"
      x="center"
      class="lew-expand-btn"
      @click="collapse = !collapse"
    >
      <CommonIcon
        :style="{
          transform: collapse ? 'rotate(0deg)' : 'rotate(180deg)',
        }"
        class="lew-expand-icon"
        type="chevron-down"
        :size="14"
      />
      {{ collapse ? '展开更多' : '收起' }}
    </LewFlex>
  </div>
</template>

<style lang="scss" scoped>
.lew-expand-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: all var(--lew-form-transition-ease);
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
      transition: all var(--lew-form-transition-ease);
    }
  }
}
</style>
