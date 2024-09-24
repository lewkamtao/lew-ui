<script setup lang="ts">
import {
  DemoAvatar1,
  DemoAvatar2,
  DemoAvatar3,
  DemoAvatar4,
  DemoAvatar1Code,
  DemoAvatar2Code,
  DemoAvatar3Code,
  DemoAvatar4Code
} from './demo'
import LewDemoBox from '../../layout/LewDemoBox.vue'
import LewDocsTables from '../../layout/LewDocsTables.vue'
import * as API from './api'

const options = ref(
  Object.keys(API).map((key: any) => {
    // @ts-ignore
    return API[key]
  })
)

const { push } = useRouter()
</script>

<template>
  <div class="demo-wrapper">
    <lew-title>Avatar</lew-title>
    <p class="sub-title">
      如果你需要为你的头像加上消息的数量，你可以移步
      <lew-mark
        type="light"
        cursor="pointer"
        color="blue"
        @click="push('/Badge')"
        >Badge</lew-mark
      >
    </p>
    <lew-demo-box title="普通" :code="DemoAvatar1Code">
      <demo-avatar1 />
    </lew-demo-box>
    <lew-demo-box title="状态" :code="DemoAvatar2Code">
      <demo-avatar2 />
    </lew-demo-box>
    <lew-demo-box title="加载失败" :code="DemoAvatar3Code">
      <demo-avatar3 />
    </lew-demo-box>
    <lew-demo-box title="形状" :code="DemoAvatar4Code">
      <demo-avatar4 />
    </lew-demo-box>
    <lew-docs-tables :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  margin: 10px;
}
</style>
