<script setup lang="ts">
const visibleWarning = ref(true)
const visibleInfo = ref(true)
</script>

<template>
  <lew-flex style="width: 500px" direction="y">
    <lew-alert type="error">
      <template #title>
        Sign In Failed
      </template>
      <template #content>
        Your sign-in attempt failed. Please check your username and
        password.
      </template>
      <template #footer>
        <lew-flex x="end">
          <lew-button round type="text" color="gray" size="small">
            Don't Show Again
          </lew-button>
          <lew-button round type="light" color="red" size="small">
            Try Again
          </lew-button>
        </lew-flex>
      </template>
    </lew-alert>

    <lew-alert type="success">
      <template #title>
        Registration Complete
      </template>
      <template #content>
        You have successfully registered for Google services.
      </template>
      <template #footer>
        <lew-flex x="end">
          <lew-button type="text" color="gray" size="small">
            Don't Show Again
          </lew-button>
          <lew-button round color="success" size="small">
            Continue
          </lew-button>
        </lew-flex>
      </template>
    </lew-alert>

    <lew-alert
      v-if="visibleWarning"
      type="warning"
      closeable
      @close="visibleWarning = false"
    >
      <template #title>
        System Maintenance
      </template>
      <template #content>
        The system will be under maintenance tonight. Please complete your work
        in advance.
      </template>
      <template #footer>
        <lew-flex x="end">
          <lew-button type="text" color="gray" size="small">
            Don't Show Again
          </lew-button>
          <lew-button color="warning" size="small">
            Learn More
          </lew-button>
        </lew-flex>
      </template>
    </lew-alert>

    <lew-alert
      v-if="visibleInfo"
      type="info"
      closeable
      @close="visibleInfo = false"
    >
      <template #title>
        New Feature Available
      </template>
      <template #content>
        Google Photos is now available with enhanced photo management
        features.
      </template>
      <template #footer>
        <lew-flex x="end">
          <lew-button type="text" color="gray" size="small">
            Don't Show Again
          </lew-button>
          <lew-button type="light" size="small">
            Explore
          </lew-button>
        </lew-flex>
      </template>
    </lew-alert>
  </lew-flex>
</template>
