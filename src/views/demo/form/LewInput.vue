<script setup lang="ts">
import { LewTitle, LewInput, LewFormItem } from '../../../components';
</script>

<template>
  <div class="main">
    <LewTitle bold>Input</LewTitle>
    <div style="margin-bottom: 50px">
      <LewTitle style="margin-bottom: 20px" size="16px">x 布局</LewTitle>
      <LewFormItem title="账号">
        <LewInput />
      </LewFormItem>
      <LewFormItem title="密码">
        <LewInput />
      </LewFormItem>
    </div>
    <div style="margin-bottom: 50px">
      <LewTitle style="margin-bottom: 20px" size="16px">y 布局</LewTitle>
      <LewFormItem title="账号" direction="y">
        <LewInput />
      </LewFormItem>
      <LewFormItem title="密码" direction="y">
        <LewInput />
      </LewFormItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  margin: 0 auto;

  >div {
    margin: 30px 0;
  }
}
</style>
