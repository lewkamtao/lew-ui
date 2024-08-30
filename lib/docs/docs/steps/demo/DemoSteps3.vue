<script setup lang="ts">
const options = [
  {
    title: 'Step 1',
    description: 'This is step 1'
  },
  {
    title: 'Step 2',
    description: 'This is step 2'
  },
  {
    title: 'Step 3',
    description: 'This is step 3'
  }
]

const status = ref('loading')
const currentStep = ref(2)
</script>

<template>
  <lew-flex direction="y">
    <lew-steps :options="options" v-model="currentStep" :status="status" />
    <lew-flex>
      <lew-button :disabled="currentStep === 1" @click="currentStep -= 1" type="light"
        >上一步</lew-button
      >
      <lew-button :disabled="currentStep === options.length" @click="currentStep += 1"
        >下一步</lew-button
      >
    </lew-flex>
  </lew-flex>
</template>
