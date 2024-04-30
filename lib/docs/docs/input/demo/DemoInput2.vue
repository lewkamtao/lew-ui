<script setup lang="ts">
const value = ref('')
const prefixesValue = ref(1)

const http = ref({
  value: '',
  prefixes: 1,
  suffix: 1
})
</script>

<template>
  <lew-flex style="width: 450px" :gap="20" x="start" direction="y">
    <lew-input
      v-model="value"
      size="small"
      prefixes="text"
      suffix="text"
      prefixes-value="https://"
      suffix-value=".com"
      placeholder="请输入网址"
    />
    <lew-input
      v-model="value"
      size="medium"
      prefixes="text"
      suffix="text"
      prefixes-value="https://"
      suffix-value=".com"
      placeholder="请输入网址"
    />
    <lew-input
      v-model="value"
      size="large"
      prefixes="text"
      suffix="text"
      prefixes-value="https://"
      suffix-value=".com"
      placeholder="请输入网址"
    />
    <lew-input v-model="value" suffix="text" suffix-value="@gmail.com" placeholder="请输入邮箱" />
    <lew-input
      v-model="value"
      prefixes="icon"
      prefixes-value="phone"
      suffix="icon"
      suffix-value="alert-circle"
      suffix-tooltip="必须填写手机号"
      clearable
      placeholder="请输入手机号"
    />
    <lew-input
      v-model="value"
      v-model:prefixesValue="prefixesValue"
      prefixes="select"
      :prefixes-options="[
        {
          label: '北京',
          value: 1
        },
        {
          label: '上海',
          value: 2
        },
        {
          label: '广州',
          value: 3
        },
        {
          label: '上海',
          value: 4
        }
      ]"
      placeholder="请输入手机号"
    />
    <lew-input
      v-model="http.value"
      v-model:prefixesValue="http.prefixes"
      v-model:suffixValue="http.suffix"
      size="small"
      prefixes="select"
      :prefixes-options="[
        {
          label: 'http://',
          value: 1
        },
        {
          label: 'https://',
          value: 2
        }
      ]"
      suffix="select"
      :suffix-options="[
        {
          label: '.com',
          value: 1
        },
        {
          label: '.cn',
          value: 2
        },
        {
          label: '.com.cn',
          value: 3
        },
        {
          label: '.org',
          value: 4
        },
        {
          label: '.net',
          value: 5
        }
      ]"
      placeholder="请输入网址"
    />
    <lew-input
      v-model="http.value"
      v-model:prefixesValue="http.prefixes"
      v-model:suffixValue="http.suffix"
      prefixes="select"
      :prefixes-options="[
        {
          label: 'http://',
          value: 1
        },
        {
          label: 'https://',
          value: 2
        }
      ]"
      suffix="select"
      :suffix-options="[
        {
          label: '.com',
          value: 1
        },
        {
          label: '.cn',
          value: 2
        },
        {
          label: '.com.cn',
          value: 3
        },
        {
          label: '.org',
          value: 4
        },
        {
          label: '.net',
          value: 5
        }
      ]"
      placeholder="请输入网址"
    />
    <lew-input
      v-model="http.value"
      v-model:prefixesValue="http.prefixes"
      v-model:suffixValue="http.suffix"
      size="large"
      prefixes="select"
      :prefixes-options="[
        {
          label: 'http://',
          value: 1
        },
        {
          label: 'https://',
          value: 2
        }
      ]"
      suffix="select"
      :suffix-options="[
        {
          label: '.com',
          value: 1
        },
        {
          label: '.cn',
          value: 2
        },
        {
          label: '.com.cn',
          value: 3
        },
        {
          label: '.org',
          value: 4
        },
        {
          label: '.net',
          value: 5
        }
      ]"
      placeholder="请输入网址"
    />
  </lew-flex>
</template>
