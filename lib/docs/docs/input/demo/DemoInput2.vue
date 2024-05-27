<script setup lang="ts">
const v = ref('')
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
      v-model="v"
      size="small"
      prefixes="text"
      suffix="text"
      clearable
      prefixesValue="https://"
      suffixValue=".com"
      placeholder="请输入网址"
    />
    <lew-input
      v-model="v"
      size="medium"
      prefixes="text"
      suffix="text"
      prefixesValue="https://"
      suffixValue=".com"
      placeholder="请输入网址"
    />
    <lew-input
      v-model="v"
      size="large"
      prefixes="text"
      suffix="text"
      prefixesValue="https://"
      suffixValue=".com"
      placeholder="请输入网址"
    />
    <lew-input
      auto-width
      min-width="180px"
      v-model="v"
      clearable
      suffix="text"
      suffixValue="@gmail.com"
      placeholder="请输入"
    />
    <lew-input
      v-model="v"
      prefixes="icon"
      prefixesValue="phone"
      suffix="icon"
      suffixValue="alert-circle"
      suffixTooltip="必须填写手机号"
      clearable
      placeholder="请输入手机号"
    />
    <lew-input
      v-model="v"
      v-model:prefixesValue="prefixesValue"
      prefixes="select"
      :prefixesOptions="[
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
      :prefixesOptions="[
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
      :suffixOptions="[
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
      :prefixesOptions="[
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
      :suffixOptions="[
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
      :prefixesOptions="[
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
      :suffixOptions="[
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
