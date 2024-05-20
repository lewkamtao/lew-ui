<script lang="ts" setup>
import { useLewTo } from '../../../hooks'
import { getColorType } from 'lew-ui/utils'
import { markProps } from './props'

const props = defineProps(markProps)
const { lewTo } = useLewTo()

const getStyle = computed(() => {
  const { color, round, bold, to } = props
  let styleObj = {} as any
  let _color = getColorType(color)
  styleObj.borderRadius = round ? '20px' : 'var(--lew-border-radius-mini)'
  styleObj.fontWeight = bold || ''
  styleObj.color = `var(--lew-color-${_color}-dark)`
  styleObj.backgroundColor = `var(--lew-color-${_color}-light)`
  styleObj.cursor = to ? 'pointer' : ''
  return styleObj
})
</script>

<template>
  <span class="lew-mark" :style="getStyle" @click="lewTo(to)">
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
.lew-mark {
  display: inline;
  border-radius: var(--lew-border-radius-small);
  padding: 2px 6px;
  margin: 0px 3px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.lew-mark-to {
  cursor: pointer;
}

.lew-mark-round {
  border-radius: 20px;
}
</style>
