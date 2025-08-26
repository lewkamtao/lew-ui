<script lang="ts" setup>
import type { Component } from 'vue'
import LewDate from './LewDate.vue'
import LewDateTime from './LewDateTime.vue'
import LewMonth from './LewMonth.vue'
import LewQuarter from './LewQuarter.vue'
import LewTime from './LewTime.vue'
import LewYear from './LewYear.vue'

const props = defineProps({
  type: {
    type: String as PropType<
      'year' | 'quarter' | 'month' | 'date' | 'date-time' | 'time'
    >,
    default: 'date',
  },
})

const emit = defineEmits(['change', 'cancel'])

const COMPONENT_MAP: Record<string, Component> = {
  'year': LewYear,
  'quarter': LewQuarter,
  'month': LewMonth,
  'date': LewDate,
  'date-time': LewDateTime,
  'time': LewTime,
}

const currentComponentRef = ref()

const currentComponent = computed(() => COMPONENT_MAP[props.type])

function init(date: string | undefined = '') {
  currentComponentRef.value?.init(date)
}

function handleChange(date: string | undefined = '') {
  emit('change', date)
}

function handleCancel() {
  emit('cancel')
}

defineExpose({ init })
</script>

<template>
  <div class="lew-panel">
    <component
      :is="currentComponent"
      ref="currentComponentRef"
      @change="handleChange"
      @cancel="handleCancel"
    />
  </div>
</template>
