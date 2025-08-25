<script lang="ts" setup>
import LewDate from './LewDate.vue'
import LewMonth from './LewMonth.vue'
import LewQuarter from './LewQuarter.vue'
import LewTime from './LewTime.vue'
import LewYear from './LewYear.vue'

defineProps({
  type: {
    type: String as PropType<'year' | 'quarter' | 'month' | 'date' | 'time'>,
    default: 'date',
  },
})

const emit = defineEmits(['change'])

const lewYearRef = ref()
const lewQuarterRef = ref()
const lewMonthRef = ref()
const lewDateRef = ref()
const lewTimeRef = ref()

function init(date: string | undefined = '') {
  lewYearRef.value?.init(date)
  lewQuarterRef.value?.init(date)
  lewMonthRef.value?.init(date)
  lewDateRef.value?.init(date)
  lewTimeRef.value?.init(date)
}

function handleChange(date: string | undefined) {
  emit('change', date)
}

defineExpose({ init })
</script>

<template>
  <div class="lew-panel">
    <LewYear v-if="type === 'year'" ref="lewYearRef" @change="handleChange" />
    <LewQuarter v-if="type === 'quarter'" ref="lewQuarterRef" @change="handleChange" />
    <LewMonth v-if="type === 'month'" ref="lewMonthRef" @change="handleChange" />
    <LewDate v-if="type === 'date'" ref="lewDateRef" @change="handleChange" />
    <LewTime v-if="type === 'time'" ref="lewTimeRef" @change="handleChange" />
  </div>
</template>
