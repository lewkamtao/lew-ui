<script setup lang="ts">
const options = [
  {
    title: 'Step 1',
    description: 'This is step 1This is stes step 3'
  },
  {
    title: 'Step 2',
    description: 'This is step 2tep 3'
  },
  {
    title: 'Step 3',
    description:
      'This is step 3 This is stepep 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3This step 3This is step 3This is step 3'
  },
  {
    title: 'Step 4',
    description:
      'This is step 3 This is stepep 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3ThiThis is step 3 This is step 3This step 3This is step 3This is step 3'
  }
]

const status = ref('error')
const currentStep = ref(1)
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
