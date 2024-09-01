<template>
  <lew-result
    style="height: 60vh"
    type="success"
    title="订单支付成功"
    content="您的订单#12345已成功支付，总金额¥999.00。我们将在24小时内为您发货。您可以在'我的订单'中查看订单详情和物流信息。感谢您的购买！"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px; gap: 10px">
        <lew-button type="light" color="blue" text="继续购物" />
        <lew-button type="fill" color="blue" text="查看订单" />
      </lew-flex>
    </template>
  </lew-result>
  <lew-result
    style="height: 60vh"
    type="warning"
    title="库存不足提醒"
    content="抱歉，您选购的商品'iPhone 13 Pro Max 256GB 远峰蓝'库存不足。我们预计在3-5个工作日内补货。您可以选择其他颜色或型号，或者开启到货通知。"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px; gap: 10px">
        <lew-button type="light" color="blue" text="返回购物车" />
        <lew-button type="fill" color="blue" text="查看相似商品" />
      </lew-flex>
    </template>
  </lew-result>
  <lew-result
    style="height: 60vh"
    type="error"
    title="支付失败"
    content="很抱歉，您的订单#67890支付未能成功完成。错误代码：ERR_PAYMENT_001。这可能是由于银行系统维护或网络波动导致的。请稍后重试或选择其他支付方式。如需帮助，请联系我们的24小时客服。"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px; gap: 10px">
        <lew-button type="light" color="blue" text="重新支付" />
        <lew-button type="fill" color="blue" text="联系客服" />
      </lew-flex>
    </template>
  </lew-result>
  <lew-result
    style="height: 60vh"
    type="info"
    title="会员升级提醒"
    content="尊敬的用户，恭喜您已经满足升级条件！您当前的消费积分为9800分，升级为金牌会员后，您将享受9.5折优惠、专属客服和免费退换货等服务。是否立即升级？"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px; gap: 10px">
        <lew-button type="light" color="blue" text="暂不升级" />
        <lew-button type="fill" color="blue" text="立即升级" />
      </lew-flex>
    </template>
  </lew-result>
</template>
