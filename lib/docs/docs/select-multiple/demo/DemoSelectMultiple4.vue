<script setup lang="ts">
const options = ref([
  {
    label: 'DSLR',
    value: '1'
  },
  {
    label: 'Mirrorless',
    value: '2',
    disabled: true
  },
  {
    label: 'Camcorder',
    disabled: true,
    value: '3'
  },
  {
    label: 'Lens',
    value: '4'
  },
  {
    label: 'Tripod',
    value: '5'
  },
  {
    label: 'Flash',
    value: '6'
  },
  {
    label: 'Bag',
    value: '7'
  },
  {
    label: 'SD Card',
    value: '8'
  },
  {
    label: 'Filter',
    value: '9'
  },
  {
    label: 'Cleaning Kit',
    value: '10',
    disabled: true
  }
])

const value = ref<string[]>([])
const maxSelection = 3

const handleChange = (newValue: string[]) => {
  if (newValue.length > maxSelection) {
    value.value = newValue.slice(0, maxSelection)
    LewMessage.warning('Maximum of 3 items can be selected')
  }
}
</script>

<template>
  <lew-flex style="width: 320px" direction="y">
    <lew-select-multiple
      v-model="value"
      :options="options"
      placeholder="Select available photography equipment"
      @change="handleChange"
    />
  </lew-flex>
</template>
