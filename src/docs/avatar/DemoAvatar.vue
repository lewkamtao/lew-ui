<script setup lang="ts">
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import {
  DemoAvatar1,
  DemoAvatar1_code,
  DemoAvatar2,
  DemoAvatar2_code,
} from './demo'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-expect-error
    return API[key]
  }),
)
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Avatar</lew-title>
    <p class="sub-title">
      如果你需要为你的头像加上消息的数量，你可以移步
      <lew-mark type="info" to="/Badge">
        Badge
      </lew-mark>
    </p>
    <LewDemoBox title="普通" :code="DemoAvatar1_code">
      <DemoAvatar1 />
    </LewDemoBox>
    <LewDemoBox title="状态" :code="DemoAvatar2_code">
      <DemoAvatar2 />
    </LewDemoBox>
    <LewDocsTables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
