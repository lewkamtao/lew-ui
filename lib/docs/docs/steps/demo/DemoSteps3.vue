<script setup lang="ts">
const options = [
  {
    title: 'Choose Product',
    description: 'Please select the product you want to purchase',
  },
  {
    title: 'Enter Shipping Info',
    description: 'Please enter your shipping address and contact information',
  },
  {
    title: 'Review Order',
    description: 'Please confirm your order information',
  },
]

const status = ref('loading')
const currentStep = ref(2)
</script>

<template>
  <lew-flex direction="y">
    <lew-steps
      v-model="currentStep"
      min-width="350px"
      :options="options"
      :status="status"
    />
    <lew-flex x="center" y="center">
      <lew-button
        :disabled="currentStep === 1"
        type="light"
        @click="currentStep -= 1"
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
