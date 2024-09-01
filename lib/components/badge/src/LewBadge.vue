<script setup lang="ts">
import { badgeProps } from './props'
import { getColorType } from 'lew-ui/utils'

const props = defineProps(badgeProps)

const getStyle = computed(() => {
  const { color } = props
  let styleObj: Record<string, string> = {}
  let _color = getColorType(color)
  styleObj.backgroundColor = `var(--lew-color-${_color}-dark)`
  return styleObj
})
</script>

<template>
  <div class="lew-badge">
    <div v-if="value" class="lew-badge-value" :style="getStyle">
      {{ value }}
    </div>
    <div v-if="!value" class="lew-badge-dot" :style="getStyle"></div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.lew-badge {
  position: relative;

  .lew-badge-dot {
    position: absolute;
    left: 100%;
    width: 6px;
    height: 6px;
    top: -2.5px;
    transform: translateX(-50%);
    z-index: 1;
    cursor: normal;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .lew-badge-value {
    position: absolute;
    display: inline-flex;
    align-items: center;
    left: 100%;
    bottom: calc(100% - 9px);
    transform: translateX(-50%);
    border-radius: 25px;
    min-width: 18px;
    height: 18px;
    text-align: center;
    padding: 0px 5px;
    font-size: 12px;
    cursor: normal;
    z-index: 1;
    font-weight: normal;
    box-sizing: border-box;
    color: var(--lew-color-white-text);
    background-color: var(--lew-color-error-dark);
  }
}

.lew-badge-value {
  border-radius: 25px;
}

.lew-badge-dot {
  border-radius: 50%;
}
</style>
