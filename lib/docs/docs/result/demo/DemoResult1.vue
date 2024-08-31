<template>
  <lew-result
    style="height: 60vh"
    color="green"
    title="更新成功"
    content="你可以前往个人中心，继续完善信息。"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px">
        <lew-button type="light" color="gray" text="返回" />
        <lew-button text="前往" />
      </lew-flex>
    </template>
  </lew-result>
  <lew-result
    style="height: 60vh"
    color="warning"
    title="警告"
    content="这是一段文字，这是一段文字这是一段文字这是一段文字。"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px">
        <lew-button text="返回" />
        <lew-button text="前往" />
      </lew-flex>
    </template>
  </lew-result>
  <lew-result
    style="height: 60vh"
    color="red"
    title="发布失败"
    content="当前网络环境较差，请稍后再试。"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px">
        <lew-button text="返回" />
        <lew-button text="前往" />
      </lew-flex>
    </template>
  </lew-result>
  <lew-result
    style="height: 60vh"
    color="blue"
    title="操作提示"
    content="你可以前往个人中心，继续完善信息。"
  >
    <template #handle>
      <lew-flex style="margin-top: 30px">
        <lew-button text="返回" />
        <lew-button text="前往" />
      </lew-flex>
    </template>
  </lew-result>
</template>
