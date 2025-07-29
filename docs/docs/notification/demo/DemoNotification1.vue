<script lang="ts" setup>
function openError() {
  LewNotification.error({
    title: 'Payment Failed',
    content:
      'Your payment could not be processed. Please try again or contact customer support.',
  })
}

function openSuccess() {
  LewNotification.success({
    title: 'Order Confirmed',
    content: 'Your order has been successfully placed and is being processed.',
  })
}

function openNormal() {
  LewNotification.normal({
    title: 'Scheduled Maintenance',
    content:
      'Our platform will be undergoing maintenance tonight from 2-4 AM EST.',
  })
}

function openInfo() {
  LewNotification.info({
    title: 'New Feature Available',
    content: 'Check out our new AI-powered search feature. Try it now!',
  })
}

function openWarning() {
  LewNotification.warning({
    title: 'Low Battery',
    content:
      'Your device battery is running low. Please connect to a power source.',
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="Error" type="ghost" color="red" @click="openError" />
    <lew-button
      text="Success"
      type="ghost"
      color="green"
      @click="openSuccess"
    />
    <lew-button text="Normal" type="ghost" color="normal" @click="openNormal" />
    <lew-button text="Info" type="ghost" color="blue" @click="openInfo" />
    <lew-button
      text="Warning"
      type="ghost"
      color="warning"
      @click="openWarning"
    />
  </lew-flex>
</template>
