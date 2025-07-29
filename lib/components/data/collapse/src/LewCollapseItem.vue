<script setup lang="ts">
import type { Ref } from 'vue'
import type { CollapseModelValue } from './props'
import { LewFlex } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
import LewCommonIcon from 'lew-ui/utils/LewCommonIcon.vue'
import { inject, ref, watch } from 'vue'
import LewCollapseTransition from './LewCollapseTransition.vue'
import { collapseItemProps } from './props'

const props = defineProps(collapseItemProps)
const modelValue = defineModel()

const expandKeys = inject<Ref<CollapseModelValue>>('expandKeys', ref(null))

function setModelValue() {
  if (!expandKeys)
    return

  const currentValue = expandKeys.value
  if (currentValue === null || currentValue === undefined) {
    modelValue.value = false
    return
  }

  modelValue.value = Array.isArray(currentValue)
    ? currentValue.includes(props.collapseKey as string | number)
    : props.collapseKey === currentValue
}

watch(() => expandKeys?.value, setModelValue, { deep: true })

setModelValue()

function change() {
  if (!expandKeys)
    return

  modelValue.value = !modelValue.value

  const currentValue = expandKeys.value
  if (Array.isArray(currentValue)) {
    const newArray = modelValue.value
      ? [...currentValue, props.collapseKey]
      : currentValue.filter((item: string | number) => item !== props.collapseKey)
    expandKeys.value = newArray as CollapseModelValue
  }
  else {
    expandKeys.value = (modelValue.value ? props.collapseKey : null) as CollapseModelValue
  }
}
</script>

<template>
  <div class="lew-collapse-item">
    <LewFlex
      x="start"
      y="center"
      class="lew-collapse-item-title"
      :class="{ 'lew-collapse-item-title-active': modelValue }"
      :style="{ borderRadius: any2px(props.radius) }"
      @click="change"
    >
      <slot v-if="$slots.title" name="title" :props="props" />
      <template v-else>
        <LewCommonIcon
          :size="16"
          :style="{
            transform: `rotate(${modelValue ? 90 : 0}deg)`,
            transition: 'all 0.3s',
          }"
          type="chevron-right"
        />
        <lew-text-trim :style="{ width: 'calc(100% - 50px)' }" :text="props.title" />
      </template>
    </LewFlex>
    <LewCollapseTransition>
      <div v-if="modelValue" class="lew-collapse-item-main">
        <slot />
      </div>
    </LewCollapseTransition>
  </div>
</template>

<style scoped lang="scss">
.lew-collapse-item {
  border-bottom: 1px solid var(--lew-bgcolor-4);
  .lew-collapse-item-title {
    cursor: pointer;
    padding: 10px 0px;
    box-sizing: border-box;
    transition: all 0.15s;
    user-select: none;
  }

  .lew-collapse-item-main {
    box-sizing: border-box;
    padding-bottom: 10px;
  }
}
.lew-collapse-item:last-child {
  border-bottom: none;
}
</style>
