<script setup lang="ts">
import * as Yup from 'yup'

const options = ref([
  {
    field: 'username',
    label: '用户名',
    component: 'lew-input',
    rule: Yup.string().required(),
    props: {}
  },
  {
    field: 'password',
    label: '密码',
    component: 'lew-input',
    rule: Yup.string().min(6).required(),
    props: {
      type: 'password'
    }
  }
])
</script>

<template>
  <lew-form class="form-box" :options="options" :labelWidth="80" />
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
