<script setup lang="ts">
const inputValues = reactive({
  email: '',
  website: '',
  address: ''
})

const selectValues = reactive({
  protocol: 'https://',
  domain: '.com',
  city: '北京'
})

const options = {
  cities: [
    { label: '北京', value: '北京' },
    { label: '上海', value: '上海' },
    { label: '广州', value: '广州' }
  ],
  protocols: [
    { label: 'http://', value: 'http://' },
    { label: 'https://', value: 'https://' }
  ],
  domains: [
    { label: '.com', value: '.com' },
    { label: '.cn', value: '.cn' },
    { label: '.org', value: '.org' },
    { label: '.net', value: '.net' }
  ]
}

const getSuffixTooltip = () => {
  const domainDesc = {
    '.com': '商业网站的通用顶级域名',
    '.cn': '中国国家顶级域名',
    '.org': '非营利组织域名',
    '.net': '网络服务提供商域名'
  }[selectValues.domain]

  return domainDesc
}

const getPrefixesTooltip = () => {
  const protocolDesc =
    selectValues.protocol === 'https://'
      ? '安全加密的超文本传输协议'
      : '标准超文本传输协议'

  return protocolDesc
}
</script>

<template>
  <lew-flex style="width: 450px" :gap="20" x="start" direction="y">
    <lew-input
      v-model="inputValues.email"
      auto-width
      min-width="180px"
      clearable
      suffix="text"
      suffixValue="@gmail.com"
      placeholder="请输入邮箱"
    />
    <lew-input
      v-model="inputValues.website"
      v-model:prefixesValue="selectValues.protocol"
      v-model:suffixValue="selectValues.domain"
      prefixes="select"
      :prefixesOptions="options.protocols"
      suffix="select"
      :suffixOptions="options.domains"
      :suffixTooltip="getSuffixTooltip"
      :prefixesTooltip="getPrefixesTooltip"
      placeholder="请输入网站名"
    />
    <lew-input
      v-model="inputValues.address"
      v-model:prefixesValue="selectValues.city"
      prefixes="select"
      :prefixesOptions="options.cities"
      placeholder="请输入详细地址"
    />
  </lew-flex>
</template>
