<script setup lang="ts">
import LewGetLabelWidth from 'lew-ui/components/form/form/src/LewGetLabelWidth.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import LewDescItem from './LewDescItem.vue'
import { descProps, lewDescSizePaddingMap } from './props'

const props = defineProps(descProps)
const emit = defineEmits(['change', 'mounted'])
const descLabelRef = ref()
const autoLabelWidth = ref(0)

const componentOptions: any[] = cloneDeep(props.options) || []

const getDescClassNames = computed(() => {
  const { bordered } = props
  return object2class('lew-desc', { bordered })
})

onMounted(() => {
  // 计算 label 的宽度
  autoLabelWidth.value
    = descLabelRef.value?.getWidth()
      + (props.bordered ? lewDescSizePaddingMap[props.size] * 2 : 0)
  emit('mounted')
})

watch(
  () => props.size,
  () => {
    nextTick(() => {
      autoLabelWidth.value
        = descLabelRef.value?.getWidth()
          + (props.bordered ? lewDescSizePaddingMap[props.size] * 2 : 0)
    })
  },
)

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

const getBind = computed(() => (item: any) => {
  const { direction, size, labelX, valueX, bordered, labelWidth } = props
  return {
    direction,
    size,
    labelX,
    valueX,
    bordered,
    labelWidth: labelWidth === 'auto' ? autoLabelWidth.value || labelWidth : labelWidth,
    ...item,
  }
})
</script>

<template>
  <div class="lew-desc" :style="getDescStyle" :class="getDescClassNames">
    <LewGetLabelWidth ref="descLabelRef" :size="size" :options="componentOptions" />
    <LewDescItem
      v-for="item in componentOptions"
      :key="item.field"
      :field="item.field"
      :data-source="dataSource"
      v-bind="getBind(item)"
    />
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
