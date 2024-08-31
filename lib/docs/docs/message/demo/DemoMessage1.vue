<script lang="ts" setup>
const showErrorMessage = () => {
  LewMessage.error({
    content: '错误：订单支付失败，请检查您的支付方式并重试。',
    duration: 3000
  })
}

const showSuccessMessage = () => {
  LewMessage.success({
    content: '恭喜！您的订单已成功提交，我们将尽快为您发货。',
    duration: 3000
  })
}

const showNormalMessage = () => {
  LewMessage.normal({
    content: '您的订单正在处理中，预计1-3个工作日内发货。',
    duration: 3000
  })
}

const showInfoMessage = () => {
  LewMessage.info({
    content: '新品上架提醒：限量版商品已经开始预售，先到先得！',
    duration: 3000
  })
}

const showWarningMessage = () => {
  LewMessage.warning({
    content: '注意：您的购物车中有商品库存不足，请及时调整。',
    duration: 3000
  })
}
</script>

<template>
  <lew-flex wrap x="start" gap="20">
    <lew-button text="支付失败" round type="light" color="red" @click="showErrorMessage" />
    <lew-button text="订单成功" round type="light" color="green" @click="showSuccessMessage" />
    <lew-button text="订单处理" round type="light" color="normal" @click="showNormalMessage" />
    <lew-button text="新品提醒" round type="light" color="blue" @click="showInfoMessage" />
    <lew-button text="库存提示" round type="light" color="warning" @click="showWarningMessage" />
  </lew-flex>
</template>
