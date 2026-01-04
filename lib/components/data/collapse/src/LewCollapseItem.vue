<script setup lang="ts">
import type { LewCollapseModelValue } from 'lew-ui/types'
import type { Ref } from 'vue'
import { LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px } from 'lew-ui/utils'
import { inject, ref, toRaw, watch } from 'vue'
import { collapseItemEmits } from './collapseItemEmits'
import LewCollapseTransition from './LewCollapseTransition.vue'
import { collapseItemProps } from './props'

const props = defineProps(collapseItemProps)
const emit = defineEmits(collapseItemEmits)

const modelValue = defineModel<boolean>({ default: false })

// Inject
const expandKeys = inject<Ref<LewCollapseModelValue>>('expandKeys', ref(null))

// Methods
function setModelValue() {
  if (!expandKeys)
    return

  const currentValue = expandKeys.value
  if (currentValue === null || currentValue === undefined) {
    modelValue.value = false
    return
  }

  modelValue.value = Array.isArray(currentValue)
    ? currentValue.includes(props.collapseKey!)
    : props.collapseKey === currentValue
}

function change() {
  if (!expandKeys)
    return

  modelValue.value = !modelValue.value

  const currentValue = expandKeys.value
  if (Array.isArray(currentValue)) {
    const newArray = modelValue.value
      ? [...currentValue, props.collapseKey]
      : currentValue.filter((item: string | number) => item !== props.collapseKey)
    expandKeys.value = newArray as LewCollapseModelValue
  }
  else {
    expandKeys.value = (modelValue.value
      ? props.collapseKey
      : null) as LewCollapseModelValue
  }

  emit('change', modelValue.value, toRaw(props.collapseKey!))
}

// Watchers
watch(() => expandKeys?.value, setModelValue, { deep: true })

// Initialize
setModelValue()
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
        <CommonIcon
          :size="16"
          :style="{
            transform: `rotate(${modelValue ? 90 : 0}deg)`,
            transition: 'all 0.3s',
          }"
          type="chevron-right"
        />
        <div class="lew-collapse-item-title-text" :title="props.title">
          {{ props.title }}
        </div>
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
  border-bottom: var(--lew-table-border);

  .lew-collapse-item-title {
    cursor: pointer;
    padding: 10px 0px;
    box-sizing: border-box;
    transition: all 0.15s;
    user-select: none;

    .lew-collapse-item-title-text {
      width: calc(100% - 50px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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
