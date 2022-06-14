<script setup lang="ts">
import { ref } from 'vue'
import { LewTitle, LewRadioboxGroup } from '../../../components/index'
let check = ref(0)
const getValue = (e: any) => {
  console.log(e)
}
</script> 

<template>
  <div class="main">
    <LewTitle bold>Checkbox</LewTitle>
    <div>
      <LewTitle style="margin-bottom: 20px" size="16px">x 布局</LewTitle>
      <LewRadioboxGroup direction="x" v-model:value="check" :options="[
        { name: '库里', id: '1' },
        { name: '杜兰特', id: '2' },
        { name: '保罗', id: 3 },
        { name: '科比', id: 4 },
        { name: '乔丹', id: 5 },
      ]" @update:value="getValue"></LewRadioboxGroup>

    </div>
    <div style="margin-bottom: 20px">
      <LewTitle style="margin-bottom: 20px" size="16px">y 布局</LewTitle>
      <LewRadioboxGroup direction="y" column v-model:value="check" :options="[
        { name: '加内特', id: 7 },
        { name: '奥尼尔', id: 8 },
        { name: '詹姆斯', id: 9 },
        { name: '伊戈达拉', id: 10 }
      ]" @update:value="getValue"></LewRadioboxGroup>
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
