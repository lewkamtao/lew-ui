<template>
  <lew-flex direction="y">
    <lew-alert type="error">
      <template #title>登录失败</template>
      <template #content>您的登录尝试失败，请检查用户名和密码。</template>
    </lew-alert>

    <lew-alert type="success">
      <template #title>注册成功</template>
      <template #content>您已成功注册 Google 服务。</template>
    </lew-alert>

    <lew-alert type="warning">
      <template #title>系统维护</template>
      <template #content>系统将在今晚进行维护，请提前完成您的工作。</template>
    </lew-alert>

    <lew-alert type="info">
      <template #title>新功能</template>
      <template #content>Google Photos 现已推出，提供更多照片管理功能。</template>
    </lew-alert>

    <lew-alert type="normal">
      <template #title>系统提示</template>
      <template #content>您的系统需要更新，请尽快完成更新以确保安全。</template>
    </lew-alert>
  </lew-flex>
</template>
