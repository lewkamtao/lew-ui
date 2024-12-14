<script setup lang="ts">
import { object2class, any2px } from 'lew-ui/utils'
import LewGetLabelWidth from '../../form/src/LewGetLabelWidth.vue'
import { descProps, lewDescSizePaddingMap } from './props'
import { cloneDeep } from 'lodash-es'
import LewDescItem from './LewDescItem.vue'

const props = defineProps(descProps)
const emit = defineEmits(['change', 'mounted'])
const descLabelRef = ref()
const autoLabelWidth = ref(0)

let componentOptions: any[] = cloneDeep(props.options) || []

const getDescClassNames = computed(() => {
  const { columns, bordered } = props
  return object2class('lew-desc', { columns, bordered })
})

onMounted(() => {
  // 计算 label 的宽度
  autoLabelWidth.value =
    descLabelRef.value?.getWidth() +
    (props.bordered ? lewDescSizePaddingMap[props.size] * 2 : 0)
  emit('mounted')
})

watch(
  () => props.size,
  () => {
    nextTick(() => {
      autoLabelWidth.value =
        descLabelRef.value?.getWidth() +
        (props.bordered ? lewDescSizePaddingMap[props.size] * 2 : 0)
    })
  }
)

const getDescStyle = computed(() => {
  const { width, gap, bordered } = props
  return {
    width: any2px(width),
    minWidth: 320,
    gap: bordered ? 0 : any2px(gap)
  }
})

const getBind = computed(() => (item: any) => {
  const { direction, size, labelX, valueX, bordered, labelWidth } =
    props
  return {
    direction,
    size,
    labelX,
    valueX,
    bordered,
    labelWidth:
      labelWidth === 'auto' ? autoLabelWidth.value || labelWidth : labelWidth,
    ...item
  }
})
</script>

<template>
  <div class="lew-desc" :style="getDescStyle" :class="getDescClassNames">
    <lew-get-label-width
      ref="descLabelRef"
      :size="size"
      :options="componentOptions"
    />
    <lew-desc-item
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

.lew-desc-columns-1 {
  grid-template-columns: minmax(0, 1fr);
}

.lew-desc-columns-2 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.lew-desc-columns-3 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
}

.lew-desc-columns-4 {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );
}

.lew-desc-bordered {
  border: var(--lew-desc-border);
}
</style>
