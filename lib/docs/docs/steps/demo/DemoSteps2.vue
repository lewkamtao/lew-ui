<script setup lang="ts">
const options = [
  {
    title: 'Fill in Basic Information',
    description: 'Please enter your name and contact information',
  },
  {
    title: 'Select Service Type',
    description: 'Please select the service type you need',
  },
  {
    title: 'Confirm Submission',
    description: 'Please confirm and submit your information',
  },
]

const status = ref('error')
const currentStep = ref(2)
</script>

<template>
  <lew-flex direction="y">
    <lew-steps :options="options" v-model="currentStep" :status="status" />
    <lew-flex x="center" y="center">
      <lew-button
        :disabled="currentStep === 1"
        @click="currentStep -= 1"
        type="light"
      >
        Previous
      </lew-button>
      <lew-button
        :disabled="currentStep === options.length"
        @click="currentStep += 1"
      >
        Next
      </lew-button>
    </lew-flex>
  </lew-flex>
</template>
