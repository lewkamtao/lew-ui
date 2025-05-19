<script lang="ts" setup>
const showErrorMessage = () => {
  LewMessage.error({
    content: 'Payment failed. Please check your payment method and try again.',
    duration: 3000
  })
}

const showSuccessMessage = () => {
  LewMessage.success({
    content: 'Your order has been successfully placed. We will ship it soon.',
    duration: 3000
  })
}

const showNormalMessage = () => {
  LewMessage.normal({
    content: 'Your order is being processed. Estimated shipping time: 1-3 business days.',
    duration: 3000
  })
}

const showInfoMessage = () => {
  LewMessage.info({
    content: 'New arrival alert: Limited edition items are now available for pre-order!',
    duration: 3000
  })
}

const showWarningMessage = () => {
  LewMessage.warning({
    content: 'Warning: Some items in your cart have low stock. Please check soon.',
    duration: 3000
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button
      text="Payment Failed"
      round
      type="light"
      color="red"
      @click="showErrorMessage"
    />
    <lew-button
      text="Order Success"
      round
      type="light"
      color="green"
      @click="showSuccessMessage"
    />
    <lew-button
      text="Processing"
      round
      type="light"
      color="normal"
      @click="showNormalMessage"
    />
    <lew-button
      text="New Arrival"
      round
      type="light"
      color="blue"
      @click="showInfoMessage"
    />
    <lew-button
      text="Low Stock"
      round
      type="light"
      color="warning"
      @click="showWarningMessage"
    />
  </lew-flex>
</template>
