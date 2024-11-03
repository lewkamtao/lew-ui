<script setup lang="ts">
import * as Yup from 'yup'

const options = ref([
  {
    field: 'username',
    label: '用户名',

    as: 'input',
    rule: Yup.string().required()
  },
  {
    field: 'password',
    label: '密码',
    as: 'input',

    rule: Yup.string().min(6).required(),
    props: {
      type: 'password'
    }
  },
  {
    field: 'phone',

    label: '手机',
    as: 'input'
  }
])

const formRef = ref()
</script>

<template>
  <lew-flex style="width: 450px">
    <lew-form ref="formRef" class="form-box" :options="options" />
  </lew-flex>
</template>
<style scoped lang="scss">
.form-box {
  width: 380px;
  margin: 0 auto;
}
@media (max-width: 767px) {
  .form-box {
    width: 100%;
  }
}
</style>
