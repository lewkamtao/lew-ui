<script setup lang="ts">
import type { LewDescOption } from 'lew-ui/types'
import LewGetLabelWidth from 'lew-ui/components/form/form/src/LewGetLabelWidth.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { descEmits } from './emits'
import LewDescItem from './LewDescItem.vue'
import { descProps, lewDescSizePaddingMap } from './props'

const props = defineProps(descProps)
const emit = defineEmits(descEmits)

// Refs
const descLabelRef = ref<InstanceType<typeof LewGetLabelWidth>>()
const autoLabelWidth = ref(0)

// Computed
const componentOptions: ComputedRef<LewDescOption[]> = computed(
  () => cloneDeep(props.options) || [],
)

const getDescClassNames = computed(() => {
  const { bordered } = props
  return object2class('lew-desc', { bordered })
})

const getDescStyle = computed(() => {
  const { width, gap, bordered, columns } = props
  const columnsCount = Number(columns)

  return {
    width: any2px(width),
    minWidth: 320,
    gap: bordered ? 0 : any2px(gap),
    gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
  }
})

const getBind = computed(() => (item: LewDescOption) => {
  const { direction, size, labelX, valueX, bordered, labelWidth } = props
  return {
    direction,
    size,
    labelX,
    valueX,
    bordered,
    labelWidth: any2px(
      labelWidth === 'auto' ? autoLabelWidth.value || labelWidth : labelWidth,
    ),
    ...item,
  }
})

// Methods
function calculateLabelWidth() {
  autoLabelWidth.value
    = (descLabelRef.value?.getWidth() || 0)
      + (props.bordered ? lewDescSizePaddingMap[props.size] * 2 : 0)
}

// Lifecycle
onMounted(() => {
  calculateLabelWidth()
  emit('ready')
})

// Watchers
watch(
  () => props.size,
  () => {
    nextTick(() => {
      calculateLabelWidth()
    })
  },
)
</script>

<template>
  <div class="lew-desc" :style="getDescStyle" :class="getDescClassNames">
    <LewGetLabelWidth ref="descLabelRef" :size="size" :options="componentOptions" />
    <LewDescItem
      v-for="item in componentOptions"
      :key="item.field"
      :data-source="dataSource"
      v-bind="getBind(item)"
    >
      <template v-if="$slots[item.field]" #default="slotProps">
        <slot :name="item.field" v-bind="slotProps" />
      </template>
    </LewDescItem>
  </div>
</template>

<style lang="scss" scoped>
.lew-desc {
  width: 100%;
  display: grid;
  flex-shrink: 0;
}

.lew-desc-bordered {
  border: var(--lew-desc-border);
}
</style>
