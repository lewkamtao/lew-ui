<script setup lang="ts">
import { object2class, any2px } from 'lew-ui/utils'
import LewGetLabelWidth from '../../form/src/LewGetLabelWidth.vue'
import { descProps } from './props'
import { cloneDeep } from 'lodash-es'
import LewDescItem from './LewDescItem.vue'

const props = defineProps(descProps)
const emit = defineEmits(['change', 'mounted'])
const descLabelRef = ref()
const autoLabelWidth = ref(0)

let componentOptions: any[] = cloneDeep(props.options) || []

const getDescClassNames = computed(() => {
  const { columns } = cloneDeep(props)
  return object2class('lew-desc', { columns })
})

onMounted(() => {
  // 计算 label 的宽度
  autoLabelWidth.value = descLabelRef.value?.getWidth()
  emit('mounted')
})

watch(
  () => props.size,
  () => {
    nextTick(() => {
      autoLabelWidth.value = descLabelRef.value?.getWidth()
    })
  }
)
</script>

<template>
  <div
    class="lew-desc"
    :style="{ width: any2px(width), minWidth: 320, gap: any2px(gap) }"
    :class="getDescClassNames"
  >
    <lew-get-label-width
      ref="descLabelRef"
      :size="size"
      :options="componentOptions"
    />
    <lew-desc-item
      v-for="item in componentOptions"
      :key="item.field"
      :value="values[item.field]"
      v-bind="{
        direction,
        size,
        labelWidth:
          labelWidth === 'auto' ? autoLabelWidth || labelWidth : labelWidth,
        ...item
      }"
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
</style>
