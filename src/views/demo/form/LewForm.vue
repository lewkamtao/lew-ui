<script setup lang="ts">
import { ref } from 'vue';
import {
  LewTitle,
  LewInput,
  LewFormItem,
  LewCheckboxGroup,
  LewRadioboxGroup,
  LewSwitch,
  LewTextarea
} from '../../../components';

let user = ref({
  username: '',
  password: '',
  age: '',
  sex: 0,
  hobby: [],
  school: '',
  dark: 2,
});
</script>

<template>
  <div class="main">
    <LewTitle bold>Form</LewTitle>

    <div style="margin-bottom: 50px">
      <LewFormItem direction="y" title="账号">
        <LewInput style="width:350px" v-model="user.username" />
      </LewFormItem>
      <LewFormItem direction="y" title="密码" style="margin-bottom: 20px">
        <LewInput style="width:350px" v-model="user.password" />
      </LewFormItem>
      <LewFormItem direction="y" title="简介" style="margin-bottom: 10px">
        <LewTextarea style="width:350px" v-model="user.password" resize="none" />
      </LewFormItem>
      <LewTitle size="14px" style="margin-bottom: 10px">性别</LewTitle>
      <LewRadioboxGroup v-model:value="user.sex" style="margin-bottom: 20px" :options="[
        { name: '未知', id: 0 },
        { name: '男', id: 1 },
        { name: '女', id: 2 },
      ]"></LewRadioboxGroup>
      <LewTitle style="margin-bottom: 10px" size="14px">爱好</LewTitle>
      <LewCheckboxGroup v-model:value="user.hobby" style="margin-bottom: 20px" :options="[
        { name: '唱歌', id: 1 },
        { name: '跳舞', id: 2 },
        { name: 'rap', id: 3 },
        { name: '打篮球', id: 44 },
      ]"></LewCheckboxGroup>
      <LewTitle style="margin-bottom: 10px" size="14px">是否订阅</LewTitle>
      <LewSwitch v-model:value="user.dark" style="margin-bottom: 20px"></LewSwitch>
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
