<script setup lang="ts">
const options = [
  {
    title: 'Register Account',
    description: 'Fill in personal information to create a new user account',
  },
  {
    title: 'Verify Email',
    description: 'Verify your email address through the link in the email',
  },
  {
    title: 'Set Password',
    description: 'Set a secure password for your account',
  },
  {
    title: 'Complete',
    description: 'Account registration is complete, you can now log in',
  },
]

const currentStep = ref(1)
</script>

<template>
  <lew-flex direction="y">
    <lew-steps :options="options" v-model="currentStep" />
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
