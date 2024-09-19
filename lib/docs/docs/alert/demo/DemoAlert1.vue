<template>
  <lew-flex direction="y">
    <lew-alert
      type="error"
      title="支付失败"
      content="您的 Apple Pay 支付失败，请检查卡信息。"
    />

    <lew-alert
      type="success"
      title="订阅成功"
      content="您已成功订阅 Apple Music。"
    />

    <lew-alert
      type="warning"
      title="存储空间不足"
      content="您的 iCloud 存储空间即将用完，请升级存储计划。"
    />

    <lew-alert
      type="info"
      title="新服务"
      content="Apple Fitness+ 现已推出，在家即可享受专业健身指导。"
    />
  </lew-flex>
</template>
