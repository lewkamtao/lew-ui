<script setup lang="ts">
const options = ref([
  {
    label: 'Junior Software Engineer',
    value: '1'
  },
  {
    label: 'Mid-level Software Engineer',
    value: '2'
  },
  {
    label: 'Senior Software Engineer',
    value: '3',
    disabled: true
  },
  {
    label: 'Technical Lead',
    disabled: true,
    value: '4'
  },
  {
    label: 'Product Manager',
    value: '5'
  },
  {
    label: 'Project Manager',
    value: '6'
  },
  {
    label: 'UI/UX Designer',
    value: '7'
  },
  {
    label: 'Test Engineer',
    value: '8'
  },
  {
    label: 'Operations Engineer',
    value: '9'
  },
  {
    label: 'Data Analyst',
    value: '10'
  },
  {
    label: 'Chief Technology Officer',
    value: '11',
    disabled: true
  }
])

const value = ref('')

const handleChange = (val: string) => {
  console.log('Selected position:', val)
}
</script>

<template>
  <lew-select
    style="width: 320px"
    v-model="value"
    :options="options"
    placeholder="Select position"
    @change="handleChange"
  />
</template>
